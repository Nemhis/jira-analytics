import { Raw } from '@/@types/Raw';

interface IssueFields {
  summary: string;
}

export default class Issue {
  id: string;
  key: string;
  fields: IssueFields = {
    summary: '',
  };

  constructor(raw: Raw) {
    this.id = String(raw['id']);
    this.key = String(raw['key'] || '');
    const fields = raw['fields'] || {};
    this.fields.summary = String(fields['summary'] || '');
  }

  static fromRaw(raw: Raw): Issue {
    return new Issue(raw);
  }
}
