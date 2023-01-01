import { useState, useEffect } from "react";
import axios from "axios";
import Product, { ProductData } from "./Product";
import { useCategoryContext } from "../App";

export const ProductsList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;
    const [products, setProducts] = useState<Array<ProductData>>([]);

    const { categoryId, subCategoryId } = useCategoryContext();

    useEffect(() => {
        if (categoryId !== undefined) axios.get(`http://${DB}/products?categoryId=${categoryId}`).then((res) => setProducts(res.data));
        else if (subCategoryId !== undefined) axios.get(`http://${DB}/products?subCategoryId=${subCategoryId}`).then((res) => setProducts(res.data));
        else axios.get(`http://${DB}/products`).then((res) => setProducts(res.data));
    }, [categoryId, subCategoryId, DB]);

    return (
        <div>
            {products.map(({ id, name }: ProductData, i) => (
                <Product key={i} id={id} name={name} />
            ))}
        </div>
    );
};

export default ProductsList;
