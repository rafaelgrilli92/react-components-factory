import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

}

const defaultProps = {

}

class MultiplePicturesInput extends Component {
    constructor(props) {
        super();

        this.state = {
            pictures: [],
            loading: false
        }
    }

    onAddFile = (e) => {
        let { pictures } = this.state;
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadstart = () => {
            this.setState({ loading: true })
        }

        reader.onloadend = () => {
            pictures.push({
                file: file,
                previewUrl: reader.result
            })
            this.setState({
                loading: false,
                pictures
            });
        }

        reader.readAsDataURL(file)
    }

    onRemoveFile = (e) => {
        
    }

    onClickAdd = () => {
        this.refs.input.click();
    }

    render() {
        let s = this.state;
        return (
            <div className="row">
                {
                    s.pictures.map((pic, index) => {
                        return (
                            <div className="col-xs-6 col-sm-3 col-lg-2">
                                <img style={{height: "100px"}} src={pic.previewUrl} alt={`Image ${index+1}`}/>
                                <a onClick={() => this.onRemoveFile(index)}>Remove</a>
                            </div>
                        )
                    })
                }
                <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                    <div className="hidden">
                        <input ref="input" onChange={this.onAddFile} type="file" id="fileInput" name="fileInput" />
                    </div>
                    <i onClick={this.onClickAdd} className="fa fa-3x fa-plus"></i>
                </div>
            </div>
        )
    }
}

MultiplePicturesInput.propTypes = propTypes;
MultiplePicturesInput.defaultProps = defaultProps;

export default MultiplePicturesInput;