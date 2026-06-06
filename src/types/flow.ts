export type StepType =
  | 'prompt'
  | 'scale'
  | 'choice'
  | 'passage'
  | 'pause'
  | 'dialogue'
  | 'resource'
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
  inputKey: string;
}

export interface ResourceStep extends BaseStep {
  type: 'resource';
  body: string;
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
  | ExitOfferStep;

export interface FlowSafety {
  chargeKey: string;
  threshold: number;
  onHighCharge: string;
}

export interface FlowExit {
  type: 'close';
  body: string;
  celebrate: false;
}

export interface Flow {
  id: string;
  kind: 'noticing' | 'meeting' | 'golden' | 'integration' | 'grounding';
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

export interface CrisisResources {
  lines: CrisisLine[];
}
