import { useState, useEffect } from "react";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { ProductData } from "../Types";
import Product from "./Product";

export const ProductsList = ({ sortType, searchPhrase }: { sortType: string; searchPhrase: string | undefined }) => {
    const [products, setProducts] = useState<Array<ProductData>>([]);

    const { categoryId, subCategoryId, update } = useAppContext();

    useEffect(() => {
        let serarchPartial = searchPhrase ? "name_like=" + searchPhrase + "&" : "";
        if (categoryId !== undefined)
            axios.get(`http://${DB}/products?categoryId=${categoryId}&${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
        else if (subCategoryId !== undefined)
            axios
                .get(`http://${DB}/products?subCategoryId=${subCategoryId}&${serarchPartial}_sort=name&_order=${sortType}`)
                .then((res) => setProducts(res.data));
        else axios.get(`http://${DB}/products?${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
    }, [categoryId, subCategoryId, sortType, searchPhrase, update]);

    return (
        <div className="productList">
            {products.map(({ id, name }: ProductData, i) => (
                <Product key={i} id={id} name={name} />
            ))}
        </div>
    );
};

export default ProductsList;
