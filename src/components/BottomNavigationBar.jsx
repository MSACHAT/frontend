import React, { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import HomeAddNormalIcon from '../Icon/HomeAddNormalIcon';
import { useNavigate } from 'react-router-dom';
import './BottomNavigationBar.scss';
import url from '../config/RouteConfig';
import { getBaseUrl } from './Utils';
import { useRecoilState } from 'recoil';
import { IsActive } from '../store';

export default function BottomNavigationBar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useRecoilState(IsActive);

  function clickFeed() {
    setIsActive(true);
    navigate('/feed');
  }

  function clickPersonalArea() {
    setIsActive(false);
    navigate('/profile');
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
          isActive
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
          isActive
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
