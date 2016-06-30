import BaseHttpRequestErrorHandler from '../components/utils/BaseHttpRequestErrorHandler';

export default class MistralApiErrorHandler extends BaseHttpRequestErrorHandler {
  _generateErrors(errorObj) {
    let errors = [];
    let error;
    // A weak check to find out if it's not an xhr object.
    if(!errorObj.status && errorObj.message) {
      errors.push({
        title: 'Error',
        message: errorObj.message
      });
      return errors;
    }
    switch(errorObj.status) {
    case 0:
      errors.push({
        title: 'Connection Error',
        message: 'Connection to Mistral API is not available'
      });
      break;
    case 401:
      error = JSON.parse(errorObj.responseText).error;
      errors.push({
        title: 'Unauthorized',
        message: error.message
      });
      break;
    case 400: {
      let error = JSON.parse(errorObj.responseText).faultstring;
      errors.push({
        title: 'Bad Request',
        message: error
      });
      break;
    }
    default:
      errors.push({
        title: errorObj.statusText,
        message: errorObj.responseText
      });
      break;
    }
    return errors;
  }
}
