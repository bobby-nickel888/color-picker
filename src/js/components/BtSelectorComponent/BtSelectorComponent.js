import './BtSelectorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

export default class BtSelectorComponent extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    buttonList: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onClickButton: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  onClickButton(bt) {
    this.setState({ selected: bt });

    if (this.props.onClickButton) {
      this.props.onClickButton(bt);
    }
  }

  renderButtons() {
    return this.props.buttonList.map((bt) =>
      (
        <Button 
          bsStyle="info" 
          key={bt}
          active={this.state.selected == bt ? true : false}
          onClick={this.onClickButton.bind(this, bt)}
        >
        {bt}
        </Button>
      )
    );
  }

  render () {
    return (
      <div className = "bt-selector-component">
        <div className="title">{this.props.title}</div>
        <ButtonToolbar>
          <ButtonGroup>
            {this.renderButtons()}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}
