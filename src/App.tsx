import Typography from "@mui/material/Typography";
import { useState, createContext, useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import SearchBar from "./components/SearchBar";
import SortButton from "./components/SortButton";
import "./styles/style.scss";

type ProductContext = {
    productId: number | undefined;
    setProduct: (id: number) => void;
};
const MyProductContext = createContext<ProductContext>({ productId: undefined, setProduct: () => { } });
export const useProductContext = () => useContext(MyProductContext);

type CategoryContext = {
    categoryId: number | undefined;
    setCategory: (id: number) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number) => void;
};
const MyCategoryContext = createContext<CategoryContext>({ categoryId: undefined, setCategory: () => { }, subCategoryId: undefined, setSubCategory: () => { } });
export const useCategoryContext = () => useContext(MyCategoryContext);

const App = () => {
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);
    const [sortType, setSortType] = useState<"asc" | "desc">("asc");
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);

    const setStates = (category: number | undefined, subCategory: number | undefined, product: number | undefined) => {
        setCategoryId(category);
        setSubCategoryId(subCategory);
        setProductId(product);
    };

    const setCategory = (id: number) => setStates(id, undefined, undefined);
    const setSubCategory = (id: number) => setStates(undefined, id, undefined);
    const setProduct = (id: number) => setStates(undefined, undefined, id);
    const setEmpty = () => setStates(undefined, undefined, undefined);
    const setSort = () => {
        if (sortType === "asc")
            setSortType("desc")
        else
            setSortType("asc")
    }
    const setSearch = (phrase: string) => setSearchPhrase(phrase);

    const useProviders = (jsx: JSX.Element) => (
        <div className="App">
            <MyCategoryContext.Provider value={{ categoryId, setCategory, subCategoryId, setSubCategory }}>
                <MyProductContext.Provider value={{ productId, setProduct }}>{jsx}</MyProductContext.Provider>
            </MyCategoryContext.Provider>
        </div>
    );

    return useProviders(
        <>
            <nav className="header">
                <Typography onClick={setEmpty} component="legend">Sklep</Typography>
                <CategoriesList />
            </nav>
            <div className="content">
                <SearchBar setSearchPhrase={setSearch} />
                <SortButton setSortType={setSort} />
                {productId === undefined ? <ProductsList sortType={sortType} searchPhrase={searchPhrase} /> : <ProductView />}
            </div>
        </>
    );
};

export default App;
