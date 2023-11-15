import { useFormState,Form, Toast, Button,Typography } from '@douyinfe/semi-ui';
import {useState} from 'react';
export const Login = () => {
    const [loginSuccess, setLoginSuccess] = useState(undefined);
    const requestLogin= new Promise((resolve, reject) => {
            let isSuccessful = Math.random() >= 0.5;  // 随机成功或失败
            if (isSuccessful) {
                resolve({success:true});  // 成功，调用resolve
            } else {
                resolve({msg:'密码错误',code:1001})
            }
        })

    const handleSubmit = async (values) => {
        await requestLogin.then((res)=>{
            if(res.msg){
                setLoginSuccess(res.msg)
            } else {
                Toast.success('登录成功')
            }
        })
    };
    const {Title,Text}=Typography;
    const ConfirmButton = () => {
        const formState = useFormState();
        return (<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button disabled={!(formState.values.email && formState.values.password)||loginSuccess} theme='solid' style={{ width: '80%' }} htmlType='submit'>登录</Button>
         </div>
        )
    };
    return (
        <div>
            <Title>登录</Title>
            <Form onSubmit={values => handleSubmit(values)} onChange={()=>{
                if(loginSuccess) {setLoginSuccess(undefined)}
            }
            }>
                {({ formState, values, formApi }) => (
                    <>
                        <Form.Input  field='email' label='邮箱' style={{ width: '80%' }} placeholder='请输入'></Form.Input>
                        <Form.Input field='password' mode="password" label='密码' style={{ width: '80%' }} placeholder='请输入6-8位密码'></Form.Input>
                        {loginSuccess&& <Text type="danger">{loginSuccess}</Text>}
                        <ConfirmButton/>
                    </>
                )}
            </Form>
        </div>
    );
};