import { Col, Grid, Row } from 'antd';
import { FC, useState } from 'react';
import Category from './Category';
import Filters from './Filters';
import Products from './Products';

const Main: FC = () => {
  return (
    <div>
      <Row justify='space-around'>
        <Col span={4}>
          <Category />
        </Col>
        <Col span={14} >
          <Products />
        </Col>
        <Col span={4}>
          {/* <Filters /> */}
        </Col>
      </Row>
    </div>
  );
};

export default Main;
