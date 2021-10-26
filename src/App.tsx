import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import TrailDetail from './pages/trail';
import PageNotFound from './pages/notFound';
import './App.css';

function App() {
  return (<>
    <header>
      <div className="header_footer_container">
        <h1>Trail Scout</h1>
      </div>
    </header>
    <div className="App">
      <div className="Main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/trail/:trailsID" component={TrailDetail} />
            <Route path="/PageNotFound" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
    <footer>
      <div className="header_footer_container">
        <p>Footer</p>
      </div>
    </footer>
  </>)
}

export default App;