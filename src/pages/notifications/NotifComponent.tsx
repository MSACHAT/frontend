//思路:IF ELSE判断传入的Comment Type,根据不同的Comment Type返回不同的样式
import { Avatar, Collapse, Typography, Image, Space } from '@douyinfe/semi-ui';
import './notifStyle.scss';
import React from 'react';
import {NotifComponentProps} from "../../../types/notif";

export const Notif = (props:NotifComponentProps) => {
  const likedYourNotif = '赞了你的动态';
  const { Text } = Typography;
  const {
    messageType,
    userIcon,
    userName,
    sendTime,
    commentContent,
    previewType,
    previewString,
    isRead,
  } = props;
  const expandIconForComments =
    previewType === 'image' ? (
      <Space style={{ height: '100%', display: 'inline-flex', float: 'right' }}>
        <Image
          width={50}
          height={50}
          className={'notif-postpreview'}
          src={previewString}
        />
      </Space>
    ) : (
      <Space style={{ height: '100%', display: 'inline-flex', float: 'right' }}>
        <Text className={'notif-postpreview'}>{previewString}</Text>
      </Space>
    );
  if (messageType === 'Comment') {
    return (
      <Collapse className={'notif-collapse'} expandIcon={expandIconForComments}>
        <Collapse.Panel
          header={
            <div>
              <Space align={'end'}>
                <div className={isRead ? 'notif-read' : 'notif-newnotif'}></div>
                <Avatar src={userIcon} className={'notif-avatar'} />
                <Space align={"start"} vertical>
                  <Text className={'notif-username'}>{userName}</Text>
                  <Text ellipsis={{}} className={'notif-notifcontent'}>
                    {commentContent}
                  </Text>
                </Space>
                <Text type="quaternary" className={'notif-sendtime'}>
                  {sendTime}
                </Text>
              </Space>
            </div>
          }
          itemKey="1"
        ></Collapse.Panel>
      </Collapse>
    );
  } else {
    const expandIconForLikes =
      previewType === 'image' ? (
        <Space style={{ height: '100%', float: 'right' }}>
          <Image
            className={'notif-postpreview'}
            width={50}
            height={50}
            src={previewString}
          />
        </Space>
      ) : (
        <Space style={{ height: '100%', float: 'right' }}>
          <Text className={'notif-postpreview'}>{previewString}</Text>
        </Space>
      );
    return (
      <Collapse expandIcon={expandIconForLikes} className={'notif-collapse'}>
        <Collapse.Panel
          header={
            <div>
              <Space align={'end'}>
                <div className={isRead ? 'notif-read' : 'notif-newnotif'}></div>
                <Avatar src={userIcon} className={'notif-avatar'} />
                <Space vertical align={"start"}>
                  <Text className={'notif-username'}>{userName}</Text>
                  <Text className={'notif-notifcontent'}>{likedYourNotif}</Text>
                </Space>
                <Text type={'quaternary'} className={'notif-sendtime'}>
                  {sendTime}
                </Text>
              </Space>
            </div>
          }
          itemKey="1"
        ></Collapse.Panel>
      </Collapse>
    );
  }
};
