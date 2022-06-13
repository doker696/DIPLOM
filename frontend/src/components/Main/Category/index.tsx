import { Card, List, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getCategories } from 'api';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {   useNavigate } from 'react-router-dom';
import { setCategories } from 'store/mainSlice';
import { RootState } from 'store/store';

const Category: FC = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.main.categories)
  const selectedCategory = useSelector((state: RootState) => state.main.selectedCategory)

  useEffect(()=>{
    getCategories().then((res)=>{
      dispatch(setCategories(res.data))
    })
  },[])
  return (
    <div style={{marginTop: "75px"}}>
      <Menu mode='vertical'>
        <SubMenu title='Категории' onTitleClick={()=> navigate('/')}>
          {categories.length && categories.map( category => {
            return <Menu.Item key={category.id} onClick={()=> navigate(`/?category=${category.id}`)}>{category.title}</Menu.Item>
          })}
        </SubMenu>
        {selectedCategory && <Menu.Item key={0} onClick={()=> navigate(`/`)}>Все категории</Menu.Item>}
      </Menu>
    </div>
  );
}; 
export default Category;
