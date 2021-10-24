import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import TrailDetail from './pages/trail';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:trailsID" component={TrailDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;