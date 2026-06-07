import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors, typography, Spacing, radii, MaxContentWidth } from '@/constants/theme';
import { Button, TextField, FadeSlide } from '@/components/ui';
import type { Flow, FlowInputs, Step, BranchCondition } from '@/types/flow';
import { saveEntry, savePart, saveSession, addExperiment, touchPart } from '@/lib/db';
import { useCrypto } from '@/context/CryptoContext';
import { resolveTokens } from '@/engine/tokens';
import TranscriptTurn from '@/engine/TranscriptTurn';

import PromptStep from '@/steps/PromptStep';
import ScaleStep from '@/steps/ScaleStep';
import ChoiceStep from '@/steps/ChoiceStep';
import PassageStep from '@/steps/PassageStep';
import PauseStep from '@/steps/PauseStep';
import DialogueStep from '@/steps/DialogueStep';
import ResourceStep from '@/steps/ResourceStep';
import ExitOfferStep from '@/steps/ExitOfferStep';
import type { StepProps } from '@/steps/types';

interface EngineState {
  stepIndex: number;
  /** Indices of completed steps, in the order they were visited — the actual
   *  path taken through any branches. Drives the read-only transcript. */
  history: number[];
  inputs: FlowInputs;
  done: boolean;
  exiting: boolean;
  groundingOffered: boolean;
}

type Action =
  | { type: 'ADVANCE'; stepIndex: number; inputs: FlowInputs; history: number[] }
  | { type: 'EXIT' }
  | { type: 'COMPLETE' }
  | { type: 'OFFER_GROUNDING' };

function reducer(state: EngineState, action: Action): EngineState {
  switch (action.type) {
    case 'ADVANCE':
      return { ...state, stepIndex: action.stepIndex, inputs: action.inputs, history: action.history };
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
  /** Values pre-loaded into the flow's inputs so authored copy can echo them
   *  (e.g. {priorFelt}, {seedQuality}, {partName} when returning or personifying
   *  a recurring quality). */
  seedInputs?: FlowInputs;
}

export default function FlowEngine({ flow, onComplete, existingPartId, seedInputs }: Props) {
  const router = useRouter();
  const db = useSQLiteContext();
  const { key } = useCrypto();

  const [experimentText, setExperimentText] = useState('');
  const [experimentSaved, setExperimentSaved] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  // The session this run created (meeting flows), so a seeded experiment can
  // remember where it came from and the loop can later close.
  const sessionIdRef = useRef<string | undefined>(undefined);

  const [state, dispatch] = useReducer(reducer, {
    stepIndex: 0,
    history: [],
    // Seed echo values, and mark meeting flows as fresh vs. a return so the
    // flow can branch to its "what's shifted" reflection.
    inputs: {
      ...(seedInputs ?? {}),
      ...(flow.kind === 'meeting' ? { remeeting: existingPartId ? 'true' : 'false' } : {}),
    },
    done: false,
    exiting: false,
    groundingOffered: false,
  });

  // Keep the freshly-revealed step (or the close) in view as the thread grows.
  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [state.stepIndex, state.done]);

  const persist = useCallback(
    async (inputs: FlowInputs) => {
      if (!key) return;
      try {
        if (flow.kind === 'noticing') {
          await saveEntry(db, inputs, flow.id, key);
        } else if (flow.kind === 'meeting') {
          const targetPartId = existingPartId ?? (await savePart(db, inputs, key));
          sessionIdRef.current = await saveSession(db, inputs, flow.id, targetPartId, key);
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

      // The just-completed step joins the transcript regardless of where we go next.
      const nextHistory = [...state.history, state.stepIndex];

      // Determine next step index
      const branchTarget = goTo ?? evaluateBranch(step.branch, nextInputs);
      const nextIndex = branchTarget
        ? stepIndexById(flow.steps, branchTarget)
        : state.stepIndex + 1;

      dispatch({ type: 'ADVANCE', stepIndex: nextIndex, inputs: nextInputs, history: nextHistory });

      if (nextIndex >= flow.steps.length) {
        await persist(nextInputs);
        dispatch({ type: 'COMPLETE' });
      }
    },
    [flow, state, persist],
  );

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

  const transcript = state.history.map((idx) => {
    const s = flow.steps[idx];
    if (!s) return null;
    return <TranscriptTurn key={`${s.id}-${idx}`} step={s} inputs={state.inputs} />;
  });

  const currentStep = !state.done ? flow.steps[state.stepIndex] : undefined;

  return (
    <SafeAreaView style={styles.safe}>
      {groundingBanner}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.inner}>
            {transcript}

            {currentStep && (
              <FadeSlide key={currentStep.id}>
                <ActiveStep
                  step={currentStep}
                  inputs={state.inputs}
                  onNext={advance}
                  onExit={handleExit}
                />
              </FadeSlide>
            )}

            {state.done && (
              <FadeSlide duration={420} style={styles.closeBlock}>
                <Text style={styles.closeBody}>{resolveTokens(flow.exit.body, state.inputs)}</Text>

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
                          // Link the experiment to the session it came from, so
                          // the integration loop can later invite a return.
                          await addExperiment(db, experimentText.trim(), key, sessionIdRef.current);
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
              </FadeSlide>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ActiveStep({ step, inputs, onNext, onExit }: StepProps) {
  switch (step.type) {
    case 'prompt':
      return <PromptStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'scale':
      return <ScaleStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'choice':
      return <ChoiceStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'passage':
      return <PassageStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'pause':
      return <PauseStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'dialogue':
      return <DialogueStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'resource':
      return <ResourceStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    case 'exitOffer':
      return <ExitOfferStep step={step} inputs={inputs} onNext={onNext} onExit={onExit} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scrollContent: {
    padding: Spacing.four,
    paddingTop: Spacing.five,
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.five,
  },
  closeBlock: { gap: Spacing.four, paddingTop: Spacing.three },
  closeBody: {
    ...typography.display,
    fontSize: 26,
    lineHeight: 38,
    color: colors.textPrimary,
  },
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
