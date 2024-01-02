import { Login } from './pages/login/LoginPage.jsx';
import { Space } from '@douyinfe/semi-ui';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Profile } from './pages/profile/ProfilePage.jsx';
import { Feed } from './pages/feed/FeedPage.jsx';
import { Notifications } from './pages/notifications/NotificationsPage.jsx';
import PushPost from './pages/post/PostPushingPage.jsx';
import DetailPost from './pages/post/PostDetailedPage.jsx';
import ScrollLoad from "./components/Comments";
import Comment from "./components/Comment";
import NavigationBar from "./components/NavigationBar";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/pushpost" element={<PushPost />} />
        <Route path="/detailedpost" element={<DetailPost />} />
          <Route path={"/test"} element={<NavigationBar/>}/>

      </Routes>
    </Router>
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
        <Link to="/detailedpost">帖子</Link>
        <Link to="/pushpost">发布</Link>
          <Link to={'/test'}>test</Link>
      </Space>
    </>
  );
};

export default App;
