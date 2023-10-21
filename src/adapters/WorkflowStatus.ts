import { Raw } from '@/@interfaces/Raw';

interface WorkflowUsage {
  project: {
    id: number;
  };
}

export default class WorkflowStatus {
  id: number;
  name: string;
  description: string;
  usages: WorkflowUsage[];

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.name = String(raw['name']);
    this.description = String(raw['description']);
    this.usages = Array.isArray(raw['usages'])
      ? raw['usages'].map((usage: Raw) => ({
          project: { id: Number(usage['project']['id']) },
        }))
      : [];
  }

  static fromRaw(raw: Raw): WorkflowStatus {
    return new WorkflowStatus(raw);
  }
}
