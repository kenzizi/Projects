import React, { Component } from 'react'
import Card from './eventCards'
import CardExample from './testCard'
import {connect} from 'react-redux'
 class eventCategories extends Component {
  
    render() {
        const {categories} = this.props
        return (
            <section className="categories-section">
                <div className="content-wrap">
                
                <div className="container">
                <div className="categories-intro">
                <div>
                    <h3 className="categories-back-title">Events</h3>
                    <h3 className="categories-front-title">Event Categories</h3>
                </div>
                 <p className="categories-parag col-md-12 col-lg-12 col-sm-12">
                    t is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
                    of letters, as opposed to using 'Content here, content here', making it look like .
                   
                 </p>
                    <div className="row">
                 <CardExample />
                    </div>
                </div>
                
                </div>
              
                </div>
               

            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        categories : state.categories
    }
}
const eventCategoriesContainer = connect (mapStateToProps,null)(eventCategories)
export default eventCategoriesContainer
