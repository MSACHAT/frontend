import {
  useFormState,
  Form,
  Toast,
  Button,
  Typography,
} from '@douyinfe/semi-ui';
import { useState } from 'react';
import './loginStyle.scss';
import { IconArrowRight } from '@douyinfe/semi-icons';
export const Login = () => {
  const [loginFailInfo, setLoginFailInfo] = useState(undefined);
  const handleSubmit = async values => {
    const requestLogin = new Promise((resolve, reject) => {
      let isSuccessful = Math.random() >= 0.5; // 随机成功或失败
      console.log(isSuccessful);
      if (isSuccessful) {
        resolve({ success: true }); // 成功，调用resolve
      } else {
        resolve({ msg: '密码错误', code: 1001 });
      }
    });
    await requestLogin.then(res => {
      if (res.msg) {
        setLoginFailInfo(res.msg);
      } else {
        Toast.success('登录成功');
      }
    });
  };
  const { Title, Text } = Typography;
  const ConfirmButton = () => {
    const formState = useFormState();
    return (
      <Button
        className={'login-button'}
        icon={<IconArrowRight />}
        disabled={
          !(formState.values.email && formState.values.password) ||
          loginFailInfo
        }
        theme="solid"
        htmlType="submit"
      ></Button>
    );
  };
  return (
    <div className={'login-page'}>
      <div className={'login-form'}>
        <Form
          onSubmit={values => handleSubmit(values)}
          onChange={() => {
            if (loginFailInfo) {
              setLoginFailInfo(undefined);
            }
          }}
        >
          {({ formState, values, formApi }) => (
            <>
              <Title heading={5}>邮箱</Title>
              <Form.TextArea
                autosize
                rows={1}
                field="email"
                noLabel={true}
                placeholder="请输入您的邮箱"
                className={'login-form-input'}
              />
              <div className={'form-margin'} />
              <Title heading={5}>密码</Title>
              <Form.Input
                noLabel={true}
                field="password"
                mode="password"
                placeholder="请输入6-8位密码"
                className={'login-form-input'}
              />
              {loginFailInfo && <Text type="danger">{loginFailInfo}</Text>}
              <ConfirmButton />
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
