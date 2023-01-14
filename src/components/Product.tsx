import { useAdminContext, useProductContext } from "../App";
import AdminControls from "./AdminControls";
import { CategoryData } from "./Category";
import { SubCategoryData } from "./SubCategory";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";

export interface ProductData {
    id: number;
    name: string;
    category?: CategoryData;
    subCategory?: SubCategoryData;
}

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();
    const admin = useAdminContext();

    return (
        <Card sx={{ minWidth: 275 }} onClick={() => setProduct(id)}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Nazwa Produktu
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                {admin && <AdminControls productId={id} />}
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    );
};

export default Product;
