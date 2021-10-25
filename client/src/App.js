import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import landingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import Detail from './components/Detail';


export default function App() {
  
  return (
    <BrowserRouter>

      <div className="App">
        <Switch>
          <Route exact path='/' component= {landingPage}/>
          <Route exact path = '/home' component= {Home}/>
          <Route path='/newDog' component={DogCreate} />
          <Route path='/dogs/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};