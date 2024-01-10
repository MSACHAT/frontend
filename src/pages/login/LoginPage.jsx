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
import { useNavigate } from 'react-router-dom';
import loginClient from "../../middlewares/loginMiddleWare";
import url from "../../config/RouteConfig";
import {changePwdToUuid} from "../../middlewares/uuidMiddleWare";
import {useRecoilState} from "recoil";
import {IsAuthenticated} from "../../store";
export const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated,setIsAuthenticated] = useRecoilState(IsAuthenticated)
  const [loginFailInfo, setLoginFailInfo] = useState(undefined);
  const handleSubmit = async values => {
    const data = {
      email: values.email,
      password: changePwdToUuid(values.password),
    };
    console.log(data);
    try {
      loginClient.post('/login', data).then(res => {
        if (res && res.data) {
          Toast.success('登录成功');
          console.log(res.data);
          localStorage.setItem('token', res.data.accessToken);
          navigate(url.feed);
        } else {
          setLoginFailInfo('登录失败');
        }
      });
    } catch (error) {
      setLoginFailInfo('登录失败');
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
