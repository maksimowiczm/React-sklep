import { useState, useContext, useEffect } from "react";
import "./styles/style.scss";

import { MyAppContext } from "./Context";
import { Status, SortType, ProductData, BasketItem } from "./Types";

import MyAppBar from "./components/AppBar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FloatingButton from "./components/FloatingButton";
import Content from "./components/Content";

import { Button } from "@mui/material";

export const DB = process.env.REACT_APP_DB_SERVER;

export const useAppContext = () => useContext(MyAppContext);

const UseDarkTheme = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    const darkTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Button
                onClick={() => {
                    if (theme === "dark") setTheme("light");
                    else setTheme("dark");
                }}
            >
                theme
            </Button>
            {children}
        </ThemeProvider>
    );
};

const App = () => {
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [admin, setAdmin] = useState<boolean>(false);
    const [update, setUpdate] = useState<number>(0);
    const [status, setStatus] = useState<Status>("none");
    const [sortType, setSortType] = useState<SortType>({ prop: "name", direction: "asc" });
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);
    const [basket, setBasket] = useState<Array<BasketItem>>([]);
    const [itemsInBasket, setItemsInBasket] = useState<number>(0);
    const [basketLoaded, setBasketLoaded] = useState<boolean>(false);
    const [user, setUser] = useState<string | undefined>(undefined);

    // Wczytywanie koszyka z localstorage
    useEffect(() => {
        if (localStorage.getItem("basket") === null) {
            localStorage.setItem("basket", JSON.stringify(basket));
            localStorage.setItem("itemsInBasket", itemsInBasket.toString());
        }

        if (basketLoaded) {
            localStorage.setItem("basket", JSON.stringify(basket));
            localStorage.setItem("itemsInBasket", itemsInBasket.toString());
        } else {
            let basketJson = localStorage.getItem("basket");
            let itemsInBasketJson = localStorage.getItem("itemsInBasket");

            if (basketJson && itemsInBasketJson) {
                let cookieBasket = JSON.parse(basketJson);
                let cookieItemsInBasket = Number(itemsInBasketJson);

                setBasket(cookieBasket);
                setItemsInBasket(cookieItemsInBasket);
                setBasketLoaded(true);
            }
        }
    }, [itemsInBasket, basket, basketLoaded]);

    // Inicjalizacja kontekstu aplikacji
    const useProviders = (children: React.ReactNode) => (
        <MyAppContext.Provider
            value={{
                subCategoryId,
                setSubCategory,

                categoryId,
                setCategory,

                productId,
                setProduct,

                admin,
                switchAdmin: () => setAdmin(!admin),

                user,
                setUser,

                update,
                setUpdate,

                status,
                setStatus,

                reset: setEmpty,

                searchPhrase,
                setSearchPhrase: (e) => {
                    setSearchPhrase(e);
                    setEmpty();
                },

                sortType,
                setSortType,

                basket,
                itemsInBasket,
                addOneToBasket: (product: ProductData) => {
                    let newBasket = basket;
                    let item = newBasket.find((p) => p.product.id === product.id);

                    setItemsInBasket((prev) => prev + 1);
                    if (item === undefined) {
                        setBasket((prev) => [{ product, quantity: 1 }, ...prev]);
                        return;
                    }

                    item!!.quantity++;
                    setBasket(newBasket);
                },
                removeOneFromBasket: ({ product }: BasketItem) => {
                    let newBasket = basket;
                    let item = newBasket.find((p) => p.product.id === product.id)!!;
                    if (item.quantity <= 1) return;

                    setItemsInBasket((prev) => prev - 1);
                    item.quantity--;
                    setBasket(newBasket);
                },
                removeFromBasket: ({ product }: BasketItem) => {
                    let newBasket = basket;
                    let item = newBasket.find((p) => p.product.id === product.id)!!;
                    setItemsInBasket((prev) => prev - item.quantity);
                    setBasket((prev) => prev.filter((item) => item.product.id !== product.id));
                },
                clearBasket: () => {
                    setBasket([]);
                    setItemsInBasket(0);
                },
            }}
        >
            {children}
        </MyAppContext.Provider>
    );

    const setStates = (category: number | undefined, subCategory: number | undefined, product: number | undefined) => {
        setCategoryId(category);
        setSubCategoryId(subCategory);
        setProductId(product);
        setStatus("none");
    };
    const setCategory = (id: number | undefined) => setStates(id, undefined, undefined);
    const setSubCategory = (id: number | undefined) => setStates(undefined, id, undefined);
    const setProduct = (id: number | undefined) => setStates(undefined, undefined, id);
    const setEmpty = () => setStates(undefined, undefined, undefined);

    return useProviders(
        <>
            <UseDarkTheme>
                <MyAppBar />
                <Content />
                {productId === undefined && status === "none" && <FloatingButton />}
            </UseDarkTheme>
        </>
    );
};

export default App;
