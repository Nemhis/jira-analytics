import { Raw } from '@/@types/Raw';

export enum ChangelogItemField {
  STATUS = 'status',
  ASSIGNEE = 'assignee',
}

export default class ChangelogItem {
  field: string;
  fieldType: string;
  fieldId: string;
  from: number | null;
  fromString: string | null;
  to: number | null;
  toString: string | null;

  constructor(raw: Raw) {
    this.field = String(raw['field']) as ChangelogItemField;
    this.fieldType = String(raw['fieldtype']);
    this.fieldId = String(raw['fieldId']);
    this.from = raw['from'] ? Number(raw['from']) : null;
    this.fromString = raw['fromString'] ? String(raw['fromString']) : null;
    this.to = raw['to'] ? Number(raw['to']) : null;
    this.toString = raw['toString'] ? String(raw['toString']) : null;
  }

  static fromRaw(raw: Raw): ChangelogItem {
    return new ChangelogItem(raw);
  }
}
