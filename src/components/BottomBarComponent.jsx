
import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import sendlogo from '../resource/ic_home_add_normalsendlogo.png';

const bottomBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff', // 将背景色修改为白色
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '60px',
};


const BottomBar = () => {
  const handleClick = (button) => {
    alert(`点击了${button}按钮`);
    // 在这里添加处理点击事件的逻辑
  };

  return (
    <div style={bottomBarStyle}>
      <Button onClick={() => handleClick('首页')} theme='borderless' type='tertiary' style={{ marginRight: 8 }}>首页</Button>
      <Button onClick={() => handleClick('发帖')} icon='sendlogo' style={{ marginRight: 0 }}>+</Button>
      <Button onClick={() => handleClick('个人')}  theme='borderless' style={{ marginRight: 8 }}>个人</Button>
    </div>
  );
};

export default BottomBar;
