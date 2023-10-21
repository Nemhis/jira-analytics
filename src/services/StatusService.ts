import WorkflowStatus from '@/adapters/WorkflowStatus';

export default class StatusService {
  filterByProject(projectId: number, statuses: WorkflowStatus[]) {
    return statuses.filter((status: WorkflowStatus) => status.usages.some((usage) => usage.project.id === projectId));
  }
}
