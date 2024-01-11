import { Login } from './pages/login/LoginPage.jsx';
import { Space } from '@douyinfe/semi-ui';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate} from 'react-router-dom';
import { Profile } from './pages/profile/ProfilePage.jsx';
import { Feed } from './pages/feed/FeedPage.jsx';
import { Notifications } from './pages/notifications/NotificationsPage.jsx';

import AddPost from "./pages/post/AddPost";
import PostDetail from "./pages/post/PostDetail";

import React, {useEffect} from 'react';

import CommentList from "./components/CommentList";
import { RecoilRoot } from 'recoil';
import ErrorBoundary from "./pages/Error";

import routeConfig from "./config/RouteConfig";
import createRoutes from "./Route/creatRoutes";



const App = () => {
    const routesConfig = [
        { path: "/", component: <Home />, isPublic: false },
        { path: "/login", component: <Login />, isPublic: true },
        { path: "/profile", component: <Profile />, isPublic: false },
        { path: '/feed', component: <Feed/>,isPublic: false},
        { path: '/notifications', component: <Notifications/>,isPublic: false},
        { path: '/add', component: <AddPost/>,isPublic: false},
        { path: '/post/:postId', component: <PostDetail/>,isPublic: false},
        { path: '/test', component: <CommentList postId={2}/>,isPublic: true},

    ];


  return (
    <RecoilRoot>
        <ErrorBoundary>
            <Router>
              <Routes>
                  {createRoutes(routesConfig)}
              </Routes>
            </Router>
        </ErrorBoundary>
    </RecoilRoot>
  );
};

const Home = () => {
  return (
      <Navigate to={routeConfig.feed}  />
  );
};

export default App;
