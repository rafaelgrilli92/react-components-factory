import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SignaturePad from 'signature_pad';

const propTypes = {
  onChange: React.PropTypes.func
}

class Signature extends Component {
  constructor() {
    super();
    this.signaturePad = null;  
  }

  componentDidMount() {
    this.renderSignaturePad();
    return window.addEventListener("resize", this.renderSignaturePad);
  }

  onChange = (value) => {
    if (this.props.onChange)
      this.props.onChange(value);
  }

  dataURLtoFile = (dataURL) => {
    var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

  handleClear = () => {
    this.signaturePad.clear();
    this.onChange(null);
  }

  handleEndSignature = () => {
    let signatureBase64 = this.signaturePad.toDataURL();
    return this.onChange(this.dataURLtoFile(signatureBase64));
  }

  renderSignaturePad = () => {
    var canvas = this.refs.canvas;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      this.signaturePad = new SignaturePad(canvas, {
        onEnd: this.handleEndSignature
      });
      
      return this.onChange(null);
    }
  }

  render() {  
    return (
      <div className="signature-box">
        <canvas ref="canvas" style={{width: "100%"}} height="250"></canvas>
        <button type="button" className="btn btn-small btn-danger clear-signature-btn" onClick={this.handleClear}>CLEAR</button>
      </div>
    );
  }
}

Signature.propTypes = propTypes;

export default Signature;