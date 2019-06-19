import React, { Component } from 'react'
import Navbar from './navbar'
import TitleBar from './eventsComponents/titleBar'
import SearchBar from './eventsComponents/searchbar'
import AvailableEvents from './eventsComponents/avaiblableEvents'
import {getEvents} from '../actions/event'
class events extends Component {


componentWillMount = () => {
  getEvents()
  console.log('hello from evetns')
}
    render() {
        return (
            <div>
                <Navbar />
                <TitleBar />
                <SearchBar/>
                <AvailableEvents />
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
export default events
