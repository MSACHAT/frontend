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
import apiClient from "../../middlewares/axiosInterceptors"
export const Login = () => {
  async function fetchData(header) {
    try {
      const res = await apiClient.get('http://localhost:8085/post/getbypagenumandpagesize/test?pageNum=0', {
        headers: header,
      });
      console.log(res.data);
    } catch (err) {
      // 处理错误
      console.error("An error occurred:", err);
    }
  }
  const [loginFailInfo, setLoginFailInfo] = useState(undefined);
  const handleSubmit = async values => {
    const header = {'Content-Type': 'application/json'};
    fetchData(header)
  }
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
