import { useEffect, useState } from "react";

import { DB, useAppContext } from "../App";
import { BasketItem } from "../Types";

import { ListItem, IconButton, ListItemText, Box, Collapse, List, Typography, Button, Alert, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { DeleteIconTooltip } from "./admin/IconTooltips";

const BasketWrapper = styled("div")(({ theme }) => ({
    width: "50vw",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
}));

const Basket = () => {
    const { basket, removeFromBasket, clearBasket, user, itemsInBasket } = useAppContext();

    const [ordered, setOrdered] = useState<boolean>(false);
    const [basketVisible, setBasketVisible] = useState<boolean>(basket.length > 0);

    const handleRemoveItem = (item: BasketItem) => removeFromBasket(item);
    const handleOrder = () => {
        axios.post(`http://${DB}/orders`, { order: basket, user: user });

        setOrdered(true);

        // Znikanie za 3 sekundy
        setTimeout(() => {
            setOrdered(false);
            setBasketVisible(false);
            clearBasket();
        }, 3000);
    };

    useEffect(() => {
        if (itemsInBasket === 0) {
            setOrdered(false);
            setBasketVisible(false);
        }
    }, [itemsInBasket]);

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
                        <Box marginBottom={2} display="flex" justifyContent="space-between" width="100%">
                            <Typography variant="h4">Koszyk</Typography>
                            <IconButton sx={{ borderRadius: "10px" }} onClick={clearBasket} color="error">
                                <DeleteIcon sx={{ marginRight: 1 }} />
                                Wyczyść koszyk
                            </IconButton>
                        </Box>

                        <BasketWrapper>
                            <List className="cartItems" disablePadding>
                                <TransitionGroup>
                                    {basket.map((item, i) => {
                                        const BasketItemWrapper = styled("div")(({ theme }) => ({
                                            backgroundColor: i % 2 !== 0 ? theme.basket.odd : theme.basket.even,
                                        }));

                                        return (
                                            <Collapse key={i}>
                                                <BasketItemWrapper>{<RenderItem item={item} handleRemoveItem={handleRemoveItem} />}</BasketItemWrapper>
                                            </Collapse>
                                        );
                                    })}
                                </TransitionGroup>
                            </List>
                        </BasketWrapper>

                        <Button variant="contained" sx={{ margin: 2 }} onClick={handleOrder}>
                            <Typography variant="h6">Zamów</Typography>
                        </Button>
                    </Box>
                ) : (
                    <Typography variant="h4" align="center" color="info" marginTop={10}>
                        Koszyk pusty
                    </Typography>
                )}
            </Collapse>
        </>
    );
};

interface RenderItemOptions {
    item: BasketItem;
    handleRemoveItem: (item: BasketItem) => void;
}

const RenderItem = ({ item, handleRemoveItem }: RenderItemOptions) => {
    const { product } = item;
    const { setProduct } = useAppContext();

    return (
        <ListItem>
            <ListItemText
                primary={product.name}
                secondary={`${product.price.toFixed(2)} zł`}
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => setProduct(product.id)}
            />
            <ItemCounter item={item} />
            <Box marginLeft={1}>
                <DeleteIconTooltip onClick={() => handleRemoveItem(item)} />
            </Box>
        </ListItem>
    );
};

const QuantityWrapper = styled("div")(({ theme }) => ({
    borderRadius: "10px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
}));

const ItemCounter = ({ item }: { item: BasketItem }) => {
    const { product, quantity } = item;

    const { addOneToBasket, removeOneFromBasket } = useAppContext();
    const [count, setCount] = useState(quantity);

    return (
        <QuantityWrapper>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Tooltip title="Zwiększ ilość" sx={{ borderRadius: "10px 0 0 10px" }}>
                    <IconButton
                        onClick={() => {
                            setCount((prev) => prev + 1);
                            addOneToBasket(product);
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>

                <Typography align="center" width={30} textAlign="center" sx={{ cursor: "default" }}>
                    {count}
                </Typography>

                <Tooltip title="Zmniejsz ilość" sx={{ borderRadius: "0 10px 10px 0" }}>
                    <IconButton
                        onClick={() => {
                            setCount((prev) => (prev - 2 > 0 ? prev - 1 : 1));
                            removeOneFromBasket(item);
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </QuantityWrapper>
    );
};

export default Basket;
