import React, { Component } from 'react'
import AddForm from '../containers/AddForm'
import TodoList from '../containers/TodoList';
import SearchForm from '../containers/SearchForm'
import Pagination from '../containers/Paginations'
import { connect } from 'react-redux'



class TodoBox extends Component {
  render() {
    return (
      <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="containers">
              <h1 className="display-1 text-center">Phone Book</h1>
            </div>
          </div>
        <div className="container card">

          <div className="main-container">
            <div className="card-body">
              <div className="table-wrapper">
                <div className="card-body">
                  <AddForm />
                  <br />
                  <SearchForm />
                </div>
                <div className="card-body">
                  <TodoList />
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = ({ phones }) => {
  const { isActive } = phones
  return { stateFromMaps: isActive }
}

export default connect(
  mapStateToProps,
  null
)
  (TodoBox);