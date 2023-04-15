import { Raw } from '@/@types/Raw';
import dayjs from 'dayjs';
import ChangelogItem from '@/adapters/ChangelogItem';

export default class Changelog {
  id: number;
  author: {
    displayName: string;
  };
  created: Date;
  items: ChangelogItem[];

  constructor(raw: Raw) {
    this.id = Number(raw['id']);
    this.author = { displayName: raw['author']['displayName'] };
    this.created = dayjs(raw['created']).toDate();
    this.items = Array.isArray(raw['items']) ? raw['items'].map((itemRaw: Raw) => ChangelogItem.fromRaw(itemRaw)) : [];
  }

  static fromRaw(raw: Raw): Changelog {
    return new Changelog(raw);
  }
}
