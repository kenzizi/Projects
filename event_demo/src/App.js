import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/home'
import {Provider} from 'react-redux'
import store from './store'
import Events from './components/events'
import Signup from './components/signupPage'
import EventCreator  from './components/eventCreator'
import {loadUser} from './actions/auth'
import setAuthToken from './Utils/setAuthToken'
import LoginForm from "./components/login";
import Eventdetails from './components/Eventdetails'


if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  
  useEffect(() => {
    store.dispatch(loadUser())
  }, [] ) 

  return (
   <Provider store={store} >
   <BrowserRouter>
   <div className="App">
     <Route exact path='/' render={()=><Home />} />
     <Route exact path='/events' render= { () => <Events />} />
     <Route exact path='/signup' render= { () => <Signup />} />
     <Route exact path='/eventcreate' render = { ()=><EventCreator /> } />
     <Route exact path='/login' render = { ()=><LoginForm /> } />
     <Route exact path={`/eventdetails/:id`} render={(props)=> <Eventdetails id ={props.match.params.id} />} />

   </div>
 </BrowserRouter>
   
   </Provider>
  );
}

export default App;
