import {
  Button,
  Divider,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  getBrands,
  getCategories,
  getCharacteristics,
  getCharacteristicsByCategory,
} from 'api';
import { FC, useEffect, useState } from 'react';
import {
  Brand,
  Category,
  Characteristic,
  CreateProduct,
  Product,
  Product_Characteristic,
} from 'types/product';
import Item from './item';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  onSave: (arg: CreateProduct) => void;
};

const CreateModal: FC<Props> = (props) => {
  const [product, setProduct] = useState<CreateProduct>({});
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [characteristicList, setCharacteristicList] = useState<
    Characteristic[]
  >([]);

  const create = () => {
    if (product) {
      props.onSave(product);
    }
  };

  useEffect(() => {
    getCategories().then((res) => {
      setCategoryList(res.data);
    });
    getBrands().then((res) => {
      setBrandList(res.data);
    });
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);
  useEffect(() => {
    if (product.categoryId) {
      getCharacteristicsByCategory(product.categoryId).then(async (res) => {
        const characteristic = await getCharacteristics();
        setCharacteristicList(
          characteristic.data.filter((ch: Characteristic) =>
            res.data.find(
              (el: Product_Characteristic) => el.characteristicId === ch.id
            )
          )
        );
      });
    }
  }, [product.categoryId]);

  const addCharacteristics = (id: number, value: string) => {
    const characteristics =
      product.characteristics ||
      characteristicList.map((el) => {
        return { id: el.id, value: '' };
      });

    const changedCh = characteristics?.map((el) => {
      if (el.id === id) {
        return { id, value };
      }
      return el;
    });
    setProduct({ ...product, characteristics: changedCh });
  };

  return (
    <Modal
      title='???????????????????? ????????????'
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Space direction='vertical' size='middle'>
        <Row>
          <Typography>????????????????</Typography>
          <Input
            onChange={(value) =>
              setProduct({ ...product, name: value.target.value })
            }
          />
        </Row>
        <Row align='middle'>
          <Typography>??????????:</Typography>
          <Select
            style={{ margin: '0 15px', width: '150px' }}
            onChange={(value: number) =>
              setProduct({ ...product, brandId: value })
            }
          >
            {brandList.map((brand: Brand) => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.title}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row align='middle'>
          <Typography>????????????????????</Typography>
          <InputNumber
          style={{margin: '0 15px'}}
            defaultValue={0}
            value={product.count}
            onChange={(value) => setProduct({ ...product, count: value })}
          />
        </Row>
        <Row align='middle'>
          <Typography>????????</Typography>
          <InputNumber
          style={{margin: '0 15px'}}
            defaultValue={0}
            value={product.price}
            onChange={(value) => setProduct({ ...product, price: value })}
          />
        </Row>
        <Row>
          <Typography>URL ????????????????</Typography>
          <Input
            onChange={(value) =>
              setProduct({ ...product, photoURL: value.target.value })
            }
          />
        </Row>
        <Row align='middle'>
          <Typography>??????????????????</Typography>
          <Select
            style={{ margin: '0 15px', width: '150px' }}
            onChange={(value: number) =>
              setProduct({ ...product, categoryId: value })
            }
          >
            {categoryList.map((category: Category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.title}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row>
          {
            characteristicList.map((elem) => (
              <Row>
                {' '}
                <Item
                  item={elem}
                  onChange={(id, value) => addCharacteristics(id, value)}
                />
              </Row>
            ))}
        </Row>
      </Space>
      <Row>
        <Button onClick={create}> ??????????????</Button>
      </Row>
    </Modal>
  );
};

export default CreateModal;
