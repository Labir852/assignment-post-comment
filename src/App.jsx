import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import { Container } from '@material-ui/core';
import UserDetails from './Component/User/UserDetails';

function App(props) {
  const [posts,setPosts] = useState([]);
  useEffect(()=>{
    const url = `https://jsonplaceholder.typicode.com/posts`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setPosts(data);
      for (let i = 0; i < data.length; i++) {
        posts[i] = data[i];
      }
    })
  },[])



  return (
    <>
      <Container>
      <Header></Header>
      <Router>
        <Switch>
        <Route exact path="/">
          <h1>Posts Uploaded: {posts.length}</h1>
                
                {
                  posts.map(post=> <Home key={post.id} id={post.id} title={post.title} body={post.body}></Home>)
                }
          </Route>
          <Route path="/posts">
                <h1 style={{textAlign: 'center'}}>Posts Uploaded: {posts.length}</h1>
                
                {
                  posts.map(post=> <Home key={post.id} id={post.id} title={post.title} body={post.body}></Home>)
                }
                
          </Route>

          <Route path="/about/:userid">
                <UserDetails></UserDetails>
          </Route>

          <Route  path="/*">
              <h2 style={{textAlign: 'center'}}>404 Error!</h2>
              <p style={{textAlign: 'center'}}>You have entered wrong URL!</p>
          </Route>
          
        </Switch>

      </Router>
      </Container>
    </>
  );
}

export default App;
