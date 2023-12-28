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
import axios from "axios";
// import changePwdToUuid from "../../middlewares/uuidMiddleWare";
const {addToken}=require('../../middlewares/tokenMiddleWare.js')
// 创建 Koa 应用程序
// const Koa = require('koa');
// const app = new Koa();
// app.use(addToken);
export const Login = () => {
  const [loginFailInfo, setLoginFailInfo] = useState(undefined);
  const handleSubmit = async values => {
    // const header = { 'Content-Type': 'application/json' };
    // await axios.post('http://localhost:8085/login',changePwdToUuid(values), {
    //   headers: header,
    // }).then(res=>{
    //   console.log(res.data)
    // });
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
