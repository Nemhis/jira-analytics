import { AxiosInstance } from 'axios';
import AuthApi from '@/api/modules/AuthApi';
import JiraApi from '@/api/modules/JiraApi';
import AtlassianApi from '@/api/modules/AtlassianApi';

export interface ApiModules {
  proxy: AxiosInstance;
  jira: AxiosInstance;
  atlassian: AxiosInstance;
}

export default class Api {
  private readonly instances: ApiModules;
  public auth: AuthApi;
  public jira: JiraApi;
  public atlassian: AtlassianApi;

  constructor(instances: ApiModules) {
    this.instances = instances;
    this.auth = new AuthApi(this.instances.proxy);
    this.jira = new JiraApi(this.instances.jira);
    this.atlassian = new AtlassianApi(this.instances.atlassian);
  }
}
