import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const Index = require('./components/index');
const ShowProject = require('./components/showProject');

const App = React.createClass({
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Index}/>
    <Route path="/index" component = {Index}/>
    <Route path='/:project' component={ Index }/>
    <Route path='/selected/:selected' component={ Index }/>
  </Route>
);



document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Router routes={routes} history={hashHistory}>

  </Router>, document.getElementById("content")
);
});
