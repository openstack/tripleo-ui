import { FormattedMessage } from 'react-intl';
import React from 'react';

import Loader from '../ui/Loader';

export default class DeploymentConfigurationSummary extends React.Component {
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
              content={<FormattedMessage
                         id="loading-current-deployment-configuration"
                         defaultMessage="Loading current Deployment Configuration..."
                         description="Loader for current deployment configuration"/>}
              component="span"
              inline>
        <span>{this.props.summary}</span>
      </Loader>
    );
  }
}
DeploymentConfigurationSummary.propTypes = {
  fetchEnvironmentConfiguration: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  loaded: React.PropTypes.bool.isRequired,
  planName: React.PropTypes.string,
  summary: React.PropTypes.string.isRequired
};
