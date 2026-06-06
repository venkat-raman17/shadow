import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors, typography, Spacing } from '@/constants/theme';
import type { Flow, FlowInputs, Step, BranchCondition } from '@/types/flow';
import { saveEntry, savePart, saveSession, addExperiment } from '@/lib/db';
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
}

export default function FlowEngine({ flow, onComplete }: Props) {
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
          const partId = await savePart(db, inputs, key);
          await saveSession(db, inputs, flow.id, partId, key);
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
    [db, flow.id, flow.kind, key],
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

  // Grounding offer banner
  if (state.groundingOffered && !state.done && !state.exiting) {
    const step = flow.steps[state.stepIndex];
    // Only show the offer once and only if not already on the last step
    if (state.stepIndex < flow.steps.length) {
      // rendered below as a non-blocking banner — handled inline in step render
    }
  }

  if (state.done) {
    return (
      <View style={styles.closeScreen}>
        <Text style={styles.closeBody}>{flow.exit.body}</Text>

        {flow.kind === 'meeting' && !experimentSaved && (
          <View style={styles.experimentSeed}>
            <Text style={styles.experimentLabel}>Want to carry something into the week?</Text>
            <TextInput
              style={styles.experimentInput}
              value={experimentText}
              onChangeText={setExperimentText}
              placeholder="Something small and real… (optional)"
              placeholderTextColor={colors.textSecondary}
              multiline
              textAlignVertical="top"
            />
            {experimentText.trim().length > 0 && (
              <TouchableOpacity
                style={styles.experimentBtn}
                onPress={async () => {
                  if (!key) return;
                  await addExperiment(db, experimentText.trim(), key);
                  setExperimentSaved(true);
                }}>
                <Text style={styles.experimentBtnText}>Save for the week</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {experimentSaved && (
          <Text style={styles.experimentConfirm}>Saved to your experiments.</Text>
        )}

        <TouchableOpacity style={styles.closeBtn} onPress={onComplete}>
          <Text style={styles.closeBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentStep = flow.steps[state.stepIndex];
  if (!currentStep) return null;

  const stepProps = { onNext: advance, onExit: handleExit };

  const groundingBanner =
    state.groundingOffered && flow.safety ? (
      <TouchableOpacity
        style={styles.groundingBanner}
        onPress={() => router.push(`/flow/${flow.safety!.onHighCharge}`)}>
        <Text style={styles.groundingBannerText}>
          That was intense. Would you like a moment to settle? →
        </Text>
      </TouchableOpacity>
    ) : null;

  return (
    <View style={styles.root}>
      {groundingBanner}
      <StepRouter key={currentStep.id} step={currentStep} {...stepProps} />
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
  closeScreen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: Spacing.four,
    paddingTop: Spacing.six,
    gap: Spacing.five,
    justifyContent: 'center',
  },
  closeBody: {
    ...typography.heading,
    fontSize: 20,
    lineHeight: 32,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  closeBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeBtnText: { ...typography.body, fontWeight: '500' },
  groundingBanner: {
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groundingBannerText: {
    ...typography.bodySmall,
    color: colors.accentWarm,
  },
  experimentSeed: {
    gap: Spacing.two,
  },
  experimentLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  experimentInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: Spacing.three,
    ...typography.body,
    minHeight: 80,
  },
  experimentBtn: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: Spacing.two + Spacing.half,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  experimentBtnText: {
    ...typography.bodySmall,
    color: colors.accent,
  },
  experimentConfirm: {
    ...typography.caption,
    color: colors.accent,
    textAlign: 'center',
  },
});
