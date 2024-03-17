import React, { useCallback, useState } from 'react';
import { Button, Modal, Toast, Typography } from '@douyinfe/semi-ui';
import {
  IconAlertTriangle,
  IconDeleteStroked,
} from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import './NavigationBarStyle.scss';
import apiClient from '../../../middlewares/axiosInterceptors';
import { useNavigate } from 'react-router-dom';
import { NavigationBackButton } from '../../../components/NavigationBackButton';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

export default function NavigationBar({ postId, showDeleteButton }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { Text } = Typography;

  const showDialog = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setVisible(false);

    sendRequest();
    navigate('/post');
  }, []);

  async function sendRequest() {
    try {
      const res = await apiClient.delete(`/post/${postId}/delete`);
    } catch (e) {
      Toast.error('删除失败');
    }
  }

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <div className={'NavigationBarContainer'}>
      <NavigationBackButton />
      <Title className={'title'} heading={3}>
        帖子详情
      </Title>

      <Button
        onClick={showDialog}
        icon={<IconDeleteStroked />}
        size={'large'}
        style={showDeleteButton ? { color: 'gray' } : { visibility: 'hidden' }}
        iconSize={'large'}
        theme={'borderless'}
      />

      <Modal
        className={'modal'}
        icon={<IconAlertTriangle />}
        title={'删除个人发帖'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
        okText={'确认删除'}
        cancelText={'取消'}
      >
        <Text>帖子删除之后将无法恢复，请确认是否要删除本帖子！</Text>
      </Modal>

      <div style={{ height: '100px' }}></div>
    </div>
  );
}
