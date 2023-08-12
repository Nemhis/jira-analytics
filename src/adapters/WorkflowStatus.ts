import { Raw } from '@/@interfaces/Raw';

export default class WorkflowStatus {
  id: number;
  name: string;
  description: string;

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.name = String(raw['name']);
    this.description = String(raw['description']);
  }

  static fromRaw(raw: Raw): WorkflowStatus {
    return new WorkflowStatus(raw);
  }
}
