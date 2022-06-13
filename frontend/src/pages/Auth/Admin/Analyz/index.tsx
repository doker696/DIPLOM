import { Col, DatePicker, Row, Table, Typography } from 'antd';
import { getOrders, getStatByBrand, getStatByCategory } from 'api';
import { FC, useEffect, useState } from 'react';
import { Order, Product } from 'types/product';
import { shuffle } from 'underscore'
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const AnalyzPage: FC = () => {
  const [statB, setStatB] = useState<{ title: string; sum: number }[]>([]);
  const [statС, setStatС] = useState<{ title: string; sum: number }[]>([]);
  const [dateFrom, setDateFrom] = useState<string  | undefined>(undefined);
  const [dateTo, setDateTo] = useState<string  | undefined>(undefined);
  useEffect(() => {
    getStatByBrand({from: dateFrom,to: dateTo}).then((res) =>{
    console.log(res.data);
    console.log('asdasdasda');
    
      setStatB(
        res.data.map((el: { title: string; sum: string }) => {
          return { name: el.title, sum: Number.parseInt(el.sum) };
        })
      )}
    );
    getStatByCategory({from: dateFrom,to: dateTo}).then((res) =>{
    console.log(res.data);
    
      setStatС(
        res.data.map((el: { title: string; sum: string }) => {
          return { name: el.title, sum: Number.parseInt(el.sum) };
        })
      )}
    );
  }, [dateFrom, dateTo]);
  let COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
  let COLORS2 = COLORS.reverse() 

  return (
    <div>
      <div style={{marginTop: '25px',marginLeft:'25px'}}>
        <Typography.Title level={4}>
          C: <DatePicker size="large" onChange={(val) => setDateFrom(val?.toISOString().slice(0,10))}></DatePicker>
          {" "}
          По: <DatePicker size="large" onChange={(val) => setDateTo(val?.toISOString().slice(0,10))}></DatePicker>
        </Typography.Title>
        </div>
      <div style={{ height: '350px', display: 'flex', justifyContent: 'space-evenly' }}>
      <div style={{width: "500px", height: '100%', marginTop: '50px', textAlign:'center'}}>
        <Typography.Title level={3}>
          Статистика продаж по брендам:
        </Typography.Title>
        {console.log(statB)}
        {statB.length ? (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={300} height={300}>
              <Pie
                dataKey='sum'
                isAnimationActive={false}
                data={statB}
                cx='50%'
                cy='50%'
                outerRadius={120}
                fill='#8884d8'
                label
              >
                {statB.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
         ) : ( <Typography.Title>За данный период статистика не найдена</Typography.Title>)}
      </div>
      <div style={{width: "500px", height: '100%', marginTop: '50px', textAlign:'center'}}>
        <Typography.Title level={3}>
          Статистика продаж по категориям:
        </Typography.Title>
        {statС.length  ? (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={300} height={300}>
              <Pie
                dataKey='sum'
                isAnimationActive={false}
                data={statС}
                cx='50%'
                cy='50%'
                outerRadius={120}
                fill='#8884d8'
                label
              >
                
                {statB.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS2[index % COLORS2.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (<Typography.Title>За данный период статистика не найдена</Typography.Title>)}
      </div>
    </div>
    </div>
    
  );
};

export default AnalyzPage;
