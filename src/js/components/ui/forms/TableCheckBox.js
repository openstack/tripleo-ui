import Formsy from 'formsy-react';
import React from 'react';

class TableCheckBox extends React.Component {
  changeValue(event) {
    this.props.setValue(event.target.checked);
  }

  renderErrorMessage() {
    let errorMessage = this.props.getErrorMessage();
    return errorMessage ? (
      <span className="help-block">{errorMessage}</span>
    ) : false;
  }

  renderDescription() {
    let description = this.props.description;
    return description ? (
      <small className="help-block">{description}</small>
    ) : false;
  }

  render() {
    return (
      <input type={this.props.type}
             name={this.props.name}
             ref={this.props.id}
             id={this.props.id}
             onChange={this.changeValue.bind(this)}
             checked={!!this.props.getValue()}
             value={this.props.getValue()}/>
    );
  }
}
TableCheckBox.propTypes = {
  description: React.PropTypes.string,
  getErrorMessage: React.PropTypes.func,
  getValue: React.PropTypes.func,
  id: React.PropTypes.string.isRequired,
  isRequired: React.PropTypes.func,
  isValid: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  setValue: React.PropTypes.func,
  showError: React.PropTypes.func,
  showRequired: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};
TableCheckBox.defaultProps = {
  type: 'checkbox'
};
export default Formsy.HOC(TableCheckBox);
