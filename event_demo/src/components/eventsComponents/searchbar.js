import React, { Component } from 'react'

 class searchbar extends Component {
    render() {
        return (
            <div className="Searchbar-section">
            <div className="container">
            <div className="row">
                <div className="col-md-12 ">
                    <form action="" className="search-form">
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control searchbar" name="search" id="search" placeholder="search" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
        )
    }
}
export default searchbar
