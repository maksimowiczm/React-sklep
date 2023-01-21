import { useAppContext } from "../App";
import AdminControls from "./AdminControlsProduct";
import { Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductData } from "../Types";

export const Product = ({ id, name, price }: ProductData) => {
    const { setProduct, admin, addOneToBasket } = useAppContext();

    const addToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addOneToBasket({ id, name, price });
    };

    return (
        <Card className="product" onClick={() => setProduct(id)} variant="outlined">
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
                {admin && <AdminControls productId={id} />}
                <IconButton onClick={addToCart}>
                    <AddShoppingCartIcon className="addToCart" />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
