import {
  useFormState,
  Form,
  Toast,
  Button,
  Typography,
} from '@douyinfe/semi-ui';
import { useState } from 'react';
import './signUpStyle.scss';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import loginClient from '../../middlewares/loginMiddleWare';
import url from '../../config/RouteConfig';
import { changePwdToUuid } from '../../middlewares/uuidMiddleWare';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [loginFailInfo, setLoginFailInfo] = useState(undefined);
  const handleSubmit = async values => {
    const data = {
      email: values.email,
      username: values.username,
      password: changePwdToUuid(values.password),
    };
    loginClient
      .post('/register', data)
      .then(res => {
        if (res && res.data) {
          Toast.success('注册成功');
          localStorage.setItem('token', res.data.accessToken);
          navigate(url.login);
          Toast.info('请登录');
        } else {
          setLoginFailInfo('注册失败');
        }
      })
      .catch(error => {
        setLoginFailInfo('注册失败');
      });
  };
  const { Title, Text } = Typography;
  const ConfirmButton = () => {
    const formState = useFormState();
    return (
      <Button
        className={'login-button'}
        icon={<IconArrowRight />}
        disabled={!(formState.values.email && formState.values.password)}
        htmlType="submit"
      ></Button>
    );
  };
  return (
    <div className={'sign-up-page'}>
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
              <Title heading={5}>用户名</Title>
              <Form.TextArea
                autosize
                rows={1}
                field="username"
                noLabel={true}
                placeholder="请输入用户名"
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
              <div>
                <ConfirmButton />
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
