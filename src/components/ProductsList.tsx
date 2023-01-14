import { useState, useEffect } from "react";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { ProductData } from "../Types";
import Product from "./Product";
import { Grid, Typography } from "@mui/material";

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

    if (products.length === 0)
        return (
            <Typography variant="h4" align="center" className="empty" marginTop={10}>
                Brak wyników
            </Typography>
        );

    return (
        <Grid container spacing={2}>
            {products.map(({ id, name }: ProductData, i) => (
                <Grid key={i} item xs={4}>
                    <Product id={id} name={name} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsList;
