import {Login} from './pages/login.jsx';
import {Space} from "@douyinfe/semi-ui";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Profile} from "./pages/profileTest.jsx";
import {Feed} from "./pages/feed/feed.jsx";
import {Notifications} from "./pages/notifications/notifications.jsx";
import PushPost from "./pages/Post/PushPost.jsx";
import detailPost from "./pages/Post/detailPost.jsx";
import DetailPost from "./pages/Post/detailPost.jsx";

const App = () => {
  return (
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/feed" element={<Feed/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/pushpost" element={<PushPost/>}/>
            <Route path="/detailedpost" element={<DetailPost/>}/>
        </Routes>
      </Router>
  );
}

const Home = () => {
  return (
      <>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Space>
        <Link to="/login">登录</Link>
        <Link to="/profile">个人</Link>
          <Link to="/feed">首页</Link>
          <Link to="/notifications">通知</Link>
          <Link to="/detailedpost">帖子</Link>
          <Link to="/pushpost">发布</Link>
      </Space>
          </>
  );
}

export default App;
