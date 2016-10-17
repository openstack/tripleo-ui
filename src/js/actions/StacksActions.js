import { normalize, arrayOf } from 'normalizr';

import { browserHistory } from 'react-router';
import HeatApiErrorHandler from '../services/HeatApiErrorHandler';
import HeatApiService from '../services/HeatApiService';
import NotificationActions from '../actions/NotificationActions';
import StacksConstants from '../constants/StacksConstants';
import { stackSchema, stackResourceSchema } from '../normalizrSchemas/stacks';

export default {
  fetchStacksPending() {
    return {
      type: StacksConstants.FETCH_STACKS_PENDING
    };
  },

  fetchStacksSuccess(data) {
    return {
      type: StacksConstants.FETCH_STACKS_SUCCESS,
      payload: data
    };
  },

  fetchStacksFailed(error) {
    return {
      type: StacksConstants.FETCH_STACKS_FAILED
    };
  },

  fetchStacks(planName) {
    return dispatch => {
      dispatch(this.fetchStacksPending());
      HeatApiService.getStacks().then(response => {
        const stacks = normalize(response.stacks, arrayOf(stackSchema)).entities.stacks || {};
        dispatch(this.fetchStacksSuccess(stacks));
      }).catch(error => {
        console.error('Error retrieving stacks StackActions.fetchStacks', error); //eslint-disable-line no-console
        let errorHandler = new HeatApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
        dispatch(this.fetchStacksFailed(error));
      });
    };
  },

  fetchResourcesPending() {
    return {
      type: StacksConstants.FETCH_RESOURCES_PENDING
    };
  },

  fetchResourcesSuccess(resources) {
    return {
      type: StacksConstants.FETCH_RESOURCES_SUCCESS,
      payload: resources
    };
  },

  fetchResourcesFailed() {
    return {
      type: StacksConstants.FETCH_RESOURCES_FAILED
    };
  },

  fetchResources(stackName, stackId) {
    return (dispatch) => {
      dispatch(this.fetchResourcesPending());
      HeatApiService.getResources(stackName, stackId).then(({ resources }) => {
        const res = normalize(resources,
                              arrayOf(stackResourceSchema)).entities.stackResources || {};
        dispatch(this.fetchResourcesSuccess(res));
      }).catch((error) => {
        console.error('Error retrieving resources StackActions.fetchResources', error); //eslint-disable-line no-console
        let errorHandler = new HeatApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
        dispatch(this.fetchResourcesFailed(error));
      });
    };
  },

  fetchResourceSuccess(resource) {
    return {
      type: StacksConstants.FETCH_RESOURCE_SUCCESS,
      payload: resource
    };
  },

  fetchResourceFailed(resourceName) {
    return {
      type: StacksConstants.FETCH_RESOURCE_FAILED,
      payload: resourceName
    };
  },

  fetchResourcePending() {
    return {
      type: StacksConstants.FETCH_RESOURCE_PENDING
    };
  },

  fetchResource(stack, resourceName) {
    return (dispatch) => {
      dispatch(this.fetchResourcePending());
      HeatApiService.getResource(stack, resourceName).then(({ resource }) => {
        dispatch(this.fetchResourceSuccess(resource));
      }).catch((error) => {
        console.error('Error retrieving resource StackActions.fetchResource', error); //eslint-disable-line no-console
        let errorHandler = new HeatApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
        dispatch(this.fetchResourceFailed(resourceName));
      });
    };
  },

  fetchEnvironmentSuccess(stack, environment) {
    return {
      type: StacksConstants.FETCH_ENVIRONMENT_SUCCESS,
      payload: {
        environment,
        stack
      }
    };
  },

  fetchEnvironmentFailed(stack) {
    return {
      type: StacksConstants.FETCH_ENVIRONMENT_FAILED,
      payload: {
        stack
      }
    };
  },

  fetchEnvironmentPending(stack) {
    return {
      type: StacksConstants.FETCH_ENVIRONMENT_PENDING,
      payload: {
        stack
      }
    };
  },

  fetchEnvironment(stack) {
    return (dispatch) => {
      dispatch(this.fetchEnvironmentPending(stack));
      HeatApiService.getEnvironment(stack).then((response) => {
        dispatch(this.fetchEnvironmentSuccess(stack, response));
      }).catch((error) => {
        console.error('Error retrieving environment StackActions.fetchEnvironment', error); //eslint-disable-line no-console
        let errorHandler = new HeatApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
        dispatch(this.fetchEnvironmentFailed(error));
      });
    };
  },

  deleteStackRequestFailed() {
    return {
      type: StacksConstants.DELETE_STACK_REQUEST_FAILED
    };
  },

  deleteStackRequestPending() {
    return {
      type: StacksConstants.DELETE_STACK_REQUEST_PENDING
    };
  },

  /**
   * Starts a delete request for a stack.
   */
  deleteStack(stackName, stackId) {
    return (dispatch) => {
      dispatch(this.deleteStackRequestPending());
      HeatApiService.deleteStack(stackName, stackId).then((response) => {
        dispatch(this.fetchStacks());
        browserHistory.push('/deployment-plan');
      }).catch((error) => {
        console.error('Error retrieving environment StackActions.fetchEnvironment', error); //eslint-disable-line no-console
        let errorHandler = new HeatApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
        dispatch(this.deleteStackRequestFailed());
      });
    };
  }

};
