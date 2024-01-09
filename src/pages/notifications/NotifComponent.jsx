//思路:IF ELSE判断传入的Comment Type,根据不同的Comment Type返回不同的样式
import { Avatar, Collapse, Typography, Image, Space } from '@douyinfe/semi-ui';
import './notifStyle.scss';

export const Notif = props => {
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
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"
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
                <Space align={screenLeft} vertical>
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
    const expandIconForLikes = (
      <Space style={{ height: '100%', float: 'right' }}>
        <Image
          className={'notif-postpreview'}
          width={50}
          height={50}
          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg"
        />
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
                <Space vertical align={screenLeft}>
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
