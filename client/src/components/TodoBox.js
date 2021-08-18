import React, { Component } from 'react'
import AddForm from '../containers/AddForm'
import TodoList from '../containers/TodoList';
import SearchForm from '../containers/SearchForm'
import Pagination from '../containers/Paginations'
import Jumbroton from './Jumbroton'



class TodoBox extends Component {
  render() {
    return (
      <div>
        <Jumbroton />
        <div className="container card">
          <div className="main-container">
            <div className="card-body">
              <AddForm />
            </div>
            <div className="card-body">
              <SearchForm />
            </div>
            <div className="card-body">
              <TodoList />
            </div>
            <Pagination />
          </div>
        </div>
      </div>

    )
  }
}

export default TodoBox;