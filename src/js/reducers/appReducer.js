import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import currentPlanReducer from './currentPlanReducer';
import environmentConfigurationReducer from './environmentConfigurationReducer';
import i18nReducer from './i18nReducer';
import instancesReducer from './instancesReducer';
import loginReducer from './loginReducer';
import nodesReducer from './nodesReducer';
import notificationsReducer from './notificationsReducer';
import parametersReducer from './parametersReducer';
import plansReducer from './plansReducer';
import registerNodesReducer from './registerNodesReducer';
import rolesReducer from './rolesReducer';
import stacksReducer from './stacksReducer';
import validationsReducer from './validationsReducer';
import workflowExecutionsReducer from './workflowExecutionsReducer';

const appReducer = combineReducers({
  currentPlan: currentPlanReducer,
  environmentConfiguration: environmentConfigurationReducer,
  executions: workflowExecutionsReducer,
  i18n: i18nReducer,
  instances: instancesReducer,
  login: loginReducer,
  nodes: nodesReducer,
  notifications: notificationsReducer,
  parameters: parametersReducer,
  plans: plansReducer,
  registerNodes: registerNodesReducer,
  roles: rolesReducer,
  stacks: stacksReducer,
  validations: validationsReducer,
  form: formReducer
});

export default appReducer;
