import { Raw } from '@/@interfaces/Raw';
import AvatarUrls from '@/adapters/AvatarUrls';

export default class Project {
  id: number;
  key: string;
  name: string;
  avatarUrls: AvatarUrls;

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.key = String(raw['key'] || '');
    this.name = String(raw['name'] || '');
    this.avatarUrls = AvatarUrls.fromRaw(raw['avatarUrls']);
  }

  static fromRaw(raw: Raw): Project {
    return new Project(raw);
  }
}
