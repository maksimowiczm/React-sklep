import { useAdminContext, useProductContext } from "../App";
import AdminControls from "./AdminControls";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ProductData } from "../Types";

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();
    const admin = useAdminContext();

    return (
        <Card onClick={() => setProduct(id)} variant="outlined">
            <CardContent sx={{ minHeight: 100 }}>
                <Typography sx={{ fontSize: 14 }} align="justify" color="text.secondary" gutterBottom>
                    Nazwa Produktu
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            {admin && (
                <CardActions>
                    <AdminControls productId={id} />
                </CardActions>
            )}
        </Card>
    );
};

export default Product;
