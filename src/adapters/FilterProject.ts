import { Raw } from '@/@types/Raw';

export default class FilterProject {
  public id: number | undefined;

  constructor(raw: Raw) {
    this.id = raw['id'] ? Number(raw['id']) : undefined;
  }

  static fromRaw(raw: Raw): FilterProject {
    return new FilterProject(raw);
  }

  static toRaw(item: FilterProject): Raw {
    return {
      id: item.id ?? undefined,
    };
  }
}
