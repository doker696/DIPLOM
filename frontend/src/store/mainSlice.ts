import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Product, ProductSort } from 'types/product';

export interface MainState {
  sort?: ProductSort;
  selectedCategory?: number;
  products: Product[];
  categories: Category[];
  cart: (Product)[]
}
const initialState: MainState = {
  products: [],
  //   {
  //     id: 0,
  //     title: 'Meizu X5',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278024_9.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 1,
  //     title: 'Nokia 3250',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278033_11.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 2,
  //     title: 'Honor 50 Frost',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278003_13.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 3,
  //     title: 'Xiaomi 11T Pro',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278038_20.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 4,
  //     title: 'HUAWEI nova 8',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278006_22.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 5,
  //     title: 'realme GT Master',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594277980_23.jpeg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 6,
  //     title: 'Honor 50',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278127_5.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 7,
  //     title: 'Samsung Galaxy S20',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278042_29.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 8,
  //     title: 'Meizu ZXC',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594278054_31.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 9,
  //     title: 'product 3',
  //     photoURL: 'https://klike.net/uploads/posts/2020-07/1594277984_34.jpg',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 10,
  //     title: 'product 4',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 11,
  //     title: 'product 5',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 12,
  //     title: 'product 6',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 13,
  //     title: 'product 7',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 14,
  //     title: 'product 8',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 15,
  //     title: 'product 9',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 16,
  //     title: 'product 10',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 17,
  //     title: 'product 11',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 18,
  //     title: 'product 12',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  //   {
  //     id: 19,
  //     title: 'product 13',
  //     rating: Math.round(Number.parseFloat((Math.random() * 5).toFixed(2)) * 2) / 2,
  //     category: Category.phone,
  //     brand: Brands.apple,
  //     sellCount: Math.round(Math.random() * 2000),
  //     price: Math.round(Math.random() * 100) * 1000 - 1,
  //   },
  // ],
  cart: [],
  categories: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setProducts: (state, {payload}: PayloadAction<Product[]>) => {
      state.products = payload
    },
    setCategories: (state, {payload}: PayloadAction<Category[]>) => {
      state.categories = payload
    },
    changeSort: (state, { payload }: PayloadAction<ProductSort>) => {
      state.sort = payload;
    },
    changeCategory: (state, { payload }: PayloadAction<number | undefined>) => {
      state.selectedCategory = payload;
    },

    addToCart: (state, { payload }: PayloadAction<Product>) => {
      if (!state.cart.find( item => payload.id === item.id)) state.cart.push(payload)
    },
    removeFromCart: (state, { payload: id }: PayloadAction<number>) => {
      state.cart = state.cart.filter( item => item.id !== id)
    }, 
    clearCart: (state) => {
      state.cart = []
    },    
  },
});

// Action creators are generated for each case reducer function
export const { clearCart, changeSort, changeCategory, addToCart, setProducts, setCategories, removeFromCart} = mainSlice.actions;

export default mainSlice.reducer;
