import { useState, useEffect } from "react";
import axios from "axios";
import Product, { ProductData } from "./Product";
import { useCategoryContext, useUpdateContext } from "../App";

export const ProductsList = ({ sortType, searchPhrase }: { sortType: string, searchPhrase: string | undefined }) => {
    const DB = process.env.REACT_APP_DB_SERVER;
    const [products, setProducts] = useState<Array<ProductData>>([]);

    const { categoryId, subCategoryId } = useCategoryContext();
    const { update } = useUpdateContext();


    useEffect(() => {
        let serarchPartial = searchPhrase ? "name_like=" + searchPhrase + "&" : "";
        if (categoryId !== undefined) axios.get(`http://${DB}/products?categoryId=${categoryId}&${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
        else if (subCategoryId !== undefined) axios.get(`http://${DB}/products?subCategoryId=${subCategoryId}&${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
        else axios.get(`http://${DB}/products?${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
    }, [categoryId, subCategoryId, DB, sortType, searchPhrase]);

    return (
        <div className="productList">
            {products.map(({ id, name }: ProductData, i) => (
                <Product key={i} id={id} name={name} />
            ))}
        </div>
    );
};

export default ProductsList;
