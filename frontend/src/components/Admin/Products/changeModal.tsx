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
  ChangeProduct,
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
  onSave: (arg: ChangeProduct) => void;
  product: Product | null;
};

const ChangeModal: FC<Props> = (props) => {
  const [product, setProduct] = useState<ChangeProduct>({});
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
    getBrands().then((res) => {
      setBrandList(res.data);
    });
  }, []);
  useEffect(() => {
    if (props.product) {
      setProduct({ ...props.product, productId: props.product?.id });
    }
  }, [props.product]);
  // useEffect(() => {
  //   if (product.categoryId) {
  //     getCharacteristicsByCategory(product.categoryId).then(async (res) => {
  //       const characteristic = await getCharacteristics();
  //       setCharacteristicList(
  //         characteristic.data.filter((ch: Characteristic) =>
  //           res.data.find(
  //             (el: Product_Characteristic) => el.characteristicId === ch.id
  //           )
  //         )
  //       );
  //     });
  //   }
  // }, [product.categoryId]);

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
      title='Изменение товара'
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Space direction='vertical' size='middle'>
        <Row>
          <Typography>
            Название
          </Typography>
          <Input
            value={product.name}
            onChange={(value) =>
              setProduct({ ...product, name: value.target.value })
            }
          />
        </Row>
        <Row align='middle'>
          <Typography>Бренд: </Typography>
          <Select
            value={product.brandId}
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
          <Typography>Количество</Typography>
          <InputNumber
            style={{ margin: '0 15px' }}
            defaultValue={0}
            value={product.count}
            onChange={(value) => setProduct({ ...product, count: value })}
          />
        </Row>
        <Row align='middle'>
          <Typography>Цена</Typography>
          <InputNumber
            style={{ margin: '0 15px' }}
            defaultValue={0}
            value={product.price}
            onChange={(value) => setProduct({ ...product, price: value })}
          />
        </Row>
        <Row>
          <Typography>URL Картинки</Typography>
          <Input
          value={product.photoURL}
            onChange={(value) =>
              setProduct({ ...product, photoURL: value.target.value })
            }
          />
        </Row>
        <Row>
          {characteristicList.map((elem) => (
            <Row>
              <Item
                item={elem}
                onChange={(id, value) => addCharacteristics(id, value)}
              />
            </Row>
          ))}
        </Row>
      </Space>
      <Row>
        <Button onClick={create}> Сохранить изменения</Button>
      </Row>
    </Modal>
  );
};

export default ChangeModal;
