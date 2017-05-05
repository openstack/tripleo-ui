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

import { defineMessages, injectIntl } from 'react-intl';
import React, { PropTypes } from 'react';

import Loader from '../ui/Loader';

const messages = defineMessages({
  loadingCurrentConfiguration: {
    id: 'DeploymentConfigurationSummary.loadingCurrentConfiguration',
    defaultMessage: 'Loading current Deployment Configuration...'
  }
});

class DeploymentConfigurationSummary extends React.Component {
  componentDidMount() {
    if(this.props.planName) {
      this.props.fetchEnvironmentConfiguration(this.props.planName);
    }
  }

  componentDidUpdate() {
    if(this.props.loaded === false && this.props.isFetching === false && this.props.planName) {
      this.props.fetchEnvironmentConfiguration(this.props.planName);
    }
  }

  render() {
    return (
      <Loader loaded={this.props.loaded}
              content={this.props.intl.formatMessage(messages.loadingCurrentConfiguration)}
              component="span"
              inline>
        <span>{this.props.summary}</span>
      </Loader>
    );
  }
}
DeploymentConfigurationSummary.propTypes = {
  fetchEnvironmentConfiguration: PropTypes.func.isRequired,
  intl: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  planName: PropTypes.string,
  summary: PropTypes.string.isRequired
};

export default injectIntl(DeploymentConfigurationSummary);
