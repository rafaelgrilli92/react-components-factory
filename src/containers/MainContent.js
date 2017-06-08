import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../logo.svg';
import ComponentBox from './ComponentBox'

// Components
import MultiplePicturesInput from '../components/MultiplePicturesInput';
import Signature from '../components/Signature';


class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: ''
    }

    this.handleChangeSignature = this.handleChangeSignature.bind(this);
  }
  
  handleChangeSignature(signature) {     
    if (!signature) return this.setState({ signature });

    let reader = new FileReader();
    reader.readAsDataURL(signature);
    reader.onload = () => {
      this.setState({
        signature: reader.result
      });
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Components Factory</h2>
        </div>
        <div className="container">
          <ComponentBox title="Multiple Pictures Input">
            <MultiplePicturesInput quality={0.5} />
          </ComponentBox>
          <ComponentBox title="Signature">
            <Signature onChange={this.handleChangeSignature}/>
            <img ref="img" src={this.state.signature} />
          </ComponentBox>      
        </div>
      </div>
    );
  }
}


export default MainContent;