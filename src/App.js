import { Login } from './pages/login/LoginPage.jsx';
import { Space } from '@douyinfe/semi-ui';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate} from 'react-router-dom';
import { Profile } from './pages/profile/ProfilePage.jsx';
import { Feed } from './pages/feed/FeedPage.jsx';
import { Notifications } from './pages/notifications/NotificationsPage.jsx';
import PushPost from './pages/post/PostPushingPage.jsx';
import DetailPost from './pages/post/PostDetailedPage.jsx';
import ScrollLoad from "./components/Comments";
import Comment from "./components/Comment";
import NavigationBar from "./components/NavigationBar";
import AddPost from "./pages/post/AddPost";
import PostDetail from "./pages/post/PostDetail";
import NavigationBarthDeleteButton from "./components/NavigationBarwithDeleteButton";
import React, {useEffect} from 'react';

import CommentList from "./components/CommentList";
import HomeAddNormalIcon from "./Icon/HomeAddNormalIcon";
import BottomNavigationBar from "./components/BottomNavigationBar";
import url from "./config/RouteConfig";
import { RecoilRoot } from 'recoil';
import ErrorBoundary from "./pages/Error";
import {ProtectedRoute} from "./Route/ProtectedRoute";
import {PostWithAvatar} from "./pages/post/PostWithUserInfo";
import routeConfig from "./config/RouteConfig";



const App = () => {


  return (
    <RecoilRoot>
        <ErrorBoundary>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/post/:postId" element={<PostDetail/>} />
                <Route path="/test" element={<CommentList postId={2}/>} />
                  <Route path="/test2" element={<PostWithAvatar/> } />

              </Routes>
            </Router>
        </ErrorBoundary>
    </RecoilRoot>
  );
};

const Home = () => {
  return (
      <Navigate to={routeConfig.feed} state={{ from: location }} replace />
  );
};

export default App;
