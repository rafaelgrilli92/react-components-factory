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
            previewUrl: PropTypes.string.isRequired
        }).isRequired
    )
}

const defaultProps = {
    quality: 0.8
}

class MultiplePicturesInput extends Component {
    constructor(props) {
        super();

        this.state = {
            files: [],
            previewImages: [],
            isLoading: false
        }
    }

    onChange = () => {
        var { id, onChange } = this.props;
        if(onChange) {
            return onChange(this.state.files, id);
        }
    }

    onAddFile = (e) => {
        let file = e.target.files[0];
        this.setState({ isLoading: true })

        helper.resizeImage(file, this.props.quality, (error, file, dataURL) => {
            var { files, previewImages } = this.state;
            files.push(file);
            previewImages.push(dataURL);

            this.setState({
                isLoading: false,
                files,
                previewImages
            })
        });
    }

    onRemoveFile = (index) => {
        var { files, previewImages } = this.state;
        files.splice(index, 1);
        previewImages.splice(index, 1);
        this.setState({ files, previewImages });
    }

    onClickAdd = () => {
        this.refs.input.value = "";
        this.refs.input.click();
    }

    render() {
        let s = this.state;
        return (
            <div className="mpi-main mpi-primary">
                <ul className="list list-inline">
                    {
                        s.previewImages.map((dataURL, index) => {
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