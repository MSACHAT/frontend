import {
  useFormState,
  Form,
  Toast,
  Button,
  Typography, Skeleton
} from '@douyinfe/semi-ui';
import { useState } from 'react';
import './loginStyle.scss';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import loginClient from '../../middlewares/loginMiddleWare';
import url from '../../config/RouteConfig';
import { changePwdToUuid } from '../../middlewares/uuidMiddleWare';
import { useRecoilState } from 'recoil';
import { IsAuthenticated } from '../../store';
import React from 'react';
import { LoginFormValues } from '../../../types/LoginPage';
// @ts-ignore
export const Login = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(IsAuthenticated);
  const [loginFailInfo, setLoginFailInfo] = useState<string | undefined>(undefined);

  const handleSubmit = async (values: LoginFormValues) => {
    const data = {
      email: values.email,
      password: changePwdToUuid(values.password),
    };
    console.log(data.password);
    try {
      const res = await loginClient.post('/login', data);
      if (res && res.data) {
        Toast.success('登录成功');
        setIsAuthenticated(true);
        localStorage.setItem('token', res.data.accessToken);
        navigate(url.feed);
      } else {
        setLoginFailInfo('登录失败');
      }
    } catch (error) {
      setLoginFailInfo('登陆失败');
    }
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
          Boolean(loginFailInfo)
        }
        theme="solid"
        htmlType="submit"
      ></Button>
    );
  };
  const placeholder: React.ReactNode[] = (
    <div className={'login-page'}>
      <div className={'login-form'}>
        <Skeleton.Title/>
        <Skeleton.Title/>
        <Skeleton.Button className={'login-button'}/>
      </div>
    </div>
  )
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
          {({}) => (
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
              <div style={{ marginTop: 20 }}>
                <Text
                  link
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  现在注册
                </Text>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
