import React, { useEffect, useState } from "react";
import { Divider, ListItemButton } from "@mui/material";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { SubCategoryData, CategoryData } from "../Types";
import AdminControls from "./AdminControlsCategory";

const CategoriesList = () => {
    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const { categoryId, setCategory, update, setStatus, admin } = useAppContext();

    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [update]);


    const addAction = (e: React.MouseEvent) => {
        setStatus("addCategory");
        e.stopPropagation();
    };

    return (
        <>
            {admin && (
                <div onClick={addAction}>Dodaj kategorie</div>
            )}
            <Divider />
            {categories.map(({ id, name, subCategories }: CategoryData, i: number) => (
                <React.Fragment key={i}>
                    <ListItemButton className={`name${categoryId === id ? " active" : ""}`} onClick={() => setCategory(id)}>
                        {name}
                    </ListItemButton>

                    {admin && (
                        <ListItemButton>
                            <AdminControls categoryId={id} />
                        </ListItemButton>
                    )}

                    <SubCategoriesList subCategories={subCategories} />
                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};

const SubCategoriesList = ({ subCategories }: { subCategories: Array<SubCategoryData> }) => {
    const { subCategoryId, setSubCategory } = useAppContext();

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

export default CategoriesList;
