import React, { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import HomeAddNormalIcon from '../Icon/HomeAddNormalIcon';
import { useNavigate } from 'react-router-dom';
import './BottomNavigationBar.scss';
import url from '../config/RouteConfig';
export default function BottomNavigationBar() {
  const navigate = useNavigate();
  //true的时候feed页亮，false个人页亮
  const [State, setState] = useState(true);
  function clickFeed() {
    setState(true);
    window.location.href = 'http://localhost:3000/feed';
  }
  function clickPersonalArea() {
    setState(false);
    window.location.href = 'http://localhost:3000/profile';
  }
  function clickAddPost() {
    navigate(url.addPost);
  }
  return (
    <div className={'footer'}>
      <Button
        size={'large'}
        theme="borderless"
        onClick={clickFeed}
        style={
          State
            ? { color: '#0A0001' }
            : {
                color:
                  'var(--usage-text---semi-color-text-name, rgba(24, 0, 1, 0.40))',
              }
        }
      >
        首页
      </Button>
      <Button
        onClick={clickAddPost}
        theme={'borderless'}
        icon={<HomeAddNormalIcon />}
      />
      <Button
        size={'large'}
        theme="borderless"
        onClick={clickPersonalArea}
        style={
          State
            ? {
                color:
                  'var(--usage-text---semi-color-text-name, rgba(24, 0, 1, 0.40))',
              }
            : { color: '#0A0001' }
        }
      >
        个人
      </Button>
    </div>
  );
}
