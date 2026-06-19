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
  /** Commit the step's value and advance. `goTo` jumps within this flow;
   *  `goToFlow` hands off to another flow (the entryway spine), optionally
   *  carrying `seedKeys` forward as echo params. */
  onNext: (value?: string | number, goTo?: string, goToFlow?: string, seedKeys?: string[]) => void;
  onExit: () => void;
}
