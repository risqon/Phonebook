import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons'
import { postPhone, TogleButtonCta } from '../actions'
import { connect } from 'react-redux'
import { storage } from '../config/fairebase'
import './addForm.css'

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            url: '',
            progress: 0,
            avatar: null,
            isUpload: false,
            profileImg : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

 
    handleChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                this.setState({
                    profileImg: reader.result,
                    isUpload: true
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
        if (e.target.files[0]) {
            const avatar = e.target.files[0];
            //console.log('avatar', avatar)
            this.setState(() => ({ avatar }))
        }
    }

    handleUpload = () => {
        const { avatar } = this.state;
        const uploadTask = storage.ref(`avatars/${avatar.name}`).put(avatar);
        console.log('wkwkw', uploadTask)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                console.log(error);
            },
            // () => {
            //     storage.ref('avatars').child(avatar.name).getDownloadURL().then(url => {
            //         console.log('download', url);
            //         this.setState({ url })
            //     })
            // }
        )
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.name && this.state.phone && this.state.avatar) {
            this.props.addPhone(this.state.name, this.state.phone, this.state.avatar)
            this.setState({ name: "", phone: "", avatar: null })
        }
        event.preventDefault();
    }

    handleClick(event) {
        event.preventDefault()
        this.props.togleButtonCta()
    }


    render() {
        const {isUpload, progress, profileImg, url } = this.state
        return (
            <div>
                <button
                    id="btn-collapse"
                    className="btn btn-outline-secondary mb-3"
                    type="button"
                    data-toggle="collapse"
                    data-target="#add-collapse"
                    aria-expanded="false"
                    aria-controls="add-collapse"
                > New Contact</button>
                <div className="collapse" id="add-collapse">
                    <div className="card">
                        <div className="card-header text-center font-weight-bold mb-2">
                            ADD NEW CONTACT
                        </div>
                        <div className="card-body">
                            <div className="container">
                                <div className="img-holder">
                                    <img src={ url || profileImg} alt="" id="img" className="img" />
                                    <br />
                                    <progress value={progress} max="100" />
                                </div>
                                <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.handleChange} />
                                <div className="label">
                                    {isUpload && <button onClick={this.handleUpload}>Upload</button>}
                                    {!isUpload && <label className="image-upload" htmlFor="input">
                                        Choose your Photo
                                    </label>}

                                </div>
                            </div>

                            {/* pembatas */}
                            <form onSubmit={this.handleSubmit}className="form-inline justify-content-center">
                                <div className="form-group row">
                                    <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChangeName} placeholder="Name" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="phone" className="col-sm-2 col-form-label">Number</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleChangePhone} placeholder="Phone Number" />
                                    </div>
                                </div>

                                <div className="form-group row align-self-center">
                                    <div className="col-sm-12">
                                        <button type="button" className="btn btn-warning  btn-cancel float-right addc ml-2" onClick={this.handleClick}><FontAwesomeIcon icon={faBan} /> Cancel </button>
                                        <button type="submit" className="btn btn-primary  btn-add float-right addc"><FontAwesomeIcon icon={faSave} /> Save</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



const mapDispatchToProps = dispatch => ({
    addPhone: (name, phone, avatar) => dispatch(postPhone(name, phone, avatar)),
    togleButtonCta: () => dispatch(TogleButtonCta())
})

export default connect(
    null,
    mapDispatchToProps
)(AddForm)