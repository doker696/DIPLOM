import { Card, Col, Divider, List, Row, Select, Typography } from 'antd';
import { getProducts } from 'api';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeCategory, changeSort, addToCart, setProducts } from 'store/mainSlice';
import { RootState } from 'store/store';
import { Category, Product, ProductSort } from 'types/product';
import { useQuery } from 'utils/query';
import ProductItem from './productItem';

const Products: FC = () => {
  const { Option } = Select;
  const data = useSelector((state: RootState) => state.main.products);

  const { sort,selectedCategory } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const handleChange = (value: any) => {
    dispatch(changeSort(value));
  };
  const addItemToCart = (item: Product) => {
    dispatch(addToCart(item))
  }
  let query = useQuery().get('category');

  useEffect(() => {
    if (query) { 
      dispatch(changeCategory(Number.parseInt(query)))
    } else {
      dispatch(changeCategory(undefined))
    }
  }, [query]);

  useEffect(() => {
    getProducts(selectedCategory, sort).then( res => {
      dispatch(setProducts(res.data))
      
    })
  }, [selectedCategory, sort])

  return (
    <div style={{background: 'white', boxShadow: '0px 0px 10px 2px rgb(229 229 229)', padding: '5px', margin:'50px 0' }}>
      <div>
        <Row justify='end' style={{ marginBottom: '20px' }}>
          <Col span={3} pull={4}>
            <Typography>Сортировка </Typography>
            <Select
              defaultValue={sort || ''}
              style={{ width: 260 }}
              onChange={handleChange}
              disabled={!!selectedCategory}
            >
              <Option value=''> - </Option>
              <Option value={ProductSort.Rating}>По рейтингу</Option>
              <Option value={ProductSort.SellCount}>По количеству продаж</Option>
              <Option value={ProductSort.Popular}>По количеству продаж(за месяц)</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <List
        style={{ marginBottom: '15px', }}
        grid={{
          gutter: 16,
          column: 3,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 9,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <ProductItem item={item} onAdd={addItemToCart} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Products;
