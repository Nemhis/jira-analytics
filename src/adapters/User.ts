import { Raw } from '@/@types/Raw';
export default class User {
  account_id: string;
  name: string;
  email: string;
  picture: string;
  nickname: string;

  constructor(raw: Raw) {
    this.account_id = String(raw['account_id'] || '');
    this.name = String(raw['name'] || '');
    this.nickname = String(raw['nickname'] || '');
    this.email = String(raw['email'] || '');
    this.picture = String(raw['picture'] || '');
  }

  static fromRaw(raw: Raw): User {
    return new User(raw);
  }
}
