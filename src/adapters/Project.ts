import { Raw } from '@/@types/Raw';

export default class Project {
  id: string;
  key: string;
  name: string;
  avatarUrls: string;

  constructor(raw: Raw) {
    this.id = String(raw['id']);
    this.key = String(raw['key'] || '');
    this.name = String(raw['name'] || '');
    this.avatarUrls = String(raw['avatarUrls']['48x48']);
  }

  static fromRaw(raw: Raw): Project {
    return new Project(raw);
  }
}
