export interface Bench {
  title: string;
  experiments: Experiment[];
}

export interface Experiment {
  title: string;
  content: React.ReactNode;
}
