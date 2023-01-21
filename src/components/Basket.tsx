import { useState } from "react";

import { DB, useAppContext } from "../App";
import { BasketItem } from "../Types";

import { ListItem, IconButton, ListItemText, Box, Collapse, List, Typography, Button, Alert } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

interface RenderItemOptions {
    item: BasketItem;
    handleRemoveItem: (item: BasketItem) => void;
}

const RenderItem = ({ item, handleRemoveItem }: RenderItemOptions) => {
    const { product, quantity } = item;
    const { addOneToBasket, removeOneFromBasket } = useAppContext();

    const [count, setCount] = useState(quantity);

    return (
        <ListItem>
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
    const { basket, removeFromBasket, clearBasket, user } = useAppContext();

    const [ordered, setOrdered] = useState<boolean>(false);
    const [basketVisible, setBasketVisible] = useState<boolean>(basket.length > 0);

    const handleRemoveItem = (item: BasketItem) => removeFromBasket(item);
    const handleOrder = () => {
        axios.post(`http://${DB}/orders`, { order: basket, user: user });
        clearBasket();

        setOrdered(true);

        // Znikanie za 3 sekundy
        setTimeout(() => {
            setOrdered(false);
            setBasketVisible(false);
        }, 3000);
    };

    return (
        <>
            <Box position="absolute" top="0" padding={2} height="100vh" width="100vw" display="flex" flexDirection="column" alignItems="center" zIndex={-1}>
                <Box flexGrow={1} />
                <Collapse in={ordered} sx={{ width: "100%" }}>
                    <Alert variant="outlined" sx={{ mb: 2 }}>
                        Zamówienie złożone
                    </Alert>
                </Collapse>
            </Box>

            <Collapse in={!ordered}>
                {basketVisible ? (
                    <Box className="cart" display="flex" flexDirection="column" alignItems="center">
                        <List className="cartItems" disablePadding>
                            <TransitionGroup>
                                {basket.map((item, i) => (
                                    <Collapse key={i} sx={{ backgroundColor: i % 2 !== 0 ? "#333" : "" }}>
                                        {<RenderItem item={item} handleRemoveItem={handleRemoveItem} />}
                                    </Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                        <Button variant="contained" sx={{ margin: 2, color: "#333", fontWeight: 500 }} color="success" onClick={handleOrder}>
                            Zamów
                        </Button>
                    </Box>
                ) : (
                    <Typography variant="h4" align="center" className="empty" marginTop={10}>
                        Koszyk pusty
                    </Typography>
                )}
            </Collapse>
        </>
    );
};

export default Basket;
