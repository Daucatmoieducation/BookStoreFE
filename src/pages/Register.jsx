import { Button, Form, Input } from 'antd'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  const beUrl = import.meta.env.VITE_APP_BE_URL;

  const onFinish = async (values) => {
    try {
      await axios.post(`${beUrl}/users/register`, values);
      nav('/login');
    } catch (error) {
      form.setFields([
        {
          name: 'email',
          errors: ['Email đã tồn tại!'],
        },
      ]);
      setTimeout(() => {
        const { username } = form.getFieldValue();
        form.setFieldsValue({
          email: '',
          password: '',
          confirm: ''
        });
        form.setFieldsValue({ username })
      }, 2000)
    }
  };

  return (
    <div className='bg-blue-100 h-screen flex items-center justify-center'>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        className='bg-white w-[400px] p-5 rounded-lg'
      >
        <Form.Item
          label="Họ và tên"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên của bạn!',
            },
          ]}
        >
          <Input placeholder='Nhập tên của bạn' className='p-2' />
        </Form.Item>
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
        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          hasFeedback
          className=' mb-10'
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password className='p-2' placeholder='Xác nhận mật khẩu' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='w-full py-4'>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
