import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryData, Category } from "./Category";

interface CategoriesListData {
    categoryClick: (id: number) => void;
    subCategoryClick: (id: number) => void;
}

const CategoriesList = ({ categoryClick, subCategoryClick }: CategoriesListData) => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [DB]);

    return (
        <div className="categoriesList">
            {categories.map((c: CategoryData, i: number) => (
                <Category key={i} id={c.id} name={c.name} subCategories={c.subCategories} categoryClick={categoryClick} subCategoryClick={subCategoryClick} />
            ))}
        </div>
    );
};

export default CategoriesList;
