import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../actions/auth'
import { Link} from 'react-router-dom'
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import 'antd/dist/antd.css';


import '../navbar.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
   
  

    
 class Navbarr extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
      const {isAuthenticated,loading} = this.props.auth;
      const {logout} = this.props

      let AuthLinks = (
        <Nav className="ml-auto" navbar>
        <NavItem  className="links" >
          <Link  className="Link-style" to='/'>Home</Link>
          </NavItem>
          <NavItem  className="links" >
          <Link  className="Link-style" to='/events'>Explore Events</Link>
          </NavItem>
          <NavItem className="links" >
          <Link  to='/eventcreate' className="Link-style"  > <i className="fas fa-plus-square"></i> Create event </Link>
          </NavItem>
          <NavItem className="links"  >
          <Link onClick={logout} to='/profile' className="Link-style drop-main-link"  >  Profile </Link>
          <ul className="drop-down-nav">
          <li className="dropdown-items">test</li>
          <li className="dropdown-items">test</li>
          <li className="dropdown-items">test</li>
            
          </ul>

          </NavItem>
          <NavItem className="links"  >
          <Link onClick={logout} to='/signup' className="Link-style"  > <i className ="fas fa-sign-out-alt"></i> Logout </Link>
          </NavItem>
       
        </Nav>
      )

      let GuestLinks =(
        <Nav className="ml-auto" navbar>
        <NavItem  className="links" >
          <Link  className="Link-style" to='/'>Home</Link>
          </NavItem>
          <NavItem  className="links" >
          <Link  className="Link-style" to='/events'>Explore Events</Link>
          </NavItem>
          <NavItem className="links" >
          <Link to='/login' className="Link-style" >LogIn</Link>
          </NavItem>
          <NavItem className="links" >
          <Link to='/signup' className="Link-style"  >Sign up</Link>
          </NavItem>
          
        </Nav>
      )


        return (
      
            <div className="nav-fixed">
            <Navbar className="navbar-container" light expand="md">
              <NavbarBrand href="/"><p className="top-logo">Event</p> </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                {!loading && (<Fragment>
                  {isAuthenticated ? AuthLinks:GuestLinks}
                  </Fragment>)}
              </Collapse>
            </Navbar>
          </div>
        
        )  
    }
}
  
Navbar.PropTypes = {
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth : state.auth
})
export default connect (mapStateToProps,{logout})(Navbarr)
