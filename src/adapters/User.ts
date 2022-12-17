import { Raw } from '@/@types/Raw';

export default class User {
  id: number;
  name: string;

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.name = String(raw['name'] || '');
  }

  static fromRaw(raw: Raw): User {
    return new User(raw);
  }
}
