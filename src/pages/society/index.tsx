import React, { useState } from 'react';
import './style.scss';
import { Input } from '@douyinfe/semi-ui';
import { SocietyItem } from './SocietyItem';
const SocietyPage = () => {
  const data = [
    {
      id: 1,
      name: '街舞社',
      president: '王浩',
      members: 45,
      description: '集结舞蹈爱好者，共同提高街舞技巧，定期参加街舞比赛。',
      meetingDay: '每周五晚上7点',
      photo: 'https://pic.616pic.com/ys_bnew_img/00/02/27/f181WIZBWk.jpg',
    },
    {
      id: 2,
      name: '计算机社',
      president: '刘晨',
      members: 38,
      description: '探索计算机科学的奥秘，学习编程技能，开发实用软件。',
      meetingDay: '每周四下午5点',
      photo: 'https://pic.616pic.com/ys_bnew_img/00/12/19/XTcJbvNy2s.jpg',
    },
    {
      id: 3,
      name: '围棋社',
      president: '陈思',
      members: 20,
      description: '培养围棋技艺，增进思维能力，定期举办围棋比赛。',
      meetingDay: '每周二下午4点',
      photo: 'https://pic.616pic.com/ys_bnew_img/00/13/91/7mMTFKedQR.jpg',
    },
  ];
  const [search, setSearch] = useState('街舞');
  const [desc, setDesc] = useState(data[0].description);

  const handleClick = (x: string) => {
    setDesc(x);
  };
  return (
    <div className={'society-page'}>
      {data.map(soceity => (
        <SocietyItem data={soceity} />
      ))}
    </div>
  );
};
export default SocietyPage;
