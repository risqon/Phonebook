import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan,faSave } from '@fortawesome/free-solid-svg-icons'
import { postPhone, TogleButtonCta } from '../actions'
import { connect } from 'react-redux'

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Name: '',
            Phone: '' 
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeName(event) {
        this.setState({ Name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ Phone: event.target.value });
    }

    handleSubmit(event) {
       if(this.state.Name && this.state.Phone){
           this.props.addPhone(this.state.Name, this.state.Phone)
           this.setState({Name: "", Phone: ""})
       }
       event.preventDefault();
    }

    handleClick(event) {
        event.preventDefault()
        this.props.togleButtonCta()
    }

    render() {
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
                        >
                        New Contact</button>
                <div className="collapse" id="add-collapse">
                    <div className="card">
                        <div className="card-header text-center font-weight-bold mb-2">
                            ADD NEW CONTACT
                      </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} className="form-inline justify-content-center">
                            <div className="form-group row">
                                    <label htmlFor="Foto" className="col-sm-2 col-form-label">Pict</label>
                                    <div className="col-sm-10">
                                        <input type="file" className="form-control" id="foto" name="foto" value={this.state.foto} onChange={this.handleChangefoto} placeholder="Klik" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.handleChangeName} placeholder="Name" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="phone" className="col-sm-2 col-form-label">Number</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="Phone" name="Phone" value={this.state.Phone} onChange={this.handleChangePhone} placeholder="Phone Number" />
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
    addPhone: (Name, Phone) => dispatch(postPhone(Name, Phone)),
    togleButtonCta: () => dispatch(TogleButtonCta())
})

export default connect(
    null,
    mapDispatchToProps
)(AddForm)