import type { FlowInputs, Step } from '@/types/flow';

/**
 * Shared props for every step renderer. In the thread model each step renders
 * an *inline block* (not its own Screen) and receives the flow's accumulated
 * `inputs` so its authored copy can echo the user's earlier words back via
 * resolveTokens.
 */
export interface StepProps<T extends Step = Step> {
  step: T;
  inputs: FlowInputs;
  onNext: (value?: string | number, goTo?: string) => void;
  onExit: () => void;
}
