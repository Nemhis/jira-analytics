import AuthApi from '@/api/modules/AuthApi';
import JiraApi from '@/api/modules/JiraApi';
import AtlassianApi from '@/api/modules/AtlassianApi';
import { createAtlassian, createJira, createProxy } from '@/api/api-factory';

const createAPI = () => ({
  auth: new AuthApi(createProxy()),
  jira: new JiraApi(createJira()),
  atlassian: new AtlassianApi(createAtlassian()),
});

export default createAPI();
