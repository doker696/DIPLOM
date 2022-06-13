import { Table, Typography } from 'antd';
import { getOrders, getStatByBrand } from 'api';
import { FC, useEffect, useState } from 'react';
import { Order, Product } from 'types/product';

const OrdersPage: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fio',
      key: 'fio',
      sorter: (a: { fio: string }, b: { fio: string }) =>
        a.fio.localeCompare(b.fio),
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: { date: Order['date'] }, b: { date: Order['date'] }) => {
        console.log(a);
        return Date.parse(a.date) - Date.parse(b.date);
      },
      ellipsis: true,
      render: (record: Order['date']) => (
        <div>{new Date(record).toLocaleString()}</div>
      ),
    },
    {
      title: 'Adress',
      dataIndex: 'adress',
      key: 'adress',

      sorter: (a: { adress: string }, b: { adress: string }) =>
        a.adress.localeCompare(b.adress),
      ellipsis: true,
    },

    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      ellipsis: true,
      render: (record: Product[]) => (
        <Typography>{record.map((el) => el.name).join(', ')}</Typography>
      ),
    },
  ];

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.data);
    });

  }, []);
 
  return (
    <div style={{ height: '600px'}}>
      <Table
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        dataSource={orders}
      />
      
    </div>
  );
};

export default OrdersPage;
