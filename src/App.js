import {Login} from './pages/login.tsx';
import {Space} from "@douyinfe/semi-ui";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {Profile} from "./pages/profileTest.tsx";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
  );
}

const Home = () => {
  return (
      <Space>
        <Link to="/login">登录</Link>
        <Link to="/profile">个人</Link>
      </Space>
  );
}

export default App;
