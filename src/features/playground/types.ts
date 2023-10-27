export interface Bench {
  title: string;
  experiments: Experiment[];
}

export interface Experiment {
  title: string;
  description: string;
  content: () => React.ReactNode;
}
