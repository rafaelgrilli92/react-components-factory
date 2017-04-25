import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Item from './item';

const propTypes = {
    onChange: PropTypes.func,
    pictures: PropTypes.arrayOf(
        PropTypes.objectOf({
            file: PropTypes.object.isRequired,
            previewUrl: PropTypes.string.isRequired
        }).isRequired
    )
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

    onRemoveFile = (index) => {
        let { pictures } = this.state;
        pictures.splice(index, 1);
        this.setState({ pictures});
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
                        s.pictures.map((picture, index) => {
                            let { previewUrl } = picture;
                            let props = { index, onRemoveFile: this.onRemoveFile, previewUrl };
                            return (
                                <Item key={index} {...props} />
                            )
                        })
                    }
                    <li>
                        <div className="hidden">
                            <input ref="input" onChange={this.onAddFile} type="file" id="fileInput" name="fileInput" />
                        </div>
                        <a className="mpi-add-btn" onClick={this.onClickAdd}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

MultiplePicturesInput.propTypes = propTypes;
MultiplePicturesInput.defaultProps = defaultProps;

export default MultiplePicturesInput;