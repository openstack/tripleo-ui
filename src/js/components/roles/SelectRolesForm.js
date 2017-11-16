/**
 * Copyright 2017 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { Button, Col } from 'react-bootstrap';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { pickBy } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form';

import FloatingToolbar from '../ui/FloatingToolbar';
import FormErrorList from '../ui/forms/FormErrorList';

const messages = defineMessages({
  confirm: {
    id: 'SelectRolesForm.confirm',
    defaultMessage: 'Confirm Selection'
  },
  cancel: {
    id: 'SelectRolesForm.cancel',
    defaultMessage: 'Cancel'
  },
  primaryRoleValidationError: {
    id: 'SelectRolesForm.primaryRoleValidationError',
    defaultMessage: 'Please select one role tagged as "primary"'
  }
});

class SelectRolesForm extends React.Component {
  render() {
    const {
      children,
      currentPlanName,
      error,
      handleSubmit,
      invalid,
      pristine,
      submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Col sm={12}>
          <FormErrorList errors={error ? [error] : []} />
        </Col>
        {children}
        <FloatingToolbar bottom right>
          <Button
            disabled={invalid || pristine}
            bsStyle="primary"
            type="submit"
          >
            <FormattedMessage {...messages.confirm} />
          </Button>
          {' '}
          <Link to={`/plans/${currentPlanName}`} className="btn btn-default">
            <FormattedMessage {...messages.cancel} />
          </Link>
        </FloatingToolbar>
      </form>
    );
  }
}
SelectRolesForm.propTypes = {
  children: PropTypes.node,
  currentPlanName: PropTypes.string.isRequired,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired
};

const validateForm = (values, { availableRoles }) => {
  const errors = {};
  const selectedRoleNames = Object.keys(pickBy(values));
  const selectedRoles = availableRoles.filter((r, k) =>
    selectedRoleNames.includes(k)
  );
  if (!selectedRoles.some(r => r.tags.includes('primary'))) {
    errors._error = {
      message: <FormattedMessage {...messages.primaryRoleValidationError} />
    };
  }
  return errors;
};

const form = reduxForm({
  enableReinitialize: true,
  form: 'selectRoles',
  keepDirtyOnReinitialize: true,
  validate: validateForm
});

export default injectIntl(form(SelectRolesForm));
