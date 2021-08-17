import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchPhones, loadPhone, postPhone, searchMode, cancelSearch } from '../actions';


class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
    }

    handleChangeName = (event) => {
        this.setState({ Name: event.target.value });
        this.props.searchContacts (this.state.name, event.target.value)
        this.props.searchMode({ name: this.state.Name, phone: event.target.value })
    }
    handleChangePhone = (event) => {
        this.setState({ Phone: event.target.value });
        this.props.searchPhones(event.target.value, this.state.Phone)
        this.props.searchMode({ name: event.target.value, phone: this.state.Phone })
    }

    handleReset = (event) => {
        this.props.loadPhone()
        this.props.cancelSearch()
        this.setState({Name: "", Phone: ""})
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
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="NameS" value={this.state.Name} onChange={this.handleChangeName} placeholder="Search Name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Number</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="PhoneS" value={this.state.Phone} onChange={this.handleChangePhone} placeholder="Search Phone Number" />
                            </div>
                        </div>
                        <div className="form-group row align-self-center">
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-outline-warning  btn-cancel float-right reset" onClick={this.handleReset}><i className="fa fa-refresh"></i> Reset </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    loadPhone: () => dispatch(loadPhone()),
    postPhone: (Phone, Name, id) => dispatch(postPhone(Phone, Name, id)),
    searchMode: (filter) => dispatch(searchMode(filter)),
    searchPhones: (Name, Phone,) => dispatch(searchPhones(Name, Phone)),
    cancelSearch: () => dispatch(cancelSearch())

})

export default connect(
    null,
    mapDispatchToProps
)(SearchForm)