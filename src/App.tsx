import { useState, createContext, useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import SearchBar from "./components/SearchBar";
import "./styles/style.scss";

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

    const setStates = (category: number | undefined, subCategory: number | undefined, product: number | undefined) => {
        setCategoryId(category);
        setSubCategoryId(subCategory);
        setProductId(product);
    };

    const setCategory = (id: number) => setStates(id, undefined, undefined);
    const setSubCategory = (id: number) => setStates(undefined, id, undefined);
    const setProduct = (id: number | undefined) => setStates(undefined, undefined, id);
    const setEmpty = () => setStates(undefined, undefined, undefined);

    const useProviders = (jsx: JSX.Element) => (
        <div className="App">
            <MyUpdateContext.Provider value={{ update, setUpdate }}>
                <AdminContext.Provider value={admin}>
                    <MyCategoryContext.Provider value={{ categoryId, setCategory, subCategoryId, setSubCategory }}>
                        <MyProductContext.Provider value={{ productId, setProduct }}>{jsx}</MyProductContext.Provider>
                    </MyCategoryContext.Provider>
                </AdminContext.Provider>
            </MyUpdateContext.Provider>
        </div>
    );

    const AdminButton = () => (
        <>
            <div
                className={`admin ${admin ? " active" : ""}`}
                onClick={() => {
                    setAdmin(!admin);
                }}
            >
                ADMIN
            </div>
            {admin && <div>Dodaj</div>}
        </>
    );

    return useProviders(
        <>
            <nav className="header">
                <div className="home" onClick={setEmpty}>
                    Sklep
                </div>
                <AdminButton />
                <CategoriesList />
            </nav>
            <div className="content">
                <SearchBar />
                {productId === undefined ? <ProductsList /> : <ProductView />}
            </div>
        </>
    );
};

export default App;
