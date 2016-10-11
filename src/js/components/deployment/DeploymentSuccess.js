import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import Loader from '../ui/Loader';
import { deploymentStatusMessages } from '../../constants/StacksConstants';
import InlineNotification from '../ui/InlineNotification';

export default class DeploymentSuccess extends React.Component {
  render() {
    const loaded = !this.props.stack.resources.isEmpty();
    const ip = this.props.stack.resources.getIn([
      'PublicVirtualIP', 'attributes', 'ip_address'
    ]);

    const password = this.props.stack.getIn([
      'environment', 'parameter_defaults', 'AdminPassword'
    ]);

    return (
      <div className="col-sm-12">
        <InlineNotification type="success"
                            title={deploymentStatusMessages[this.props.stack.stack_status]}>
          <p>{this.props.stack.stack_status_reason}</p>
        </InlineNotification>
        <h4>Overcloud information:</h4>
        <Loader loaded={loaded} content="Loading overcloud information...">
          <ul>
            <li>Overcloud IP address: <a href={`http://${ip}`}>http://{ip}</a></li>
            <li>Password: {password}</li>
          </ul>
        </Loader>
      </div>
    );
  }
}

DeploymentSuccess.propTypes = {
  planName: React.PropTypes.string.isRequired,
  stack: ImmutablePropTypes.record.isRequired
};
