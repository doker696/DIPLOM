import axios from "utils/axios"

export const getCategoryList = () => axios.get("/category")