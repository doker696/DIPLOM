import { Card, Rate, Select, Slider, Space, Typography } from 'antd';
import { FC, useState } from 'react';

const Filters: FC = () => {
  const [price, setPrice] = useState([1500,175000])
  return (
    <div style={{marginTop: "75px"}}>
      <Card title="Фильтры">
        <Space direction='vertical' style={{width: '100%'}}>
          <h4>Диапазон цены: {price[0]} - {price[1]} <Slider  onChange={val => setPrice(val)} max={200000} range value={[price[0],price[1]]} /></h4>
          <h4>Бренд: <Select style={{width:"150px"}} value={"-"} /></h4>
          <h4>Рейтинг: <Rate allowHalf /></h4>

        </Space>
      </Card>
    </div>
  );
};

export default Filters;
