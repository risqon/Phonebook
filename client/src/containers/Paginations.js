import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPhone, nextPage, previousPage, searchPhones, switchPage } from '../actions';

class Pagination extends Component {


   handleClick = (event) => {
      const { currenPage, limit, searchName, searchPhone, isSearchModeOn } = this.state
      if (event.target.name === "previousPage"){
         const offset = (currenPage -2) * limit

         if(isSearchModeOn){
            this.props.searchPhone(searchName, searchPhone, offset)
         } else {
            this.props.loadPhone(offset)
         }
         this.props.clickPrevPage(offset)
      } else if (event.target.name === "nextPage"){
         const offset = currenPage * limit 

         if(isSearchModeOn) {
            this.props.searchPhone(searchName, searchPhone, offset)
         } else {
            this.props.loadPhone(offset)
         }
         this.props.clickNextPage(offset)
      } else {
         const offset = (event.target.id - 1) * limit
         const swithcToPage = Number(event.target.id)

         if(isSearchModeOn) {
            this.props.searchContacts(searchName, searchPhone, offset)
         } else {
            this.props.loadPhone(offset)
         }
         this.props.switchPage(offset, swithcToPage)
      }
      event.preventDefault()
   }



   render() {
      const { currenPage, pages } = this.props.stateFromMaps
      const iterator = []

      for(let i = 0; i < pages; i++){
         iterator.push(i)
      }

      return (
         <nav aria-label="Page navigation example" >
            <ul className="pagination justify-content-center">

               <li className={currenPage === 1 ? "page-item disabled" : "page-item"}>
                  <button href="#" className="page-link" name="previousPage" value={currenPage - 1} onClick={this.handleClick}>Previous</button>
               </li>

               {
                  iterator.map((e, index) => {
                     return (
                     <li className={currenPage === index + 1 ? "page-item active" : "page-item"} key={index + 1} >
                        <button className="page-link" href="#" name="pagi" id={index + 1} onClick={this.handleClick} >{index + 1}</button>
                     </li>)
                  })
               }

               <li className={currenPage === pages ? "page-item disabled" : "page-item"}>
                  <button className="page-link" href="#" name="nextPage"  onClick={this.handleClick}>Next</button>
               </li>

            </ul>
         </nav >
      )
   }
}

const mapStateToProps = ({ phones }) => ({
   stateFromMaps: phones
})

const mapDispatchToProps = dispatch => ({
   loadPhone: (offset) => dispatch(loadPhone(offset)),
   searchContacts: (name, phone, offset) => (dispatch(searchPhones(name, phone, offset))),
   previousPage: () => dispatch(previousPage()),
   clickNextPage: (offset) => dispatch(nextPage(offset)),
   clickPrevPage: (offset, swithcToPage) => dispatch(switchPage(offset, swithcToPage))
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Pagination)