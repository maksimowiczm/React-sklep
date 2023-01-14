import { Typography } from "@mui/material";
import { useState, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CategoriesList from "./components/CategoriesList";
import ProductEditView from "./components/ProductEditView";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import SearchBar from "./components/SearchBar";
import SortButton from "./components/SortButton";
import "./styles/style.scss";

export const DB = process.env.REACT_APP_DB_SERVER;
type ProductContext = {
    productId: number | undefined;
    setProduct: (id: number | undefined) => void;
};
const MyProductContext = createContext<ProductContext>({ productId: undefined, setProduct: () => {} });
export const useProductContext = () => useContext(MyProductContext);

type CategoryContext = {
    categoryId: number | undefined;
    setCategory: (id: number) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number) => void;
};
const MyCategoryContext = createContext<CategoryContext>({ categoryId: undefined, setCategory: () => {}, subCategoryId: undefined, setSubCategory: () => {} });
export const useCategoryContext = () => useContext(MyCategoryContext);

const AdminContext = createContext<boolean>(false);
export const useAdminContext = () => useContext(AdminContext);

type EditContext = {
    edit: "edit" | "add" | "none";
    setEdit: (edit: "edit" | "add" | "none") => void;
};
const MyEditContext = createContext<EditContext>({ edit: "none", setEdit: () => {} });
export const useEditContext = () => useContext(MyEditContext);

type UpdateContext = {
    update: number;
    setUpdate: (next: number) => void;
};
const MyUpdateContext = createContext<UpdateContext>({ update: 0, setUpdate: () => {} }); // XD
export const useUpdateContext = () => useContext(MyUpdateContext);

const App = () => {
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [admin, setAdmin] = useState<boolean>(true);
    const [update, setUpdate] = useState<number>(0);
    const [edit, setEdit] = useState<"edit" | "add" | "none">("none");
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);

    const setStates = (category: number | undefined, subCategory: number | undefined, product: number | undefined) => {
        setCategoryId(category);
        setSubCategoryId(subCategory);
        setProductId(product);
        setEdit("none");
    };

    const setCategory = (id: number) => setStates(id, undefined, undefined);
    const setSubCategory = (id: number) => setStates(undefined, id, undefined);
    const setProduct = (id: number | undefined) => setStates(undefined, undefined, id);
    const setEmpty = () => setStates(undefined, undefined, undefined);
    const setSort = () => {
        if (sortType === "asc") setSortType("desc");
        else setSortType("asc");
    };
    const setSearch = (phrase: string) => setSearchPhrase(phrase);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const useDarkTheme = (jsx: JSX.Element) => (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {jsx}
            </ThemeProvider>
        </div>
    );

    const useProviders = (jsx: JSX.Element) =>
        useDarkTheme(
            <MyUpdateContext.Provider value={{ update, setUpdate }}>
                <MyEditContext.Provider value={{ edit, setEdit }}>
                    <AdminContext.Provider value={admin}>
                        <MyCategoryContext.Provider value={{ categoryId, setCategory, subCategoryId, setSubCategory }}>
                            <MyProductContext.Provider value={{ productId, setProduct }}>{jsx}</MyProductContext.Provider>
                        </MyCategoryContext.Provider>
                    </AdminContext.Provider>
                </MyEditContext.Provider>
            </MyUpdateContext.Provider>
        );

    const AdminButton = () => {
        if (edit === "none")
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
                                setEdit("add");
                            }}
                        >
                            Dodaj
                        </div>
                    )}
                </>
            );

        return <></>;
    };

    return useProviders(
        <>
            <nav className="header">
                <div className="home" onClick={setEmpty}>
                    <Typography onClick={setEmpty} component="legend">
                        Sklep
                    </Typography>
                </div>
                <AdminButton />
                {edit === "none" && <CategoriesList />}
            </nav>
            <div className="content">
                {edit !== "none" ? (
                    <ProductEditView />
                ) : (
                    <>
                        <SearchBar setSearchPhrase={setSearch} />
                        <SortButton setSortType={setSort} />
                        {productId === undefined ? <ProductsList sortType={sortType} searchPhrase={searchPhrase} /> : <ProductView />}
                    </>
                )}
            </div>
        </>
    );
};

export default App;
