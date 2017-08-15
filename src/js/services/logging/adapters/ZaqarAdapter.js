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

import { ZAQAR_LOGGING_QUEUE } from '../../../constants/ZaqarConstants';
import ZaqarActions from '../../../actions/ZaqarActions';
import Adapter from './BaseAdapter';
import { getLogLevel } from '../../../services/utils';

export default class ZaqarAdapter extends Adapter {
  constructor(dispatch) {
    super(dispatch);
    this.indent = 0;
    this.buffer = [];
  }

  shouldLog(...args) {
    if (getLogLevel() !== 'full') {
      if (args.length && args.length === 2) {
        if (args[0] === 'prev state' || args[0] === 'next state') {
          return false;
        }
      }
    }

    return true;
  }

  _formatMessage(level, ...message) {
    return {
      message,
      level,
      timestamp: Date.now()
    };
  }

  _send(level, ...message) {
    if (!this.shouldLog(...message)) {
      return;
    }

    if (this.indent !== 0) {
      this.buffer.push({
        message,
        level
      });
      return;
    }

    const msg = this._formatMessage(level, ...message);
    this._dispatch(ZaqarActions.postMessage(ZAQAR_LOGGING_QUEUE, msg));
  }

  debug(...args) {
    this._send('debug', ...args);
  }

  info(...args) {
    this._send('info', ...args);
  }

  warn(...args) {
    this._send('warn', ...args);
  }

  error(...args) {
    this._send('error', ...args);
  }

  group(...args) {
    this.indent++;
  }

  groupCollapsed(...args) {
    this.indent++;
  }

  groupEnd(...args) {
    this.indent--;

    this.buffer.map(m => {
      this._send(m.level, ...m.message);
    });

    this.buffer = [];
  }

  log(...args) {
    this.info(...args);
  }
}
