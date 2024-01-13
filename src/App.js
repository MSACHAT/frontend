import { Login } from './pages/login/LoginPage.jsx';
import { Space } from '@douyinfe/semi-ui';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate} from 'react-router-dom';
import { Profile } from './pages/profile/ProfilePage.jsx';
import { Feed } from './pages/feed/FeedPage.jsx';
import { Notifications } from './pages/notifications/NotificationsPage.jsx';

import AddPost from "./pages/post/AddPost";
import PostDetail from "./pages/post/PostDetail";

import React, {useEffect} from 'react';

import CommentList from "./pages/post/components/CommentList";
import { RecoilRoot } from 'recoil';
import ErrorBoundary from "./pages/Error";

import routeConfig from "./config/RouteConfig";
import createRoutes from "./Route/creatRoutes";
import PostDetailWithDeleteButtom from "./pages/post/PostDetailWithDeleteButtom";
import BottomNavigationBar from "./components/BottomNavigationBar";
import NavigationBar from "./pages/post/components/NavigationBar";



const App = () => {
    const routesConfig = [
        { path: "/", component: <Home />, isPublic: false },
        { path: "/login", component: <Login />, isPublic: true },
        { path: "/profile", component: <Profile />, isPublic: false },
        { path: '/feed', component: <Feed/>,isPublic: false},
        { path: '/notifications', component: <Notifications/>,isPublic: false},
        { path: '/add', component: <AddPost/>,isPublic: true},
        { path: '/post/:postId', component: <PostDetail/>,isPublic: true},
        { path: '/test', component:<BottomNavigationBar/>,isPublic: true},
        { path: '/test2', component:<NavigationBar showDeleteButton={true}/> ,isPublic: true},
        { path: '/profile/post/:postId', component: <PostDetailWithDeleteButtom/>,isPublic: false}

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
