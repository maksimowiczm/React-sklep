import { Grid } from "@mui/material";
import { useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CategoriesList from "./components/CategoriesList";
import ProductEditView from "./components/ProductEditView";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import "./styles/style.scss";
import { MyAppContext } from "./Context";
import MyAppBar from "./components/AppBar";

export const DB = process.env.REACT_APP_DB_SERVER;

export const useAppContext = () => useContext(MyAppContext);

const App = () => {
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [admin, setAdmin] = useState<boolean>(true);
    const [update, setUpdate] = useState<number>(0);
    const [status, setStatus] = useState<"edit" | "add" | "none">("none");
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");
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
                setSearchPhrase,
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
    const setSort = () => {
        if (sortType === "asc") setSortType("desc");
        else setSortType("asc");
    };

    // TODO
    // sort button
    // wczyszczenie filtrów button

    return useProviders(
        useDarkTheme(
            <>
                <MyAppBar />
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={3}>
                        {status === "none" && <CategoriesList />}
                    </Grid>
                    <Grid item xs={9}>
                        {status !== "none" ? (
                            <ProductEditView />
                        ) : (
                            <>{productId === undefined ? <ProductsList sortType={sortType} searchPhrase={searchPhrase} /> : <ProductView />}</>
                        )}
                    </Grid>
                </Grid>
            </>
        )
    );
};

export default App;
