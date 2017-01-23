import { injectIntl } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import common from '../../messages/common';
import DeleteStackButton from './DeleteStackButton';
import { deploymentStatusMessages } from '../../constants/StacksConstants';
import InlineNotification from '../ui/InlineNotification';
import OvercloudInfo from '../deployment/OvercloudInfo';

class DeploymentSuccess extends React.Component {
  componentDidMount() {
    this.props.fetchStackResource(this.props.stack, 'PublicVirtualIP');
    this.props.fetchStackEnvironment(this.props.stack);
    this.props.runPostDeploymentValidations();
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <InlineNotification type="success"
                            title={deploymentStatusMessages[this.props.stack.stack_status]}>
          <p>{this.props.stack.stack_status_reason}</p>
        </InlineNotification>
        <OvercloudInfo stackResourcesLoaded={this.props.stackResourcesLoaded}
                       stack={this.props.stack}
                       stackResources={this.props.stackResources}/>
        <DeleteStackButton content={formatMessage(common.deleteDeployment)}
                           deleteStack={this.props.deleteStack}
                           disabled={this.props.isRequestingStackDelete}
                           loaded={!this.props.isRequestingStackDelete}
                           loaderContent={formatMessage(common.requestingDeletionOfDeployment)}
                           stack={this.props.stack}/>
      </div>
    );
  }
}

DeploymentSuccess.propTypes = {
  deleteStack: React.PropTypes.func.isRequired,
  fetchStackEnvironment: React.PropTypes.func.isRequired,
  fetchStackResource: React.PropTypes.func.isRequired,
  intl: React.PropTypes.object,
  isRequestingStackDelete: React.PropTypes.bool,
  runPostDeploymentValidations: React.PropTypes.func.isRequired,
  stack: ImmutablePropTypes.record.isRequired,
  stackResources: ImmutablePropTypes.map.isRequired,
  stackResourcesLoaded: React.PropTypes.bool.isRequired
};

export default injectIntl(DeploymentSuccess);
