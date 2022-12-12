import React, { useEffect, useState } from "react";
import axios from "axios";

interface SubCategoryData {
    name: string;
}
const SubCategory = ({ name }: SubCategoryData) => <div className="subCategory">{name}</div>;

interface CategoryData {
    name: string;
    subCategories: Array<SubCategoryData>;
}
const Category = ({ name, subCategories }: CategoryData) => (
    <div className="category">
        <div className="name">{name}</div>
        {subCategories.length > 0 && (
            <div className="subCategories">
                {subCategories.map((subCategory: SubCategoryData, j: number) => (
                    <SubCategory key={j} name={subCategory.name} />
                ))}
            </div>
        )}
    </div>
);

const CategoriesList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, []);

    return (
        <div className="categoriesList">
            {categories.map((c: CategoryData, i: number) => (
                <Category key={i} name={c.name} subCategories={c.subCategories} />
            ))}
        </div>
    );
};

export default CategoriesList;
