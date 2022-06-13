import { Input, Row, Typography } from 'antd';
import { FC } from 'react';
import { Characteristic } from 'types/product';

type Props = {
  item: Characteristic;
  onChange: (id: number,value: string) => void
};

const Item: FC<Props> = ({ item, onChange }) => {
  return (
    <div style={{width: '350px'}}>
          <Typography>{item.title}</Typography>
          <Input onChange={(val) => onChange(item.id,val.target.value)}/>
    </div>
  );
};

export default Item;
