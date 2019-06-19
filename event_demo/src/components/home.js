import React, { Component } from 'react'
import Navbar from './navbar'
import Introduction from './homeComponents/introduction'
import Categories from './homeComponents/eventCategories'
import Timetable from './homeComponents/timetable'
import Sponsors from './homeComponents/sponsors'
import Footer from './homeComponents/footer'

export default class home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Introduction />
                <Categories />
                <Timetable />
                <Sponsors />
                <Footer />
            </div>
        )
    }
}
