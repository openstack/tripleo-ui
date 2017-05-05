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

import React, { PropTypes } from 'react';

export const Toolbar = ({children}) => {
  return (
    <div className="toolbar-pf">
      <div className="row">
        <div className="col-sm-12">
          {children}
        </div>
      </div>
    </div>
  );
};
Toolbar.propTypes = {
  children: PropTypes.node
};

export const ToolbarActions = ({children}) => (
  <div className="toolbar-pf-actions">
    {children}
  </div>
);
ToolbarActions.propTypes = {
  children: PropTypes.node
};

export const ToolbarResults = ({children}) => (
  <div className="toolbar-pf-results">
    <div className="row">
      <div className="col-sm-12">
        {children}
      </div>
    </div>
  </div>
);
ToolbarResults.propTypes = {
  children: PropTypes.node
};
