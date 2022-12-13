import { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "./Product";
import Product from "./Product";

export interface ProductsListData {
    category: number | undefined;
    subCategory: number | undefined;
    productClick: (id: number) => void;
}

export const ProductsList = ({ category, subCategory, productClick }: ProductsListData) => {
    const DB = process.env.REACT_APP_DB_SERVER;
    const [products, setProducts] = useState<Array<ProductData>>([]);

    useEffect(() => {
        if (category !== undefined) axios.get(`http://${DB}/products?categoryId=${category}`).then((res) => setProducts(res.data));
        else if (subCategory !== undefined) axios.get(`http://${DB}/products?subCategoryId=${subCategory}`).then((res) => setProducts(res.data));
        else axios.get(`http://${DB}/products`).then((res) => setProducts(res.data));
    }, [category, subCategory, DB]);

    return (
        <div>
            {products.map(({ id, name }: ProductData, i) => (
                <Product id={id} name={name} productClick={productClick} />
            ))}
        </div>
    );
};

export default ProductsList;
