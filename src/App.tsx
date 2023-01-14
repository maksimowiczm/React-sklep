import { Grid, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CategoriesList from "./components/CategoriesList";
import ProductEditView from "./components/ProductEditView";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import SearchBar from "./components/SearchBar";
import SortButton from "./components/SortButton";
import "./styles/style.scss";
import { MyAppContext } from "./Context";

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
            value={{ subCategoryId, categoryId, productId, admin, update, status, setSubCategory, setCategory, setProduct, setUpdate, setStatus }}
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

    const AdminButton = () => {
        if (status !== "none") return <></>;

        return (
            <>
                <div
                    className={`admin ${admin ? " active" : ""}`}
                    onClick={() => {
                        setAdmin(!admin);
                    }}
                >
                    ADMIN
                </div>
                {admin && (
                    <div
                        className="add"
                        onClick={() => {
                            setProduct(undefined);
                            setStatus("add");
                        }}
                    >
                        Dodaj
                    </div>
                )}
            </>
        );
    };

    return useProviders(
        useDarkTheme(
            <>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <nav className="header">
                            <div className="home" onClick={setEmpty}>
                                <Typography onClick={setEmpty} component="legend" align="center" padding={2}>
                                    Sklep
                                </Typography>
                            </div>
                            {status === "none" && <CategoriesList />}
                            <AdminButton />
                        </nav>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="content">
                            {status !== "none" ? (
                                <ProductEditView />
                            ) : (
                                <>
                                    <SearchBar setSearchPhrase={setSearchPhrase.bind(this)} />
                                    <SortButton setSortType={setSort} />
                                    {productId === undefined ? <ProductsList sortType={sortType} searchPhrase={searchPhrase} /> : <ProductView />}
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    );
};

export default App;
