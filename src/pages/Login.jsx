import "../App.css"
import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';

const Login = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const { login, authenticated, userRole } = useContext(UserContext);

    const onFinish = async (values) => {
        try {
            await login(values);
        } catch (error) {
            form.setFields([
                {
                    name: 'email',
                    errors: [''],
                },
                {
                    name: 'password',
                    errors: ['Email or Password is incorrect'],
                },
            ]);
            setTimeout(() => { form.setFieldValue('password', '') }, 2000)
        }
    };

    if (authenticated) {
        if (userRole === 'Admin') {
            nav('/admin');
        } else {
            nav('/');
        }
    }

    return (
        <div className='bg-blue-100 h-screen flex items-center justify-center'>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
                className='bg-white w-[400px] p-5 rounded-lg'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email của bạn!',
                        },
                        {
                            type: 'email',
                            message: 'Vui lòng nhập một địa chỉ email hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder='Nhập email của bạn' className='p-2' />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu của bạn!',
                        },
                        {
                            min: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu của bạn" className='p-2' />
                </Form.Item>
                <Form.Item valuePropName="checked" label={null}>
                    <div className='flex w-full items-center justify-between'>
                        <Checkbox>Remember me</Checkbox>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='w-full py-4'>
                        Đăng nhập
                    </Button>
                </Form.Item>
                <div className='flex items-center justify-center gap-2'>
                    <p>Bạn chưa có tài khoản?</p><Link className='text-[#1677ff]' to="/register">Đăng ký</Link>
                </div>
            </Form>
        </div>
    )
}

export default Login
