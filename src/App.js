import {Login} from './pages/login.tsx';
import {Space} from "@douyinfe/semi-ui";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Profile} from "./pages/profileTest.tsx";
import {Feed} from "./pages/feed/feed.tsx";
import {Notifications} from "./pages/notifications/notifications.tsx";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/feed" element={<Feed/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
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
      </Space>
          </>
  );
}

export default App;
