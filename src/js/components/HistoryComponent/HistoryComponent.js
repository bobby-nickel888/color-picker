import './HistoryComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class HistoryComponent extends Component {

  static propTypes = {
    canDoOptions: PropTypes.object.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onGoForward: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render () {
    let { canDoOptions } = this.props;

    return (
      <div className = "history-component">
        <span> Tracking: </span>
        <Button bsStyle="default" bsSize="xsmall" onClick={this.props.onGoBack()} disabled={!canDoOptions.canUndo}>
          <Glyphicon glyph="chevron-left" />
        </Button>
        <Button bsStyle="default" bsSize="xsmall" onClick={this.props.onGoForward()} disabled={!canDoOptions.canRedo}>
          <Glyphicon glyph="chevron-right" />
        </Button>
      </div>
    );
  }
}
