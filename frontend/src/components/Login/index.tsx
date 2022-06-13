import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from 'antd';
import { login } from 'api';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from 'store/userSlice';

const Login: FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values: { email: string; password: string }) => {
    console.log(values);

    login(values)
      .then((res) => {
        dispatch(auth(res.data.user));

        if (res.data.user.roleId !== 1) {
          navigator('/');
        } else {
          navigator('/admin/products');
        }
      })
      .catch((err) => {
        notification.error({
          message: 'Неправильный логин или пароль!',
          duration: 3,
        });
      });
  };

  return (
    <div>
      <div>
        <Row style={{ height: '100vh' }} justify='center' align='middle'>
          <Col>
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
            >
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Введите почту!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Пароль'
                name='password'
                rules={[{ required: true, message: 'Введите пароль!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
