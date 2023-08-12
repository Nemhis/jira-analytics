import { Raw } from '@/@interfaces/Raw';

export default class Sprint {
  id: number | null;
  name: string | null;
  state: string | null;

  constructor(raw: Raw) {
    this.id = Number(raw['id'] || null);
    this.name = raw['name'] ? String(raw['name']) : null;
    this.state = raw['state'] ? String(raw['state']) : null;
  }

  static fromRaw(raw: Raw): Sprint {
    return new Sprint(raw);
  }
}
