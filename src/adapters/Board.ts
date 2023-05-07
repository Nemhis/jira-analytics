import { Raw } from '@/@types/Raw';

interface BoardField {
  id: number | null;
  name: string | null;
}
export default class Board {
  values: BoardField = {
    id: null,
    name: '',
  };

  constructor(raw: Raw) {
    const values = raw['values'];
    this.values.id = values['id'] ? Number(values['id']) : null;
    this.values.name = values['name'] ? String(values['name']) : '';
  }

  static fromRaw(raw: Raw): Board {
    return new Board(raw);
  }
}
