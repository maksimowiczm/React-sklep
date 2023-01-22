import { DB, useAppContext } from "../App";
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminControlsProduct } from "./admin/AdminControls";
import { ProductData } from "../Types";
import { Box, Rating, Typography } from "@mui/material";
import { AddToCartIconTooltip } from "./admin/IconTooltips";

export const ProductView = () => {
    const { productId, admin, addOneToBasket } = useAppContext();
    const [product, setProduct] = useState<ProductData>();
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        axios.get(`http://${DB}/products/${productId}`).then((res) => {
            setProduct(res.data);
            setRating(res.data.rating);
        });
    }, [productId]);

    const addToCart = () => {
        const { id, name, price } = product!!;
        addOneToBasket({ id, name, price });
    };

    return (
        <Box>
            <Box className="productView">
                <Box display="flex" alignItems="center">
                    <Typography variant="h4" marginBottom={2}>
                        {product?.name}
                    </Typography>
                    {admin && <AdminControlsProduct productId={productId as number} />}
                </Box>
                <Box display="flex" alignItems="center">
                    <Box marginRight={3}>
                        <Rating name="read-only" value={rating} readOnly />
                        <Typography variant="h6">Cena {product?.price.toFixed(2)} zł</Typography>
                    </Box>

                    <AddToCartIconTooltip onClick={addToCart} fontSize="large" />
                </Box>

                <Typography marginTop={2} align="justify">
                    {product?.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductView;
