import {Login} from './pages/login.tsx';
import {Space} from "@douyinfe/semi-ui";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

const Home = () => {
  return (
      <Space>
        <Link to="/login">登录</Link>
      </Space>
  );
}

export default App;
