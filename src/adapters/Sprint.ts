import { Raw } from '@/@interfaces/Raw';
import dayjs from 'dayjs';

export default class Sprint {
  id: number | null;
  name: string | null;
  state: string | null;
  startDate: Date | null;
  endDate: Date | null;

  constructor(raw: Raw) {
    this.id = Number(raw['id'] || null);
    this.name = raw['name'] ? String(raw['name']) : null;
    this.state = raw['state'] ? String(raw['state']) : null;
    this.startDate = raw['startDate'] ? dayjs(raw['startDate']).toDate() : null;
    this.endDate = raw['endDate'] ? dayjs(raw['endDate']).toDate() : null;
  }

  static fromRaw(raw: Raw): Sprint {
    return new Sprint(raw);
  }
}
