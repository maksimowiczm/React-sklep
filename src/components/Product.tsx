import { useAppContext } from "../App";
import { AdminControlsProduct } from "./admin/AdminControls";
import { Box, Card, CardActions, CardContent, Typography, CardActionArea } from "@mui/material";
import { ProductData } from "../Types";
import { AddToCartIconTooltip } from "./admin/IconTooltips";

export const Product = ({ id, name, price }: ProductData) => {
    const { setProduct, admin, addOneToBasket } = useAppContext();

    const addToCart = (e: React.MouseEvent) => {
        addOneToBasket({ id, name, price });
        e.stopPropagation();
    };

    return (
        <Card onClick={() => setProduct(id)} variant="outlined">
            <CardActionArea>
                <CardContent sx={{ minHeight: 200 }}>
                    <Typography sx={{ fontSize: 14 }} align="justify" color="text.secondary">
                        Nazwa Produktu
                    </Typography>
                    <Typography variant="h5" component="div" gutterBottom>
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} align="justify" color="text.secondary">
                        Cena
                    </Typography>
                    <Typography variant="h5" component="div">
                        {price.toFixed(2)} zł
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box flexGrow={1} />
                    {admin && <AdminControlsProduct productId={id} />}
                    <AddToCartIconTooltip onClick={addToCart} />
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default Product;
