import { Button, Checkbox, Col, Form, Input, InputNumber, notification, Row, Select, Typography } from "antd";
import { FC, useState } from "react";
import { User } from "types/user";
import { register } from "api";
import { AxiosError, AxiosResponseHeaders } from "axios";
import { useDispatch } from "react-redux";
import { auth } from "store/userSlice";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values: User) => {
      register(values).then((user: User) => {
        dispatch(auth(user))
        navigate('/')
      }).catch((err) => {
        console.log(err.response.data.message);
                
        notification['error']({
          message: 'Ошибка!',
          description: err.response.data.message,
          duration: 5
        })
      })
    
  };

  const { Option } = Select;

  return (
    <div>
      <Row style={{height: '100vh'}} justify="center" align="middle">
          <Col>
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Имя"
                name="firstName"
                rules={[{ required: true, message: "Введите ваше имя!" }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                label="Фамилия"
                name="lastName"
                rules={[{ required: true, message: "Введите вашу фамилию!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Год рождения"
                name="year"
                rules={[{ required: true, message: "Введите ваш год рождения!" }]}
              >
                <InputNumber min={1920} max={(new Date()).getFullYear() - 18} />
              </Form.Item>

              <Form.Item
                label="Пол"
                name="gender"
                rules={[{ required: true, message: "Выберите пол!" }]}
              >
                <Select
                  showSearch
                  placeholder="Выберите..."
                >
                  <Option value="0">Женский</Option>
                  <Option value="1">Мужской</Option>
                </Select>
              </Form.Item>
             
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Введите вашу почту!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: "Введите пароль!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </div>
  );
};

export default Register;
