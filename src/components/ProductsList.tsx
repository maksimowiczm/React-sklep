import { useState, useEffect } from "react";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { ProductData } from "../Types";
import Product from "./Product";
import { Grid, Typography } from "@mui/material";

export const ProductsList = () => {
    const [products, setProducts] = useState<Array<ProductData>>([]);

    const { categoryId, subCategoryId, update, sortType, searchPhrase } = useAppContext();

    useEffect(() => {
        const { prop, direction } = sortType;
        let serarchPartial = searchPhrase ? "name_like=" + searchPhrase + "&" : "";
        if (categoryId !== undefined)
            axios.get(`http://${DB}/products?categoryId=${categoryId}&${serarchPartial}_sort=name&_order=${sortType}`).then((res) => setProducts(res.data));
        else if (subCategoryId !== undefined)
            axios
                .get(`http://${DB}/products?subCategoryId=${subCategoryId}&${serarchPartial}_sort=name&_order=${sortType}`)
                .then((res) => setProducts(res.data));
        else axios.get(`http://${DB}/products?${serarchPartial}_sort=${prop}&_order=${direction}`).then((res) => setProducts(res.data));
    }, [categoryId, subCategoryId, sortType, searchPhrase, update]);

    if (products.length === 0)
        return (
            <Typography variant="h4" align="center" color="info" marginTop={10}>
                Brak wyników
            </Typography>
        );

    return (
        <Grid container spacing={2}>
            {products.map(({ id, name, price }: ProductData, i) => (
                <Grid key={i} item xs={4}>
                    <Product id={id} name={name} price={price} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsList;
