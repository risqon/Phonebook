import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { editUpdatePhone, clickCancelEditAct } from '../actions'
import { connect } from 'react-redux'


class TodoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Name, 
            Phone: this.props.Phone 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }


    handleSubmit(event) {
        this.props.update(
        this.state.Name, 
        this.state.Phone);
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
                    <div className=" form-row" onSubmit={this.handleSubmit}>
                        <input name="Name" type="text" className="form-control" value={this.state.Name} onChange={this.handleChange} required={true} />
                    </div>
                </td>
                <td>
                    <div className=" form-row" onSubmit={this.handleSubmit}>
                        <input name="Phone" type="text" className="form-control" value={this.state.Phone} onChange={this.handleChange} required={true}/>
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
    update: (Name, Phone) => dispatch(editUpdatePhone(ownProps.id, Name, Phone))
  })
  
  export default connect(
    null,
    mapDispatchToProps
  )(TodoEdit)