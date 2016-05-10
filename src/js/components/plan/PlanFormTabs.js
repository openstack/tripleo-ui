import React from 'react';

import HorizontalInput from '../ui/forms/HorizontalInput';
import NavTab from '../ui/NavTab';
import PlanFileInput from './PlanFileInput';
import PlanFilesTab from './PlanFilesTab';

export default class PlanFormTabs extends React.Component {
  setActiveTab(tabName) {
    return this.props.currentTab === tabName ? 'active' : '';
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <NavTab to="/plans/new" query={{tab: 'newPlan'}}>New Plan</NavTab>
          <NavTab to="/plans/new" query={{tab: 'planFiles'}}>
            Files <span className="badge">{this.props.selectedFiles.length}</span>
          </NavTab>
        </ul>
        <div className="tab-content">
          <PlanFormTab active={this.setActiveTab('newPlan')} />
          <PlanFilesTab active={this.setActiveTab('planFiles')}
                        selectedFiles={this.props.selectedFiles} />
        </div>
      </div>
    );
  }
}
PlanFormTabs.propTypes = {
  currentTab: React.PropTypes.string,
  selectedFiles: React.PropTypes.array
};
PlanFormTabs.defaultProps = {
  currentTtab: 'newPlan',
  selectedFiles: []
};

class PlanFormTab extends React.Component {
  render() {
    return (
      <div className={`tab-pane ${this.props.active}`}>
        <HorizontalInput name="planName"
                         title="Plan Name"
                         inputColumnClasses="col-sm-7"
                         labelColumnClasses="col-sm-3"
                         placeholder="Add a Plan Name"
                         validations={{matchRegexp: /^[A-Za-z0-9_-]+$/}}
                         validationError="Please use only alphanumeric characters and
                                          - or _"
                         required />
        <PlanFileInput name="planFiles"
                       title="Plan Files"
                       inputColumnClasses="col-sm-7"
                       labelColumnClasses="col-sm-3"
                       multiple
                       required/>
      </div>
    );
  }
}
PlanFormTab.propTypes = {
  active: React.PropTypes.string
};
