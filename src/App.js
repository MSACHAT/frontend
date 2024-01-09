import { Login } from './pages/login/LoginPage.jsx';
import { Space } from '@douyinfe/semi-ui';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
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
import NavigationBarthDeleteButton from "./components/NavigationBarwithDeleteButtom";
import React, {useEffect} from 'react';

import CommentList from "./components/CommentList";
import HomeAddNormalIcon from "./Icon/HomeAddNormalIcon";
import BottomNavigationBar from "./components/BottomNavigationBar";
import url from "./config/RouteConfig";
import { RecoilRoot } from 'recoil';
import ErrorBoundary from "./pages/Error";
import {ProtectedRoute} from "./Route/ProtectedRoute";
import {PostWithAvatar} from "./pages/post/PostWithUserInfo";



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
                <Route path="/add" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
                <Route path="/post/:postId" element={<ProtectedRoute><PostDetail/></ProtectedRoute>} />
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
    <>
      <br />686876
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Space>
        <Link to="/login">登录</Link>
        <Link to="/profile">个人</Link>
        <Link to="/feed">首页</Link>
        <Link to="/notifications">通知</Link>
        <Link to="/post/2">帖子</Link>
        <Link to="/pushpost">发布</Link>
          <Link to={'/test'}>test</Link>
          <Link to={'/test2'}>test2</Link>
      </Space>
    </>
  );
};

export default App;
