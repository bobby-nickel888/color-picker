import './ColorSelectorComponent.scss';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export default class ColorSelectorComponent extends Component {

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChangeColor: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      value: this.props.value
    };
  }

  handleClick(index) {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });

    if (this.props.onChangeColor) {
      this.props.onChangeColor(this.state.value);
    }
  }

  handleChange = (color) => {
    this.setState({ value: color.rgb });
  };

  render () {
    const styles = reactCSS({
      'default': {
        color: {
          width: '50px',
          height: '30px',
          background: `rgba(${ this.state.value.r }, ${ this.state.value.g }, ${ this.state.value.b }, ${ this.state.value.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div className = "color-selector-component">
        <div style={ styles.swatch } onClick={ this.handleClick.bind(this) }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker &&
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose.bind(this) } />
            <SketchPicker color={ this.state.value } onChange={ this.handleChange.bind(this) } />
          </div>
        }
      </div>
    );
  }
}
