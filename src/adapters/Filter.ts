import { Raw } from '@/@types/Raw';

export default class Filter {
  public projectId: number | null;

  constructor(raw: Raw) {
    this.projectId = raw['project_id'] ? Number(raw['project_id']) : null;
  }

  static fromRaw(raw: Raw): Filter {
    return new Filter(raw);
  }

  static toRaw(item: Filter): Raw {
    return {
      project_id: item.projectId ?? undefined,
    };
  }

  static toJQL(item: Filter): Raw {
    return {
      jql: item.projectId ? `project=${item.projectId}` : undefined,
    };
  }
}
