import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPhone, searchPhones, searchMode, loadPhone,cancelSearch } from '../actions'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            phone: ""
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
        this.props.searchPhones(event.target.value, this.state.phone)
        this.props.searchMode({ name: event.target.value, phone: this.state.phone })
    }

    handlePhoneChange(event) {
        this.setState({ phone: event.target.value });
        this.props.searchPhones(this.state.name, event.target.value)
        this.props.searchMode({ name: this.state.name, phone: event.target.value })
    }

    
    handleClick(event) {
        this.props.loadPhone()
        this.props.cancelSearch()
        this.setState({ name: "", nhone: "" });
        event.preventDefault()

    }
    render() {
        return (

            <div className="card text-left" >
                <div className="card-header text-center font-weight-bold">
                    SEARCH CONTACT
                    </div>
                <div className="card-body">
                    <form className="form-inline justify-content-center">
                        <div className="form-group row">
                            <label htmlFor="Phone" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" name="names" value={this.state.name} onChange={this.handleNameChange} placeholder="Search Name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="Name" className="col-sm-2 col-form-label">Number</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="phone" name="phones" value={this.state.phone} onChange={this.handlePhoneChange} placeholder="Search Phone Number" />
                            </div>
                            
                        </div>
                        <div className="form-group row align-self-center">
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-warning  btn-cancel float-right" onClick={this.handleClick}><i className="fas fa-redo-alt"></i> Reset </button>

                            </div>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postPhone: (phone, name, id, avatar) => dispatch(postPhone(phone, name, id, avatar)),
    searchPhones: (name, phone) => dispatch(searchPhones(name, phone)),
    searchMode: (filter) => dispatch(searchMode(filter)),
    loadPhone: () => dispatch(loadPhone()),
    cancelSearch:()=>dispatch(cancelSearch())

})

export default connect(
    null,
    mapDispatchToProps
)(SearchForm)
