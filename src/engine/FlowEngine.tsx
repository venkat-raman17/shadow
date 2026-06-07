import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors, typography, Spacing, radii } from '@/constants/theme';
import { Screen, Button, TextField, FadeSlide } from '@/components/ui';
import type { Flow, FlowInputs, Step, BranchCondition } from '@/types/flow';
import { saveEntry, savePart, saveSession, addExperiment, touchPart } from '@/lib/db';
import { useCrypto } from '@/context/CryptoContext';

import PromptStep from '@/steps/PromptStep';
import ScaleStep from '@/steps/ScaleStep';
import ChoiceStep from '@/steps/ChoiceStep';
import PassageStep from '@/steps/PassageStep';
import PauseStep from '@/steps/PauseStep';
import DialogueStep from '@/steps/DialogueStep';
import ResourceStep from '@/steps/ResourceStep';
import ExitOfferStep from '@/steps/ExitOfferStep';

interface EngineState {
  stepIndex: number;
  inputs: FlowInputs;
  done: boolean;
  exiting: boolean;
  groundingOffered: boolean;
}

type Action =
  | { type: 'ADVANCE'; stepIndex: number; inputs: FlowInputs }
  | { type: 'EXIT' }
  | { type: 'COMPLETE' }
  | { type: 'OFFER_GROUNDING' };

function reducer(state: EngineState, action: Action): EngineState {
  switch (action.type) {
    case 'ADVANCE':
      return { ...state, stepIndex: action.stepIndex, inputs: action.inputs };
    case 'EXIT':
      return { ...state, exiting: true };
    case 'COMPLETE':
      return { ...state, done: true };
    case 'OFFER_GROUNDING':
      return { ...state, groundingOffered: true };
    default:
      return state;
  }
}

function stepIndexById(steps: Step[], id: string): number {
  const idx = steps.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : 0;
}

function evaluateBranch(
  conditions: BranchCondition[] | undefined,
  inputs: FlowInputs,
): string | null {
  if (!conditions) return null;
  for (const cond of conditions) {
    const val = inputs[cond.when.inputKey];
    const num = typeof val === 'number' ? val : undefined;
    if (cond.when.gte !== undefined && num !== undefined && num >= cond.when.gte) return cond.goTo;
    if (cond.when.lte !== undefined && num !== undefined && num <= cond.when.lte) return cond.goTo;
    if (cond.when.eq !== undefined && String(val) === cond.when.eq) return cond.goTo;
  }
  return null;
}

interface Props {
  flow: Flow;
  onComplete: () => void;
  /** When set, a 'meeting' flow attaches to this existing part instead of
   *  creating a new one — so re-meeting a part doesn't duplicate it. */
  existingPartId?: string;
}

export default function FlowEngine({ flow, onComplete, existingPartId }: Props) {
  const router = useRouter();
  const db = useSQLiteContext();
  const { key } = useCrypto();

  const [experimentText, setExperimentText] = useState('');
  const [experimentSaved, setExperimentSaved] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    stepIndex: 0,
    inputs: {},
    done: false,
    exiting: false,
    groundingOffered: false,
  });

  const persist = useCallback(
    async (inputs: FlowInputs) => {
      if (!key) return;
      try {
        if (flow.kind === 'noticing') {
          await saveEntry(db, inputs, flow.id, key);
        } else if (flow.kind === 'meeting') {
          const targetPartId = existingPartId ?? (await savePart(db, inputs, key));
          await saveSession(db, inputs, flow.id, targetPartId, key);
          if (existingPartId) await touchPart(db, existingPartId);
        } else if (flow.kind === 'integration') {
          const intention = inputs.intention;
          if (typeof intention === 'string' && intention.trim()) {
            await addExperiment(db, intention.trim(), key);
          }
        }
        // 'grounding' flows: nothing to persist
      } catch (e) {
        console.warn('persist failed', e);
      }
    },
    [db, flow.id, flow.kind, key, existingPartId],
  );

  const handleExit = useCallback(async () => {
    dispatch({ type: 'EXIT' });
    await persist(state.inputs);
    onComplete();
  }, [persist, state.inputs, onComplete]);

  const advance = useCallback(
    async (value?: string | number, goTo?: string) => {
      const step = flow.steps[state.stepIndex];
      const nextInputs: FlowInputs = { ...state.inputs };
      if ('inputKey' in step && step.inputKey && value !== undefined) {
        nextInputs[step.inputKey] = value;
      }

      // Safety check: if charge crosses threshold, offer grounding
      if (
        flow.safety &&
        !state.groundingOffered &&
        'inputKey' in step &&
        step.inputKey === flow.safety.chargeKey &&
        typeof value === 'number' &&
        value >= flow.safety.threshold
      ) {
        dispatch({ type: 'OFFER_GROUNDING' });
        // We still advance — the offer is non-blocking
      }

      // Determine next step index
      const branchTarget = goTo ?? evaluateBranch(step.branch, nextInputs);
      let nextIndex: number;
      if (branchTarget) {
        nextIndex = stepIndexById(flow.steps, branchTarget);
      } else {
        nextIndex = state.stepIndex + 1;
      }

      if (nextIndex >= flow.steps.length) {
        dispatch({ type: 'ADVANCE', stepIndex: nextIndex, inputs: nextInputs });
        await persist(nextInputs);
        dispatch({ type: 'COMPLETE' });
      } else {
        dispatch({ type: 'ADVANCE', stepIndex: nextIndex, inputs: nextInputs });
      }
    },
    [flow, state, persist],
  );

  if (state.done) {
    return (
      <Screen center>
        <FadeSlide duration={420}>
          <Text style={styles.closeBody}>{flow.exit.body}</Text>
        </FadeSlide>

        {/* If the charge gate tripped on the final step, the offer would otherwise
            never appear — surface it here on the close screen too. */}
        {state.groundingOffered && flow.safety && (
          <Pressable
            style={styles.groundingBanner}
            onPress={() => router.push(`/flow/${flow.safety!.onHighCharge}`)}>
            <Text style={styles.groundingBannerText}>
              That was intense. Would you like a moment to settle? →
            </Text>
          </Pressable>
        )}

        {flow.kind === 'meeting' && !experimentSaved && (
          <View style={styles.experimentSeed}>
            <Text style={styles.experimentLabel}>Want to carry something into the week?</Text>
            <TextField
              value={experimentText}
              onChangeText={setExperimentText}
              placeholder="Something small and real… (optional)"
              multiline
            />
            {experimentText.trim().length > 0 && (
              <Button
                label="Save for the week"
                variant="secondary"
                onPress={async () => {
                  if (!key) return;
                  await addExperiment(db, experimentText.trim(), key);
                  setExperimentSaved(true);
                }}
              />
            )}
          </View>
        )}

        {experimentSaved && (
          <Text style={styles.experimentConfirm}>Saved to your experiments.</Text>
        )}

        <Button label="Done" variant="secondary" onPress={onComplete} />
      </Screen>
    );
  }

  const currentStep = flow.steps[state.stepIndex];
  if (!currentStep) return null;

  const stepProps = { onNext: advance, onExit: handleExit };

  const groundingBanner =
    state.groundingOffered && flow.safety ? (
      <Pressable
        style={styles.groundingBanner}
        onPress={() => router.push(`/flow/${flow.safety!.onHighCharge}`)}>
        <Text style={styles.groundingBannerText}>
          That was intense. Would you like a moment to settle? →
        </Text>
      </Pressable>
    ) : null;

  return (
    <View style={styles.root}>
      {groundingBanner}
      <FlowProgress current={state.stepIndex} total={flow.steps.length} />
      <FadeSlide key={currentStep.id} style={styles.stepFill}>
        <StepRouter step={currentStep} {...stepProps} />
      </FadeSlide>
    </View>
  );
}

// A quiet sense of progress — faint dots that fill as you move through the flow.
// Deliberately not a precise bar: branching makes exact counts fuzzy, and calm
// beats precise here. Caps the dot count so long flows never overflow.
function FlowProgress({ current, total }: { current: number; total: number }) {
  const count = Math.min(total, 9);
  const filledThrough = Math.round(((current + 1) / total) * count);
  return (
    <View style={styles.progress}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={[styles.progressDot, i < filledThrough && styles.progressDotFilled]} />
      ))}
    </View>
  );
}

function StepRouter({
  step,
  onNext,
  onExit,
}: {
  step: Step;
  onNext: (value?: any, goTo?: string) => void;
  onExit: () => void;
}) {
  switch (step.type) {
    case 'prompt':
      return <PromptStep step={step} onNext={onNext} onExit={onExit} />;
    case 'scale':
      return <ScaleStep step={step} onNext={onNext} onExit={onExit} />;
    case 'choice':
      return (
        <ChoiceStep
          step={step}
          onNext={(val, goTo) => onNext(val, goTo)}
          onExit={onExit}
        />
      );
    case 'passage':
      return <PassageStep step={step} onNext={onNext} onExit={onExit} />;
    case 'pause':
      return <PauseStep step={step} onNext={onNext} onExit={onExit} />;
    case 'dialogue':
      return <DialogueStep step={step} onNext={onNext} onExit={onExit} />;
    case 'resource':
      return <ResourceStep step={step} onNext={onNext} onExit={onExit} />;
    case 'exitOffer':
      return <ExitOfferStep step={step} onNext={onNext} onExit={onExit} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  stepFill: { flex: 1 },
  closeBody: {
    ...typography.display,
    fontSize: 26,
    lineHeight: 38,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing.one + Spacing.half,
    justifyContent: 'center',
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  progressDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.border,
  },
  progressDotFilled: { backgroundColor: colors.accentMuted },
  groundingBanner: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two + Spacing.half,
    borderRadius: radii.md,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
  },
  groundingBannerText: {
    ...typography.bodySmall,
    color: colors.accentWarm,
  },
  experimentSeed: {
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  experimentLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  experimentConfirm: {
    ...typography.caption,
    color: colors.accent,
    textAlign: 'center',
  },
});
