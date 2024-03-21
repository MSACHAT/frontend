import React, {useEffect, useState} from 'react';
import './style.scss';
import { Input } from '@douyinfe/semi-ui';
import {HandleClickType, SocietyItem} from './SocietyItem';
import useFetch from '../../fetch';
const SocietyPage = () => {
  const [search, setSearch] = useState('街舞');
  const  {data,loading,error}=useFetch('http://localhost:8000/societies');
  return (
    <div className={'society-page'}>
      {loading&&<div>loading...</div>}
      {error &&<div>{error}</div>}
      {data && data.map(soceity => (
        <SocietyItem data={soceity} />
      ))}
      {/*{desc}*/}
    </div>
  );
};
export default SocietyPage;
