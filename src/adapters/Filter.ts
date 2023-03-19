import { Raw } from '@/@types/Raw';
import JqlQueryBuilder from '@/adapters/JQLBuilder';

export default class Filter {
  public projectId: number | null;
  public sprintIds: Array<number> | null;
  public issueIds: Array<number> | null;
  public implementerIds: Array<string> | null;
  public boardId: number | null;

  constructor(raw: Raw) {
    this.projectId = raw['project_id'] ? Number(raw['project_id']) : null;
    this.sprintIds = raw['sprint_ids'].length ? Array(raw[Number('sprint_ids')]) : null;
    this.issueIds = raw['issue_ids'] ? raw['issue_ids'] : null;
    this.implementerIds = raw['implementer_ids'] ? raw['implementer_ids'] : null;
    this.boardId = raw['board_id'] ? Number(raw['board_id']) : null;
  }

  static fromRaw(raw: Raw): Filter {
    return new Filter(raw);
  }

  static toRaw(item: Filter): Raw {
    return {
      project_id: item.projectId ?? undefined,
      board_id: item.boardId ?? undefined,
      sprint_ids: item.sprintIds && item.sprintIds.length ? item.sprintIds.map((id: number) => Number(id)) : undefined,
      issue_ids: item.issueIds && item.issueIds.length ? item.issueIds.map((id: number) => Number(id)) : undefined,
      implementer_ids:
        item.implementerIds && item.implementerIds.length
          ? item.implementerIds.map((id: string) => String(id))
          : undefined,
    };
  }

  static toJQL(item: Filter): string {
    const query = new JqlQueryBuilder();

    query
      .when(item.projectId, () => query.where('project', '=', item.projectId))
      .when(item.sprintIds?.length, () => query.whereIn('sprint', item.sprintIds))
      .when(item.issueIds?.length, () => query.whereIn('issue', item.issueIds))
      .when(item.implementerIds?.length, () => query.whereIn('assignee', item.implementerIds));

    return query.toString();
  }
}
