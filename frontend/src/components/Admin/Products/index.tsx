import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { User } from "types/user";
import {createProduct, getProducts, register} from "api";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "api/createProduct";
import { Category, CreateProduct, Product } from "types/product";
import { setCategoryList } from "store/createProductSlice";
import { AxiosResponse } from "axios";
import { RootState } from "store/store";
import CreateModal from "./createModal";
import ChangeModal from "./changeModal";

const Products: FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<any>({});
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenChangeModal, setIsOpenChangeModal] = useState<boolean>(false);
  const [changingProduct, setChangingProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  const categoryList = useSelector(
    (state: RootState) => state.createProduct.categoryList
  );

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  useEffect(() => {
    getCategoryList().then((result: AxiosResponse<Category[]>) => {
      dispatch(setCategoryList(result.data));
    });
    getProducts().then(res => {
      setProducts(res.data)
    })
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a: { count: number }, b: { count: number }) =>
        a.count - b.count,
      sortOrder: sortedInfo.columnKey === "count" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      
      sorter: (a: { brand: {title: string} }, b: { brand: {title: string} }) =>
        a.brand.title.localeCompare(b.brand.title),
      sortOrder: sortedInfo.columnKey === "brand" && sortedInfo.order,
      ellipsis: true,
      render: (record: {title: string}) => record.title
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      
      sorter: (a: { category: {title: string} }, b: { category: {title: string} }) =>
        a.category.title.localeCompare(b.category.title),
      sortOrder: sortedInfo.columnKey === "category" && sortedInfo.order,
      ellipsis: true,
      render: (record: {title: string}) => record.title
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_: unknown, record: Product) => <Button onClick={() => { setIsOpenChangeModal(true); setChangingProduct(record)}}>Изменить</Button>
    },
    
  ];

  const createNewProduct = (product: CreateProduct) => {
    createProduct(product).then((res)=>{
      closeModal()
      notification.success({description: "Товар успешно создан", message:'Создание товара'})
    })
  }
  const changeProduct = (product: CreateProduct) => {
    // createProduct(product).then((res)=>{
    //   closeModal()
    //   notification.success({description: "Товар успешно создан", message:'Создание товара'})
    // })
  }
  const handleChangeProduct = (product: Product) => {
    setIsOpenChangeModal(true)
    setChangingProduct(product)
  }
  return (
    <div style={{ marginLeft: 5, marginRight: 5 }}>
      <Space style={{ marginBottom: 16, marginTop: 16 }}>
        <Button onClick={() => openModal()}>Добавить товар</Button>
      </Space>
      <Table
        pagination={{ position: ["bottomCenter"] }}
        columns={columns}
        dataSource={products}
        onChange={handleChange}
      />
      <CreateModal visible={isOpenModal} onCancel={closeModal} onOk={closeModal} onSave={createNewProduct}/>
      <ChangeModal visible={isOpenChangeModal} onCancel={() => setIsOpenChangeModal(false)} onOk={() => setIsOpenChangeModal(false)} onSave={changeProduct} product={changingProduct} />
    </div>
  );
};

export default Products;
