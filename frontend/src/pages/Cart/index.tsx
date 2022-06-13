import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  notification,
  Rate,
  Row,
  Typography,
} from 'antd';
import { createOrder, setRatingToProduct } from 'api';
import { iteratorSymbol } from 'immer/dist/internal';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from 'store/mainSlice';
import { RootState } from 'store/store';
import { Product } from 'types/product';

const CartPage: FC = () => {
  const cart = useSelector((state: RootState) => state.main.cart);
  const history = useNavigate()
  const [isOpenForm, setisOpenForm] = useState(false);
  const [isOpenRating, setIsOpenRating] = useState(false);
  const [rating, setRating] = useState(0);
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch();
  const deleteItem = (id: number) => {    
    dispatch(removeFromCart(id));
  };


  const handleOpenForm = () => setisOpenForm(true);
  const rate = (id: number, userId: number,value: number) => {
    setRatingToProduct(id,userId,value)
  }
  const Header: FC = () => {
    return (
      <div>
        <Typography.Title level={3}>Корзина</Typography.Title>
      </div>
    );
  };

  const onFinish = (values: {fio: string,adress: string}) => {

      createOrder(user?.id || null,cart.map(el => el.id),(new Date()).toISOString(),values.adress,values.fio)
      notification.success({
          description:'Заказ успешно создан',
          message: ''
      })
      setisOpenForm(false)
      if (user) {
        setIsOpenRating(true)
       return 
      }
      dispatch(clearCart())
      history('../', {replace: true})

  }
  const Footer = () => {
    return (
      <div>
        <Row justify='space-between'>
          <Col>
            <Typography.Title level={3}>
              Итого:{' '}
              {cart.reduce((acc, item) => acc + item.price, 0)}
            </Typography.Title>
          </Col>
          <Col>
            <Button onClick={() => handleOpenForm()}>Оформить заказ</Button>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Row justify='center'>
        <Col span={12}>
          {(cart.length && (
            <List
              style={{ background: 'white' }}
              header={<Header />}
              footer={<Footer />}
              bordered
              dataSource={cart}
              renderItem={(item) => (
                <List.Item>
                  <Row justify='space-between' style={{ width: '100%' }}>
                    <Col span={8}>
                      <Typography.Title level={5}>
                        {item.name}
                      </Typography.Title>
                    </Col>
                    <Col span={8}>
                      <Typography.Text>
                        <Row justify='space-between'>
                          <Col span={6}>
                            <Typography.Text>
                              {' ' + item.price}₽
                            </Typography.Text>
                          </Col>
                          <Col>
                            <Button icon onClick={()=> deleteItem(item.id)}><CloseOutlined /></Button>
                          </Col>
                        </Row>
                      </Typography.Text>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          )) || <div>Пусто</div>}
        </Col>
      </Row>

      <Modal
        visible={isOpenForm}
        onCancel={() => setisOpenForm(false)}
        footer={null}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            style={{marginTop:'20px'}}
        >
          <Form.Item
            label='Имя и Фамилия'
            name='fio'
            initialValue={user && user?.firstName + " " + user?.lastName}
            rules={[{ required: true, message: 'Введите данные!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Адрес'
            name='adress'
            rules={[{ required: true, message: 'Введите адрес!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Заказ!
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {user && <Modal
        visible={isOpenRating}
        onCancel={() => setIsOpenRating(false)}
        onOk={() => {
          setIsOpenRating(false)
          dispatch(clearCart())
          history('../', {replace: true})
        }}
      >
        <Typography.Title>Оставить рейтинг?</Typography.Title>
        {cart.map( el => {
          return (
            <><Typography>{el.name}</Typography><Rate  onChange={(val) => rate(el.id,user.id,val)}></Rate></>
          )
        })}
         
      </Modal>}
      
    </div>
  );
};

export default CartPage;
