import WorkflowStatus from '@/adapters/WorkflowStatus';
import Project from '@/adapters/Project';

export default class StatusService {
  filterByProject(project: Project, statuses: WorkflowStatus[]) {
    return Array.from(statuses.values());
  }
}
