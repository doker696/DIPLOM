import { Button, Card, Col, Divider, Row, Tooltip, Typography } from 'antd';
import { getProductById } from 'api';
import Main from 'components/Main';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { addToCart } from 'store/mainSlice';
import { Product } from 'types/product';
import { useQuery } from 'utils/query';
const IMAGE_NOT_FOUND_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADDCAMAAACxkIT5AAAASFBMVEVUVFSoqKhOTk5RUVGrq6tzc3OZmZmFhYWwsLBMTEyXl5etra1vb29+fn6Li4uTk5NiYmJnZ2dbW1uhoaGAgIBeXl5ycnJsbGwxLNHVAAAEr0lEQVR4nO2cDZeiIBSG4V4ElQSVJv//P13ATPuY2Wlqzy7u+5wzk0l2uk9cQEOEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAaTO+H/3ZQz8GTfj9TWRK4svLd2Ko0B+rtDhQcwAEcwAEcwAEcwAEcwAEcwMGuHahuiYLMXbly9OXBcLBDBwwHcCDgIJfDARyI/9tBwzPNIweXwj07kK1Z0PeF+lLo9+xAqoWnC/fj4BXgAA7gAA7gAA7gAA7gAA7gAA7gAA7gAA7g4P90kK6a2ZnPL6Dt10EMXgbvuuowDcMwHarO+SDt1yL25CDG77tepMn4K/GZ6DsfPezfgbLBDCn6RwdFE4MJn2nYiQNl/dQ8jP9yIDeTf2xhFw6UcuM3bkZhGt2jlmEPDqwf6fdHZmj09/eAlO/A6v7GwNwSnm9Vug2Pen1roXQHSlZXWRCjF0N1dL7VWrfeHavYUfD1Kyqp9uTAtuPm8zOJg8vDgXPa59GS1GbirSgeW7sfB7Zr1iKi0yfDgDRwOGwtNN1WQskOlFxbgtjmmy/HQVaaTd9B/SYfCnagtNjE5H97YhDHEBtnQq9vVKwD6y8BpR7vO6eTatuL0qWXLNaBdUtTwGS+cXJ4DleZS0I0zpbtQJlFAQ3hmUsKKgxLVVjmLhXrYAmEzLM3/1pzObZwB/PHZvFUJViqwnlQwXtwcNXFPSFBzvmwBwd0+OnFRXVKEnbggF5YB8BWtAcHryhIw2wq38FrCnJNKN0BTa8uiGGn0vvGj9d/a1neo1QHP+oT7yTIsh28ETiAAziAAziAAziAAziAAzjYiwOsIclTePtSoqGwtUSxpiwAAABwQ5p8lx7m31wpTzjj607u/DRv8byT55/b0/a6gx9OYPz34aH1KWrXsWDhggyG+aDbjB5yeNP85EPQSUvZDhSP0ulg8h2za0+clm2n+FZt683tDM9/Hz5YeWRBMXQxqlBNnQw8GGNCMMb1+SWVTeu/uJFM7aaDryvmU51KKDimEGR0cKobPtTHo9O1L01CdFApkR2QDrEm06hcfGhav8xbj6dVnO9gGOqqSasF2TGGm0ryUaGTsTacbHIQs6GZ1nkphRAdNNJQjIbGOp/rkJEpy1u/WQkqZTqTC/OcJdvRlYNOLQ7yzs7+lUh+TnJQ1SmaGNeY90zp8cqB9ZFDE+ZdMQOaKwckj7Q6EGN9KKtdjA4oBRUdVHMIscr3tw6cc8nBvEgYaX/joLKbeiBEXdq5c3SQPrw2NNUf8567enDOhbUeXOdC/DPT6uCjHspzIOI3HB2IOq8UR+6uPZgTPBbkXaOtaMh5E5MgO4i1oLo4aIwqS8HsgAebvlEvx/ht9/XxsQPua5P6BS/jE3tsOJqYsoMoMahzv0BdaamQan6OuI7jAxGU6VzdpuBj0t86iC1+rbtjsLGq87F2nUlTnEmm0dVkcz3wvs0Tkwqjd5z/p7acu1b7ah47d+u3OZjzBvVOazPO0/i8blPu8DFdOaNjdNinoVQlCqsFifNAKD/weiFsO+6/bG7Ll01e/+ebQP/8JwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwB/gFh35K7dZjp9sAAAAASUVORK5CYII='
               
const ProductPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch()
  let { id } = useParams();
  const stats = useMemo(()=>{
   const arrWithDates = product?.stats?.rows.map(el => ({...el, createdAt: (new Date(el.createdAt).toLocaleDateString())}) )
   const result: {count: number, date: string}[] = []
   arrWithDates?.forEach(el => {
     const t = result.find(res => res.date === el.createdAt)
     if (t) {
       t.count = t.count + 1
     } else {
       result.push({count: 1, date: el.createdAt})
     }
   })
   return result
  },[product])
  useEffect(() => {
    if (id) {
      getProductById(+id).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id]);
  return (
    <div style={{ width: '95%', margin:'100px auto' }}>
      {product && (
        <><Row justify='center' gutter={14}>
          <Col>
            <img
              style={{
                height: '250px',
                maxWidth: '100%',
                margin: 'auto',
                display: 'flex',
              }}
              alt='example'
              src={product.photoURL || IMAGE_NOT_FOUND_URL} />
          </Col>
          <Col>
            <Typography.Title level={1} style={{marginBottom: '10px'}}>{product.brand + " " + product.name}</Typography.Title>
            <Typography.Title level={4}style={{marginTop: '10px'}}>Характеристики</Typography.Title>
            {product.characteristics?.map((el) => {
              return (
                <Row key={el.id}>
                  <Typography.Text type='secondary'>
                  &nbsp;&nbsp;{el.title}: &nbsp;
                  </Typography.Text>
                  <Typography.Text>
                    {el?.productCharacteristic.value}
                  </Typography.Text>

                </Row>
              );
            })}
            <Typography.Title level={2}>Цена: <Typography.Text italic>{product.price}₽</Typography.Text></Typography.Title>
            <Button onClick={() => dispatch(addToCart(product))}>Добавить в корзину</Button>
          </Col>
        </Row>
        <Divider/>
        <Row justify='center'>
          <Col>
          <Typography.Title level={3}>Динамика продаж</Typography.Title>
          <div style ={{height: '250px',width:'700px'}}>
            {console.log(stats)}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={300} data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div> 
          </Col>
          

          </Row>
          </>
      )}
    </div>
  );
};

export default ProductPage;
