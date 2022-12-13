import { useState } from "react";
import CategoriesList from "./components/CategoriesList";
import "./styles/style.scss";
import ProductsList from "./components/ProductsList";

const App = () => {
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [subCategoryId, setSubCategoryId] = useState<number | undefined>(undefined);
    const [productId, setProductId] = useState<number | undefined>(undefined);

    return (
        <div className="App">
            <CategoriesList
                categoryClick={(id: number) => {
                    setCategoryId(id);
                    setSubCategoryId(undefined);
                }}
                subCategoryClick={(id: number) => {
                    setSubCategoryId(id);
                    setCategoryId(undefined);
                }}
            />
            <ProductsList
                category={categoryId}
                subCategory={subCategoryId}
                productClick={(id: number) => {
                    setProductId(id);
                    console.log(id);
                }}
            />
        </div>
    );
};

export default App;
