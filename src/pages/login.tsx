import { useFormState,Form, Toast, Button,Typography } from '@douyinfe/semi-ui';
export const Login = () => {
    const handleSubmit = (values) => {
        Toast.info(JSON.stringify(values)+'表单已提交');
    };
    const {Title}=Typography;
    const ConfirmButton = () => {
        const formState = useFormState();
        return (<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button disabled={!(formState.values.email && formState.values.password)} theme='solid' style={{ width: '80%' }} htmlType='submit'>登录</Button>
         </div>
        )
    };
    return (
        <div>
            <Title>登录</Title>
            <Form onSubmit={values => handleSubmit(values)} >
                {({ formState, values, formApi }) => (
                    <>
                        <Form.Input field='email' label='邮箱' style={{ width: '80%' }} placeholder='请输入'></Form.Input>
                        <Form.Input field='password' mode="password" label='密码' style={{ width: '80%' }} placeholder='请输入6-8位密码'></Form.Input>
                        <ConfirmButton/>
                    </>
                )}
            </Form>
        </div>
    );
};