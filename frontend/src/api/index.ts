import { register, login } from "./auth";
import { getCurrentUser } from "./user";
import axios from "utils/axios"
import { CreateProduct, ProductSort } from "types/product";

export { register, login, getCurrentUser };



export const getProducts = (category?: number, sort?: ProductSort) => axios.get('/products',{params:{category,sort}})
export const getProductById = (id: number) => axios.get(`/products/${id}`)
export const createProduct = (product: CreateProduct) => axios.post('/products',product)
export const setRatingToProduct = (id: number, userId: number, value: number) => axios.post(`/products/rate/${id}`,{userId, value})

export const createOrder = (userId:number | null, productsIds: number[], date: string, adress:string, fio:string,) => axios.post('/order/create',{userId, productsIds, date, adress, fio})

export const getCategories = () => axios.get('/category')

export const getBrands = () => axios.get('/brand')

export const getOrders = () => axios.get('/order')

export const getCharacteristicsByCategory = (id: number) => axios.get(`/characteristic/category/${id}`)
export const getCharacteristics = () => axios.get(`/characteristic`)

export const getStatByBrand = (params: {to?: string, from?: string}) => axios.get(`/stats/brand`,{params: {...params}})
export const getStatByCategory = (params: {to?: string, from?: string}) => axios.get(`/stats/category`,{params: {...params}})