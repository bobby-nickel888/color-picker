import './GradientFormComponent.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { gradientFormActions } from '../../actions';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { HistoryComponent, BtSelectorComponent, ColorSelectorComponent } from '../../components';
import * as gradUtil from '../../utils/gradient';

class GradientFormComponent extends Component {
  
  static propTypes = {
    gradientForm: PropTypes.object.isRequired,
    
    selectStyle: PropTypes.func.isRequired,
    selectColor: PropTypes.func.isRequired,
    selectDirection: PropTypes.func.isRequired,
    
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      styleText: ''
    }
  }

  stylizeCanvas(gt) {
    var stArray = gradUtil.getStyle(gt);
    var stText = "";

    for (var i = 0; i < stArray.length; i ++) {
      document.getElementById("gradCanvas").style.background = stArray[i];
      stText += "background: " + stArray[i] + ";\r\n";
    }

    this.setState({styleText: stText});
  }

  componentDidMount() {
    this.stylizeCanvas(this.props.gradientForm);
  }

  componentWillReceiveProps(nextProps) {
    this.stylizeCanvas(nextProps.gradientForm);
  }

  render () {
    const { gradientForm, canUndo, canRedo } = this.props;
    
    return (
      <div className = "wrapper">
        <div className="content-wrapper">
          <Row>
            <Col xs={12} sm={6} md={5}>
              {/* Left panel with options */}
              <BtSelectorComponent
                title="STYLE:" 
                buttonList={gradUtil.GradientStyles}
                selected={gradientForm.style}
                onClickButton={this.props.selectStyle}
              />

              <BtSelectorComponent
                title="DIRECTION:" 
                buttonList={gradUtil.GradientDirections[gradientForm.style]}
                selected={gradientForm.direction}
                onClickButton={this.props.selectDirection}
              />

              <div> COLORS: </div>
              <ColorSelectorComponent
                value={gradientForm.startPointColor}
                onChangeColor={(val) => this.props.selectColor(0, val)}
              />
              <ColorSelectorComponent
                value={gradientForm.endPointColor}
                onChangeColor={(val) => this.props.selectColor(1, val)}
              />
            </Col>
            <Col xs={12} sm={6} md={7}>
              {/* Drawing canvas with css */}
              <HistoryComponent canDoOptions={{
                  canUndo: canUndo,
                  canRedo: canRedo
                }}
                onGoBack={()=>this.props.onUndo}
                onGoForward={()=>this.props.onRedo}
              />
              <div className="canvas" id="gradCanvas">
              </div>
              <textarea value={this.state.styleText} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gradientForm: state.gradientForm.present,
    canUndo: state.gradientForm.past.length > 0,
    canRedo: state.gradientForm.future.length > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectStyle: bindActionCreators(gradientFormActions.selectGradientStyle, dispatch),
    selectColor: bindActionCreators(gradientFormActions.selectGradientColor, dispatch),
    selectDirection: bindActionCreators(gradientFormActions.selectGradientDirection, dispatch),
    
    onUndo: bindActionCreators(UndoActionCreators.undo, dispatch),
    onRedo: bindActionCreators(UndoActionCreators.redo, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GradientFormComponent);