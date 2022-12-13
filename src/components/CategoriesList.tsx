import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryData, Category } from "./Category";

const CategoriesList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [DB]);

    return (
        <div className="categoriesList">
            {categories.map((c: CategoryData, i: number) => (
                <Category key={i} id={c.id} name={c.name} subCategories={c.subCategories} />
            ))}
        </div>
    );
};

export default CategoriesList;
