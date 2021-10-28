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
      <div className="header_footer_container footer">
        <a
          href="https://github.com/markkhoo/Trail-Scout-v2"
          target="_blank"
          rel="noreferrer noopener"
        >GitHub</a>
        <p>Made with <a href="https://reactjs.org/" target="_blank" rel="noreferrer noopener">React</a></p>
      </div>
    </footer>
  </>)
}

export default App;