import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {userLoginHelper, userLogout} from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import AllPosts from './pages/AllPosts'
import UploadPost from './pages/UploadPost'
import UsersPost from './pages/UsersPost'
import PostDetails from './pages/PostDetails'
import ForgotPassword from './pages/ForgotPassword'
import UserDetails from './pages/UserDetails'
import UpdatePassword from './pages/UpdatePassword'
import AllUsers from './pages/AllUsers'
import User from './pages/User'


if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded.user))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/allPosts' component={AllPosts} />
          <Route exact path='/uploadPost' component={UploadPost} />
          <Route exact path='/usersPost/:userId' component={UsersPost} />
          <Route exact path="/postDetails/:postId" component={PostDetails} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/profile" component={UserDetails} />
          <Route exact path="/user/updatePassword" component={UpdatePassword} />
          <Route exact path="/allUsers" component={AllUsers} />
          <Route exact path="/user/:userId" component={User} />


        </Switch>
      </Router>
    </div>
  );
}

export default App;
