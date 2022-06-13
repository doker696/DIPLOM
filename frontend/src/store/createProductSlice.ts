import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Brand, CreateProduct } from 'types/product';

export interface CreateProductState {
  categoryList: Category[],
  brandList: Brand[],
  product: CreateProduct | null
}

const initialState: CreateProductState = {
  categoryList: [],
  brandList: [],
  product: null
};

export const createProduct = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {
    setCategoryList:(state, {payload}: PayloadAction<Category[]>) => {
      state.categoryList=payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryList } = createProduct.actions;

export default createProduct.reducer;
