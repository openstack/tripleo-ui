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

import { addLocaleData, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import I18nActions from '../../actions/I18nActions'

// NOTE(hpokorny): src/components/i18n/messages.js is generated by webpack on the fly
import { MESSAGES, LOCALE_DATA } from './messages'
import { getLanguage, getMessages } from '../../selectors/i18n'

class I18nProvider extends React.Component {
  constructor() {
    super()
    addLocaleData(LOCALE_DATA)
  }

  componentDidMount() {
    this.props.detectLanguage(MESSAGES)
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={this.props.messages}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

I18nProvider.propTypes = {
  children: PropTypes.node,
  detectLanguage: PropTypes.func.isRequired,
  language: PropTypes.string,
  messages: PropTypes.object.isRequired
}

I18nProvider.defaultProps = {
  messages: {}
}

const mapDispatchToProps = dispatch => {
  return {
    detectLanguage: language => dispatch(I18nActions.detectLanguage(language))
  }
}

const mapStateToProps = state => {
  return {
    language: getLanguage(state),
    messages: getMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(I18nProvider)
