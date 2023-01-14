import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryData, Category } from "./Category";
import { Divider } from "@mui/material";

const CategoriesList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [DB]);

    return (
        <>
            <Divider />
            {categories.map((c: CategoryData, i: number) => (
                <>
                    <Category id={c.id} name={c.name} subCategories={c.subCategories} />
                    <Divider />
                </>
            ))}
        </>
    );
};

export default CategoriesList;
