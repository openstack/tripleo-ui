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

import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ModalHeader, ModalTitle } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

import AvailableRoleInput from './AvailableRoleInput';
import { CloseModalXButton, RoutedModal } from '../ui/Modals';
import { getMergedRoles, getRoles } from '../../selectors/roles';
import { getCurrentPlanName } from '../../selectors/plans';
import { Loader } from '../ui/Loader';
import RolesActions from '../../actions/RolesActions';
import SelectRolesForm from './SelectRolesForm';

const messages = defineMessages({
  loadingAvailableRoles: {
    id: 'SelectRolesDialog.loadingAvailableRoles',
    defaultMessage: 'Loading available Roles'
  },
  selectRolesTitle: {
    id: 'SelectRolesDialog.selectRoles',
    defaultMessage: 'Select Roles'
  }
});

class SelectRolesDialog extends React.Component {
  componentDidMount() {
    this.props.fetchAvailableRoles();
  }

  render() {
    const {
      availableRoles,
      availableRolesLoaded,
      intl: { formatMessage },
      currentPlanName,
      roles
    } = this.props;
    return (
      <RoutedModal bsSize="xl" redirectPath={`/plans/${currentPlanName}`}>
        <ModalHeader>
          <CloseModalXButton />
          <ModalTitle>
            <FormattedMessage {...messages.selectRolesTitle} />
          </ModalTitle>
        </ModalHeader>
        <SelectRolesForm
          initialValues={availableRoles.map(r => roles.includes(r)).toJS()}
          currentPlanName={currentPlanName}
        >
          <Loader
            loaded={availableRolesLoaded}
            content={formatMessage(messages.loadingAvailableRoles)}
          >
            <div className="row row-cards-pf">
              {availableRoles
                .toList()
                .map(role => (
                  <Field
                    component={AvailableRoleInput}
                    role={role}
                    name={role.name}
                    key={role.name}
                  />
                ))}
            </div>
          </Loader>
        </SelectRolesForm>
      </RoutedModal>
    );
  }
}
SelectRolesDialog.propTypes = {
  availableRoles: ImmutablePropTypes.map.isRequired,
  availableRolesLoaded: PropTypes.bool.isRequired,
  currentPlanName: PropTypes.string.isRequired,
  fetchAvailableRoles: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  roles: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
  availableRoles: getMergedRoles(state),
  availableRolesLoaded: state.availableRoles.loaded,
  currentPlanName: getCurrentPlanName(state),
  roles: getRoles(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAvailableRoles: planName =>
    dispatch(RolesActions.fetchAvailableRoles(planName))
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SelectRolesDialog)
);
