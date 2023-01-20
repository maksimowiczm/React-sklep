import { ListItem, IconButton, ListItemText, Box, Collapse, List } from "@mui/material";
import { useAppContext } from "../App";
import { ProductData } from "../Types";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";

interface RenderItemOptions {
    item: ProductData;
    index: number;
    handleRemoveItem: (item: ProductData) => void;
}

function renderItem({ item, handleRemoveItem, index }: RenderItemOptions) {
    const { id, name, price } = item;

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleRemoveItem(item)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={name} secondary={price} />
        </ListItem>
    );
}

const Basket = () => {
    const { basket, removeFromBasket } = useAppContext();

    const handleRemoveItem = (item: ProductData) => removeFromBasket(item);

    return (
        <div>
            <Box sx={{ mt: 1 }}>
                <List>
                    <TransitionGroup>
                        {basket.map((item, i) => (
                            <Collapse key={i}>{renderItem({ item, handleRemoveItem, index: i })}</Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </Box>
        </div>
    );
};

export default Basket;
