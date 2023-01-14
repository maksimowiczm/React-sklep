import { useProductContext } from "../App";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface ProductData {
    id: number;
    name: string;
}

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();

    return (
        <Card sx={{ minWidth: 275 }} onClick={() => setProduct(id)} >
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Nazwa Produktu
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card >
    );

};

export default Product;
