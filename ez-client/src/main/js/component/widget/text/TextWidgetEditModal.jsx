import { connect } from "react-redux";
import { bindActionCreators  } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalType } from 'component/modal/Modal.jsx';
import { WidgetEventCreator } from 'redux/event/WidgetEvent';
import { ModalEventCreator } from 'redux/event/ModalEvent';
import UUID from 'utils/UUID.js';

class TextWidgetEditModal extends Modal {

  static propTypes = {
    widgetId: PropTypes.string.isRequired,
    textType: PropTypes.oneOf(["none", "good", "info", "warn", "danger"]),
    text: PropTypes.string
  };

  static defaultProps = {
    textType: "none",
    text: "",
    modalType: ModalType.OkCancel,
    title: "TextWidget edit"
  };

  onCancel() {
    this.props.modalEvents.hideModal();
  }

  onOk() {
    let formData = new FormData(document.getElementById("textWidgetEditForm"));
    this.props.widgetEvents.updateConfig(this.props.widgetId, {
      text: formData.get('widgetText'),
      textType: formData.get('widgetTextType'),
    });
  }

  generateSelectOptions() {
    let result = [];
    let options = [
      { value: 'none', label: 'None' },
      { value: 'good', label: 'Good' },
      { value: 'info', label: 'Info' },
      { value: 'warn', label: 'Warn' },
      { value: 'danger', label: 'Danger' }
    ];
    options.forEach(opt => {
      result.push(
        <option key={UUID.random()} value={opt.value}>
          {opt.label}
        </option>
      );
    });
    return result;
  }

  renderContent() {
    return (
      <form id="textWidgetEditForm">
        <label htmlFor="widgetTextType">
          Type
        </label>
        <select key={UUID.random()}
                name="widgetTextType"
                defaultValue={this.props.textType}>
          {this.generateSelectOptions()}
        </select>
        <label htmlFor="widgetText">
          Text
        </label>
        <input key={UUID.random()}
               type="text"
               name="widgetText"
               defaultValue={this.props.text}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.modal
  };
};

const mapDispatchToProps = dispatch => ({
  widgetEvents: bindActionCreators(WidgetEventCreator, dispatch),
  modalEvents: bindActionCreators(ModalEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextWidgetEditModal);

