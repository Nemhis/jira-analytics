import { Raw } from '@/@interfaces/Raw';
export default class User {
  accountId: string;
  name: string;
  email: string;
  picture: string;
  nickname: string;

  constructor(raw: Raw) {
    this.accountId = String(raw['account_id'] || '');
    this.name = String(raw['name'] || '');
    this.nickname = String(raw['nickname'] || '');
    this.email = String(raw['email'] || '');
    this.picture = String(raw['picture'] || '');
  }

  static fromRaw(raw: Raw): User {
    return new User(raw);
  }
}
