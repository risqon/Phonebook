
import React, { Component } from 'react'
import TodoItem from './phoneActive'
import EditForm from './EditForm'
import { loadPhone } from '../actions'
import { connect } from 'react-redux'


class TodoList extends Component {

    componentDidMount() {
        this.props.loadPhoneFromMap();
    }

    render() {
        
        const todos = this.props.stateFromMaps.phones.map((item, index) => {

            return item.isEdit ?
                (<EditForm
                    key={index}
                    id={item.id}
                    index={this.props.stateFromMaps.offset + index +1}
                    sent={item.sent}
                    Name={item.Name}
                    Phone={item.Phone}
                    edit={item.isEdit} />
                )
                :
                (
                    < TodoItem
                        key={index}
                        id={item.id}
                        index={this.props.stateFromMaps.offset + index +1}
                        sent={item.sent}
                        Name={item.Name}
                        Phone={item.Phone}
                        edit={item.isEdit}
                    />)
        })

        return (
           
            <div>
                <table className="table border-radius table-striped table-light centering  table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Pict</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos}
                    </tbody>
                </table>
            </div >
        )
    }
}

const mapStateToProps = ({phones}) => ({
    stateFromMaps: phones
})


const mapDispatchToProps = (dispatch) => ({
    loadPhoneFromMap: () => dispatch(loadPhone())
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)