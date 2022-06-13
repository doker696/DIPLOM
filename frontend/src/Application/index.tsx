import 'antd/dist/antd.min.css';
import ProductsPage from 'pages/Auth/Admin/Products';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AuthPage from 'pages/Auth';
import Main from 'components/Main';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Image,
  Layout,
  Menu,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd';
import styles from './styles.module.css';
import { ImportOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { auth, quit } from 'store/userSlice';
import { useCallback, useEffect } from 'react';
import { getCurrentUser } from 'api/user';
import CartPage from 'pages/Cart';
import ProductPage from 'pages/ProductPage';
import OrdersPage from 'pages/Auth/Admin/Orders';
import AnalyzPage from 'pages/Auth/Admin/Analyz';

const CubeTown: React.FC = () => {
  const { isAuth, isAdmin, user } = useSelector(
    (state: RootState) => state.user
  );
  const { cart } = useSelector((state: RootState) => state.main);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refToken = localStorage.getItem('tokenRefresh');
    if (token && refToken) {
      getCurrentUser().then((user) => {
        dispatch(auth(user));
      });
    }
  }, []);

  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <Row justify='space-between'>
            <Col>
              <Typography>
                <Link to='/' style={{ color: 'black' }}>
                  <img
                    alt='logo'
                    height={24}
                    style={{ marginRight: '5px', filter: 'grayscale(1)' }}
                    width={24}
                    src={require('../logotip-internet-magazin-tehniki-1015-removebg-preview.png')}
                  ></img>
                  CubeTown
                </Link>
              </Typography>
            </Col>

            <Col>
              <Space direction='horizontal'>
                {!location.pathname.includes('admin') && (
                  <Badge count={cart.length}>
                    <Link to='/cart'>
                      <Button
                        key='2'
                        type='text'
                        shape='circle'
                        icon={<ShoppingCartOutlined />}
                      ></Button>
                    </Link>
                  </Badge>
                )}
                {!isAuth && (
                  <Link key='4' to='/login'>
                    <Button type='text'>Login</Button>
                  </Link>
                )}
                {!isAuth && (
                  <Link key='1' to='/register'>
                    <Button type='text'>Registration</Button>
                  </Link>
                )}
                {isAuth && (
                  <Typography>
                    Добро пожаловать, {user?.firstName} {user?.lastName}
                  </Typography>
                )}
                {isAuth && (
                  <Button
                    key='5'
                    type='text'
                    shape='circle'
                    icon={<ImportOutlined />}
                    onClick={() => {
                      dispatch(quit());
                    }}
                  />
                )}
              </Space>
            </Col>
          </Row>
        </Header>

        <Layout>
          {isAdmin && location.pathname.includes('admin') && (
            <Sider width={200} style={{ backgroundColor: 'white' }}>
              <Menu defaultSelectedKeys={['1']}>
                <Menu.Item key='3' onClick={() => navigate('/admin/analyz')}>
                  Анализ
                </Menu.Item>
                <Menu.Item key='1' onClick={() => navigate('/admin/products')}>
                  Список товаров
                </Menu.Item>
                <Menu.Item key='2' onClick={() => navigate('/admin/orders')}>
                  История заказов
                </Menu.Item>
              </Menu>
            </Sider>
          )}
          <Layout>
            <Content style={{ minHeight: window.innerHeight - 64 - 71 }}>
              <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<AuthPage />} />
                <Route path='/register' element={<AuthPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                {isAdmin && (
                  <Route path='/admin/products' element={<ProductsPage />} />
                )}
                {isAdmin && (
                  <Route path='/admin/orders' element={<OrdersPage />} />
                )}
                {isAdmin && (
                  <Route path='/admin/analyz' element={<AnalyzPage />} />
                )}
                <Route
                  path='/*'
                  element={
                    <Typography.Title style={{ textAlign: 'center' }}>
                      Sorry, page not found :({' '}
                    </Typography.Title>
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>

        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderTop: '1px solid white',
          }}
        >
          CubeTown ©2022 Created by Tokarev and Khlystova
        </Footer>
      </Layout>
    </div>
  );
};

export default CubeTown;
