export type StepType =
  | 'prompt'
  | 'scale'
  | 'choice'
  | 'passage'
  | 'pause'
  | 'dialogue'
  | 'resource'
  | 'draw'
  | 'exitOffer';

export interface BranchCondition {
  when: {
    inputKey: string;
    gte?: number;
    lte?: number;
    eq?: string;
  };
  goTo: string;
}

interface BaseStep {
  id: string;
  type: StepType;
  branch?: BranchCondition[];
}

export interface PromptStep extends BaseStep {
  type: 'prompt';
  title: string;
  body?: string;
  inputKey: string;
  multiline?: boolean;
  optional?: boolean;
  placeholder?: string;
  assistChips?: string[];
  exitOffer?: boolean;
}

export interface ScaleStep extends BaseStep {
  type: 'scale';
  title: string;
  body?: string;
  inputKey: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export interface ChoiceOption {
  label: string;
  value: string;
  goTo?: string;
  /** Hand off to another flow instead of jumping within this one — the entryway
   *  spine. A "resolve:<key>" value is resolved at runtime (e.g. gender-aware
   *  routing) in threshold.ts; any other value is a literal flow id. */
  goToFlow?: string;
  /** Single-line input keys carried forward as flow-runner params on handoff. */
  seedKeys?: string[];
}

export interface ChoiceStep extends BaseStep {
  type: 'choice';
  title: string;
  body?: string;
  inputKey: string;
  options: ChoiceOption[];
}

export interface PassageStep extends BaseStep {
  type: 'passage';
  body: string;
}

export interface PauseStep extends BaseStep {
  type: 'pause';
  seconds: number;
  body?: string;
}

export interface DialogueStep extends BaseStep {
  type: 'dialogue';
  speaker: 'you' | 'part';
  prompt: string;
  hint?: string;
  inputKey: string;
}

export interface ResourceStep extends BaseStep {
  type: 'resource';
  body: string;
}

/**
 * An imaginative drawing (Jung's Red Book made first-class). The committed
 * value is a serialized { w, h, paths } sketch placed in inputs[inputKey]; a
 * noticing flow persists it to entries.sketch_enc (inputKey 'sketch'), a meeting
 * flow to parts.sketch_enc (inputKey 'partSketch'). Always skippable when
 * optional — drawing is an invitation, never a gate.
 */
export interface DrawStep extends BaseStep {
  type: 'draw';
  title: string;
  body?: string;
  inputKey: string;
  optional?: boolean;
  exitOffer?: boolean;
}

export interface ExitOfferStep extends BaseStep {
  type: 'exitOffer';
  body?: string;
}

export type Step =
  | PromptStep
  | ScaleStep
  | ChoiceStep
  | PassageStep
  | PauseStep
  | DialogueStep
  | ResourceStep
  | DrawStep
  | ExitOfferStep;

export interface FlowSafety {
  chargeKey: string;
  threshold: number;
  onHighCharge: string;
}

/**
 * An optional, authored "next gesture" rendered beside Done on the closing
 * screen — a single invitation into the natural next step (never a score, level,
 * or required path). seedKeys names input keys to carry forward as flow-runner
 * params (only single-line values; e.g. 'quality' → seedQuality).
 */
export interface FlowNext {
  label: string;
  flowId: string;
  seedKeys?: string[];
}

export interface FlowExit {
  type: 'close';
  body: string;
  celebrate: false;
  next?: FlowNext;
  readingId?: string;
}

export interface Flow {
  id: string;
  /** 'entry' flows are thin few-question routers that dispatch into a technique
   *  flow via a choice option's goToFlow; they persist nothing. */
  kind: 'noticing' | 'meeting' | 'golden' | 'integration' | 'grounding' | 'entry';
  title: string;
  subtitle?: string;
  estimatedMinutes?: number;
  entryGate?: string | null;
  safety?: FlowSafety;
  steps: Step[];
  exit: FlowExit;
}

export type FlowInputs = Record<string, string | number | undefined>;

export interface CrisisLine {
  label: string;
  action: string;
  kind: 'call' | 'text' | 'web';
}

export interface CrisisRegion {
  lines: CrisisLine[];
}

export interface CrisisResources {
  /** Year-month the bundled numbers were last reviewed (shown faintly). */
  lastUpdated: string;
  /** Fallback when the device region isn't in `regions` — always safe. */
  international: CrisisRegion;
  /** Region-specific lines, keyed by ISO 3166-1 alpha-2 (e.g. "US", "GB"). */
  regions: Record<string, CrisisRegion>;
}
