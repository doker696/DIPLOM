export type Category = {id: number, title: string}

export type Brand = {id: number, title: string}

export type Order = {
    id: number,
    date: string,
    adress: string,
    fio: string,
    products: Product[]
}

export type Product = {
    id: number,
    name: string,
    count: number,
    photoURL?: string,
    rating: number,
    brand: Brand,
    category: Category,
    price: number
    stats?: {rows: {createdAt: string}[], count: number}
    characteristics?: (Characteristic & {productCharacteristic: ProductCharacteristic})[]
    
}
export type ProductCharacteristic = {
    characteristicId: number
    createdAt: string
    deletedAt: string
    productId: number
    updatedAt: string
    value: string
}
export type Characteristic = {
    id: number,
    title: string
}
export type CreateCharacteristic = {
    id: number,
    value?: string
}
export type Product_Characteristic = {
    productId: number,
    characteristicId: number
}

export type CreateProduct = {
    name?: string,
    count?: number,
    photoURL?: string,
    brandId?: number,
    categoryId?: number,
    price?: number,
    characteristics?: CreateCharacteristic[]
}
export type ChangeProduct = {
    productId?: number,
    name?: string,
    count?: number,
    photoURL?: string,
    brandId?: number,
    price?: number,
    characteristics?: CreateCharacteristic[]
}

export enum ProductSort {
    SellCount = "sellCount",
    Rating = "rating",
    Popular = 'popular'
}