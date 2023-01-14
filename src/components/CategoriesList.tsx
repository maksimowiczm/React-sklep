import React, { useEffect, useState } from "react";
import { Divider, ListItemButton, Typography } from "@mui/material";
import axios from "axios";
import { useCategoryContext } from "../App";
import { SubCategoryData, CategoryData } from "../Types";

const SubCategoriesList = ({ subCategories }: { subCategories: Array<SubCategoryData> }) => {
    const { subCategoryId, setSubCategory } = useCategoryContext();

    return (
        <>
            {subCategories.map(({ id, name }: SubCategoryData, i: number) => (
                <ListItemButton
                    key={i}
                    onClick={(e) => {
                        setSubCategory(id);
                        e.stopPropagation();
                    }}
                    className={`subCategory name ${subCategoryId === id ? "active" : ""}`}
                    sx={{ marginLeft: 1 }}
                >
                    - {name}
                </ListItemButton>
            ))}
        </>
    );
};

const CategoriesList = () => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [DB]);

    const { categoryId, setCategory } = useCategoryContext();

    return (
        <>
            <Divider />
            {categories.map(({ id, name, subCategories }: CategoryData, i: number) => (
                <React.Fragment key={i}>
                    <ListItemButton className={`name${categoryId === id ? " active" : ""}`} onClick={() => setCategory(id)}>
                        {name}
                    </ListItemButton>
                    <SubCategoriesList subCategories={subCategories} />
                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};

export default CategoriesList;
