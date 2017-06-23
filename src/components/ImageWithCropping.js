/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs'
import uuid from 'uuid';
import { Button, Modal } from 'react-bootstrap';

import 'cropperjs/dist/cropper.css';


const propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  resultSize: PropTypes.object,
  onChange: PropTypes.func,
  aspectRatio: PropTypes.number
}

const defaultProps = {
  quality: 0.6
}

class ImageWithCropping extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: null,
      isLoading: false,
      isSaving: false,
      error: false,
      result: null,
      showModal: false
    }

    this.handleChange = e => {
      var file = e.target.files;
      if (file && file.length > 0) {
        this.setState({ 
          showModal: true, 
          isLoading: true,
          error: false, 
          result: null
        }, () => {
          setTimeout(() => {
            return this.loadFile(file[0]);
          }, 500)
        });
      }
    }

    this.handleRotate = () => {
      this.cropper.rotate(90);
    }
  }

  applyCropper = (data) => {
    this.cropper = new Cropper(this.refs.cropperImg, {
      aspectRatio: 4 / 3,
      autoCropArea: 0.85,
      minContainerHeight: 250,
      dragMode: 'move',
      preview: this.refs.preview,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      movable: true,
      guides: false
    });
  }

  onSave = () => {    
    this.setState({
      isSaving: true
    }, setTimeout(() => {
      var { id, quality, resultSize } = this.props;
      this.cropper.getCroppedCanvas(resultSize)
      .toBlob(file => {
        var returnObj = id ? { [id]: file } : file;
        this.setState({ 
          showModal: false, 
          isSaving: false, 
          result: null
        }, this.props.onChange(returnObj))
      }, 'image/jpeg', quality)
    }, 400));
  }

  loadFile = (file) => {
    if (FileReader && file) {
      var fr = new FileReader();
      fr.readAsDataURL(file);

      fr.onload = () => {
        this.setState({ isLoading: false, result: fr.result })
        this.applyCropper();
      }

      fr.onerror = err => {
        self.setState({ 
          error: true,
          isLoading: false,
          result: null
        })
        console.error(err);
      }
    } else {
      this.setState({ 
        result: null,
        error: false,
        isLoading: false
      })
    }
  }

  render() {  
    var s = this.state;
  	var { id, title } = this.props; 

    return (
      <div ref="cropForm">
         <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <label>{title}</label>
              <input type="file" id={id} className={"form-control " + (s.imgUrl && !s.result ? 'ignoreValidation' : '')} accept="image/*" onChange={ this.handleChange } />
              {
                (s.imgUrl) && (
                  <p>
                    <br />
                    <img className="img-responsive img-thumbnail" style={{maxHeight: "200px"}} src={ s.imgUrl } />
                  </p>
                )
              }
            </div>
          </div>
        </div>
        <Modal show={s.showModal}>
          <Modal.Body>
            {
              s.isLoading || s.isSaving ? (
                <div className="text-center">
                  <div className="loader"></div>
                  <h5><b>{s.isSaving ? "Cropping" : "Loading"} image...</b></h5>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <button type="button" className="btn btn-sm btn-block btn-info" onClick={ this.handleRotate }>
                      Rotate <i className="fa fa-rotate-right"></i>
                    </button>
                  </div>
                  <div className="form-group">
                    <img ref="cropperImg" style={{maxWidth: "100%"}} src={s.result || ""} />
                  </div>
                </div>
              )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" disabled={s.isSaving} onClick={ this.onSave }>Crop & Save</Button>
            <Button bsStyle="danger" disabled={s.isSaving} onClick={ this.handleClear }>Cancel</Button>
          </Modal.Footer>       
        </Modal>
      </div>
    )
  }
};

ImageWithCropping.propTypes = propTypes;
ImageWithCropping.defaultProps = defaultProps;

export default ImageWithCropping;
/* eslint-enable */