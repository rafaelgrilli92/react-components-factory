import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import helper from './helper';
import Item from './item';

const propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    pictures: PropTypes.arrayOf(
        PropTypes.objectOf({
            file: PropTypes.object.isRequired,
            dataURL: PropTypes.string.isRequired
        }).isRequired
    ),
    quality: PropTypes.number
}

const defaultProps = {
    quality: 0.8
}

class MultiplePicturesInput extends Component {
    constructor(props) {
        super();

        this.state = {
            pictures: [],
            isLoading: false
        }
    }

    onChange = () => {
        var { id, onChange } = this.props;
        if(onChange) {
            return onChange(this.state.pictures, id);
        }
    }

    onAddFile = (e) => {
        let file = e.target.files[0];
        this.setState({ isLoading: true }, () => {
            setTimeout(() => {
                helper.changeImageQuality(file, this.props.quality, (resizedFile, imgDataURL) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(resizedFile);
                    reader.onload = () => {
                        let dataURL = reader.result;
                        let pictures = this.state.pictures;
                        pictures.push({
                            dataURL
                        });

                        pictures[pictures.length - 1].file = resizedFile;
                        this.setState({
                            isLoading: false,
                            pictures
                        }, this.onChange)
                    }
                });
            }, 700)
        })
    }

    onRemoveFile = (index) => {
        let pictures = this.state.pictures;
        pictures.splice(index, 1);
        return this.setState({ 
            pictures 
        }, this.onChange);
    }

    onClickAdd = () => {
        this.refs.input.value = "";
        this.refs.input.click();
    }

    render() {
        let s = this.state;
        return (
            <div className="mpi-main mpi-danger">
                <ul className="list list-inline">
                    {
                        s.pictures.map((picture, index) => {
                            let { dataURL } = picture;
                            let props = { index, onRemoveFile: this.onRemoveFile, dataURL };
                            return (
                                <Item key={index} {...props} />
                            )
                        })
                    }
                    <li>
                        {
                            s.isLoading ? (
                                <i className="fa fa-3x fa-refresh fa-spin"></i>
                            ) : (
                                <div>
                                    <div className="hidden">
                                        <input ref="input" onChange={this.onAddFile} type="file"
                                        id="fileInput" name="fileInput" capture="true" accept="image/*" />
                                    </div>
                                    <a className="mpi-add-btn" onClick={this.onClickAdd}>
                                        <i className="fa fa-plus"></i>
                                    </a>
                                </div>
                            )
                        }
                    </li>
                </ul>
            </div>
        )
    }
}

MultiplePicturesInput.propTypes = propTypes;
MultiplePicturesInput.defaultProps = defaultProps;

export default MultiplePicturesInput;