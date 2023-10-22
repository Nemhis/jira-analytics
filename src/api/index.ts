import { createAtlassian, createJira, createProxy } from '@/api/api-factory';
import AtlassianApi from '@/api/modules/AtlassianApi';
import AuthApi from '@/api/modules/AuthApi';
import JiraApi from '@/api/modules/JiraApi';

const createAPI = () => ({
  auth: new AuthApi(createProxy()),
  jira: new JiraApi(createJira()),
  atlassian: new AtlassianApi(createAtlassian()),
});

export default createAPI();
