import { ListItem, IconButton, ListItemText, Box, Collapse, List, Typography } from "@mui/material";
import { useAppContext } from "../App";
import { BasketItem } from "../Types";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

interface RenderItemOptions {
    item: BasketItem;
    handleRemoveItem: (item: BasketItem) => void;
}

const RenderItem = ({ item, handleRemoveItem }: RenderItemOptions) => {
    const { product, quantity } = item;
    const { addOneToBasket, removeOneFromBasket } = useAppContext();

    const [count, setCount] = useState(quantity);

    return (
        <ListItem className="cart">
            <ListItemText primary={product.name} secondary={product.price} sx={{ flexGrow: 1 }} />

            <Box display="flex" justifyContent="center" alignItems="center" className="cartQuantity">
                <IconButton
                    title="Zwiększ ilość"
                    onClick={() => {
                        setCount((prev) => prev + 1);
                        addOneToBasket(product);
                    }}
                >
                    <AddIcon />
                </IconButton>

                <Typography align="center" width={30} textAlign="center" sx={{ cursor: "default" }}>
                    {count}
                </Typography>

                <IconButton
                    title="Zmniejsz ilość"
                    onClick={() => {
                        setCount((prev) => (prev - 2 > 0 ? prev - 1 : 1));
                        removeOneFromBasket(item);
                    }}
                >
                    <RemoveIcon />
                </IconButton>
            </Box>

            <IconButton title="Usuń" onClick={() => handleRemoveItem(item)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

const Basket = () => {
    const { basket, removeFromBasket } = useAppContext();

    const handleRemoveItem = (item: BasketItem) => removeFromBasket(item);

    return (
        <div>
            <Box sx={{ mt: 1 }}>
                <List>
                    <TransitionGroup>
                        {basket.map((item, i) => (
                            <Collapse key={i}>{<RenderItem item={item} handleRemoveItem={handleRemoveItem} />}</Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </Box>
        </div>
    );
};

export default Basket;
