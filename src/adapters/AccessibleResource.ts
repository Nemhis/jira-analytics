import { Raw } from '@/@types/Raw';

export default class AccessibleResource {
  id: string;
  name: string;
  url: string;
  avatarUrl: string;
  scopes: Array<string>;

  constructor(raw: Raw) {
    this.id = String(raw['id']);
    this.name = String(raw['name'] || '');
    this.url = String(raw['url'] || '');
    this.avatarUrl = String(raw['avatarUrl'] || '');
    this.scopes = Array.isArray(raw['scopes']) ? raw['scopes'] : [];
  }

  static fromRaw(raw: Raw): AccessibleResource {
    return new AccessibleResource(raw);
  }
}
