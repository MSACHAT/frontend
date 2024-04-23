import { Login } from './pages/login/LoginPage.tsx';
import { Space } from '@douyinfe/semi-ui';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { Profile } from './pages/profile/ProfilePage.tsx';
import { PProfile } from './pages/profile/PProfilePage.jsx';
import { Feed } from './pages/feed/FeedPage.tsx';
import { Notifications } from './pages/notifications/NotificationsPage.tsx';

import AddPost from './pages/post/AddPost';
import PostDetail from './pages/post/PostDetail';

import React, { useEffect } from 'react';

import CommentList from './pages/post/components/CommentList';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './pages/Error';
import routeConfig from './config/RouteConfig';
import createRoutes from './Route/creatRoutes';
import PostDetailWithDeleteButtom from './pages/post/PostDetailWithDeleteButtom';
import BottomNavigationBar from './components/BottomNavigationBar';
import NavigationBar from './pages/post/components/NavigationBar';

import { SignUpPage } from './pages/login/SignUpPage';

const App = () => {
  const routesConfig = [
    { path: '/', component: <Home />, isPublic: false },
    { path: '/login', component: <Login />, isPublic: true },
    { path: '/signup', component: <SignUpPage />, isPublic: true },
    { path: '/profile', component: <Profile />, isPublic: false },
    { path: '/profile/:userId', component: <PProfile />, isPublic: false },
    { path: '/feed', component: <Feed />, isPublic: false },
    { path: '/notifications', component: <Notifications />, isPublic: false },
    { path: '/add', component: <AddPost />, isPublic: false },
    { path: '/post/:postId', component: <PostDetail />, isPublic: false },
    { path: '/test', component: <BottomNavigationBar />, isPublic: false },
    {
      path: '/test2',
      component: <NavigationBar showDeleteButton={true} />,
      isPublic: true,
    },
    {
      path: '/profile/post/:postId',
      component: <PostDetailWithDeleteButtom />,
      isPublic: false,
    },
  ];

  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Router>
          <Routes>{createRoutes(routesConfig)}</Routes>
        </Router>
      </ErrorBoundary>
    </RecoilRoot>
  );
};

const Home = () => {
  return <Navigate to={routeConfig.feed} />;
};

export default App;
