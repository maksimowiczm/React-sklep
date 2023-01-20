import { useAppContext } from "../App";
import AdminControls from "./AdminControlsProduct";
import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductData } from "../Types";

export const Product = ({ id, name, price }: ProductData) => {
    const { setProduct, admin } = useAppContext();

    const addToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Card className="product" onClick={() => setProduct(id)} variant="outlined">
            <CardContent sx={{ minHeight: 200 }}>
                <Typography sx={{ fontSize: 14 }} align="justify" color="text.secondary" gutterBottom>
                    Nazwa Produktu
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} align="justify" color="text.secondary" gutterBottom>
                    Cena
                </Typography>
                <Typography variant="h4" component="div">
                    {price.toFixed(2)}zł
                </Typography>
            </CardContent>
            {admin && (
                <CardActions>
                    <AdminControls productId={id} />
                    <IconButton onClick={addToCart}>
                        <AddShoppingCartIcon className="addToCart" />
                    </IconButton>
                </CardActions>
            )}
        </Card>
    );
};

export default Product;
