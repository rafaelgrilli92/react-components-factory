import React, { Component } from 'react';

import logo from '../logo.svg';
import ComponentBox from './ComponentBox'
import HelperApi from '../api/helper';

// Components
import ImageWithCropping from '../components/ImageWithCropping';
import MultiplePicturesInput from '../components/MultiplePicturesInput';
import Signature from '../components/Signature';


class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: {},
      croppedImage: {}
    }

    this.handleChangeSignature = this.handleChangeSignature.bind(this);
  }
  
  handleChangeSignature(signature) {     
    if (!signature) return this.setState({ signature: {} });

    let reader = new FileReader();
    reader.readAsDataURL(signature);
    reader.onload = () => {
      this.setState({
        signature: {
          dataURL: reader.result,
          file: signature
        }
      }, () => {
        HelperApi.postWithFiles('http://192.168.0.10:3001', {
          attachedFiles: [
            signature
          ]
        })
      });
    };
  }

  handleChangeCroppie = ({photo}) => {
		if (FileReader && photo) {
			var fr = new FileReader();
			fr.readAsDataURL(photo);
			fr.onload = () => {
        return this.setState({
          croppedImage: {
            dataURL: fr.result,
            file: photo
          }
        });
      }
		}
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Components Factory</h2>
        </div>
        <div className="container">
          <ComponentBox title="Cropping">
            <ImageWithCropping 
              id="photo" title="Photo" hideResult={true}
              viewport={{ width: 200, height: 200 }} 
              resultSize={{ width: 300, height: 300 }} 
              boundary={{ width: "100%", height: 300 }}
              onChange={ this.handleChangeCroppie } />
              <img ref="img" className="img-responsive" src={this.state.croppedImage.dataURL || ""} />
          </ComponentBox> 
          <ComponentBox title="Multiple Pictures Input">
            <MultiplePicturesInput quality={0.5} />
          </ComponentBox>
          <ComponentBox title="Signature">
            <Signature onChange={this.handleChangeSignature}/>
            <img ref="img" src={this.state.signature.dataURL && ""} />
          </ComponentBox>      
        </div>
      </div>
    );
  }
}


export default MainContent;