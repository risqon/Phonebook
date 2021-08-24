import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { editUpdatePhone, clickCancelEditAct } from '../actions'
import { connect } from 'react-redux'


class TodoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            phone: this.props.phone
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleSubmit(event) {
        this.props.update(
            this.state.name,
            this.state.phone);
        event.preventDefault();
    }

    handleCancel() {
        this.props.cancelEdit()
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.index}
                </td>
                <td>
                    <div>
                        <img className="img" src={this.state.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} style={{ width: 100, height: 100, borderRadius: 50 }} alt="pict" />
                    </div>
                </td>
                <td>
                    <div className=" form-row" onSubmit={this.handleSubmit}>
                        <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleChange} required={true} />
                    </div>
                </td>
                <td>
                    <div className=" form-row" onSubmit={this.handleSubmit}>
                        <input name="phone" type="text" className="form-control" value={this.state.phone} onChange={this.handleChange} required={true} />
                    </div>
                </td>
                <td>
                    <button type="submit" className="btn btn-outline-success mr-2" onClick={this.handleSubmit}><FontAwesomeIcon icon={faCheck} /> Update</button>
                    <button type="button" className="btn btn-outline-danger" onClick={this.handleCancel}><FontAwesomeIcon icon={faTimes} /> Cancel</button>
                </td>
            </tr >
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
    cancelEdit: () => dispatch(clickCancelEditAct(ownProps.id)),
    update: (name, phone) => dispatch(editUpdatePhone(ownProps.id, name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(TodoEdit)