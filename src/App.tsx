import { useState, createContext, useContext } from "react";
import CategoriesList from "./components/CategoriesList";
import ProductEditView from "./components/ProductEditView";
import ProductsList from "./components/ProductsList";
import ProductView from "./components/ProductView";
import SearchBar from "./components/SearchBar";
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
                <MyEditContext.Provider value={{ edit, setEdit }}>
                    <AdminContext.Provider value={admin}>
                        <MyCategoryContext.Provider value={{ categoryId, setCategory, subCategoryId, setSubCategory }}>
                            <MyProductContext.Provider value={{ productId, setProduct }}>{jsx}</MyProductContext.Provider>
                        </MyCategoryContext.Provider>
                    </AdminContext.Provider>
                </MyEditContext.Provider>
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
            {admin && (
                <div className="add" onClick={() => setEdit("add")}>
                    Dodaj
                </div>
            )}
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
                {edit !== "none" ? <ProductEditView productId={productId} /> : productId === undefined ? <ProductsList /> : <ProductView />}
            </div>
        </>
    );
};

export default App;
