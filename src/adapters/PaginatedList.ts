import { Raw } from '@/@interfaces/Raw';

export default class PaginatedList<Item> {
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
  values: Item[];

  constructor(raw: Raw) {
    this.startAt = Number(raw['startAt']);
    this.maxResults = Number(raw['maxResults']);
    this.total = Number(raw['total']);
    this.isLast = Boolean(raw['isLast']);
    this.values = [];
  }

  static fromRaw<Item>(raw: Raw): PaginatedList<Item> {
    return new PaginatedList(raw);
  }
}
