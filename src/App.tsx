import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import TrailDetail from './pages/trail';
import PageNotFound from './pages/notFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/trail/:trailsID" component={TrailDetail} />
          <Route path="/PageNotFound" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;