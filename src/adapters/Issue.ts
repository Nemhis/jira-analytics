import { Raw } from '@/@interfaces/Raw';

interface IssueFields {
  summary: string;
}

export default class Issue {
  id: number;
  key: string;
  fields: IssueFields = {
    summary: '',
  };

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.key = String(raw['key'] || '');
    const fields = raw['fields'] || {};
    this.fields.summary = String(fields['summary'] || '');
  }

  static fromRaw(raw: Raw): Issue {
    return new Issue(raw);
  }
}
