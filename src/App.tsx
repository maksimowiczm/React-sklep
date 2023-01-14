import { useState, useContext } from "react";
import "./styles/style.scss";

import { MyAppContext } from "./Context";
import { Status, SortType } from "./Types";

import MyAppBar from "./components/AppBar";
import CategoriesList from "./components/CategoriesList";
import ProductEditView from "./components/ProductEditView";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";

import { Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FloatingButton from "./components/FloatingButton";

export const DB = process.env.REACT_APP_DB_SERVER;

export const useAppContext = () => useContext(MyAppContext);

const App = () => {
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [admin, setAdmin] = useState<boolean>(true);
    const [update, setUpdate] = useState<number>(0);
    const [status, setStatus] = useState<Status>("none");
    const [sortType, setSortType] = useState<SortType>({ prop: "name", direction: "asc" });
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);

    const useProviders = (jsx: JSX.Element) => (
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

                update,
                setUpdate,

                status,
                setStatus,

                reset: setEmpty,

                searchPhrase,
                setSearchPhrase,

                sortType,
                setSortType,
            }}
        >
            {jsx}
        </MyAppContext.Provider>
    );

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const useDarkTheme = (jsx: JSX.Element) => (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {jsx}
        </ThemeProvider>
    );

    const setStates = (category: number | undefined, subCategory: number | undefined, product: number | undefined) => {
        setCategoryId(category);
        setSubCategoryId(subCategory);
        setProductId(product);
        setStatus("none");
    };

    const setCategory = (id: number) => setStates(id, undefined, undefined);
    const setSubCategory = (id: number) => setStates(undefined, id, undefined);
    const setProduct = (id: number | undefined) => setStates(undefined, undefined, id);
    const setEmpty = () => setStates(undefined, undefined, undefined);

    return useProviders(
        useDarkTheme(
            <>
                <MyAppBar />
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={3}>
                        {status === "none" && <CategoriesList />}
                    </Grid>
                    <Grid item xs={9}>
                        {status !== "none" ? <ProductEditView /> : <>{productId === undefined ? <ProductsList /> : <ProductView />}</>}
                    </Grid>
                </Grid>
                {productId === undefined && status === "none" && <FloatingButton />}
            </>
        )
    );
};

export default App;
