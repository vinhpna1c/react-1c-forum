import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PostPage from './pages/post';
import HomePage from './pages//home/page';
import AmityService from './services/amity/amity.service';

function App() {
  console.log("Render App function");
  useEffect(()=>{
    AmityService.getAmityService();
  },[])
  return (
    <div className="App">
      <Router>
        <Link to={'/'} >
          <span className='bg-green-500 p-2 m-2'>
            Home
          </span>
        </Link>
        <Link to={'/post'} >
          <span className='bg-yellow-500 p-2 m-2'>
            Post
          </span>
        </Link>
        <Switch>
 
          <Route path="/post">
            <PostPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          </Switch>
      </Router>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
