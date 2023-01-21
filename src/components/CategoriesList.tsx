import React, { useEffect, useState } from "react";
import { Box, Button, Divider, ListItemButton } from "@mui/material";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { SubCategoryData, CategoryData } from "../Types";
import { AdminControlsCategory, AdminControlsSubcategory } from "./admin/AdminControls";
import AddIcon from "@mui/icons-material/Add";

const CategoriesList = () => {
    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const { categoryId, setCategory, update, setStatus, admin } = useAppContext();

    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
    }, [update]);

    const addCategoryAction = (e: React.MouseEvent) => {
        setStatus("addCategory");
        e.stopPropagation();
    };
    const addSubCategoryAction = (e: React.MouseEvent) => {
        setStatus("addSubCategory");
        e.stopPropagation();
    };
    const addProductAction = (e: React.MouseEvent) => {
        setStatus("addProduct");
        e.stopPropagation();
    };

    return (
        <>
            {admin && (
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Button onClick={addCategoryAction}>
                        <AddIcon />
                        Dodaj Kategorię
                    </Button>
                    <Button onClick={addSubCategoryAction}>
                        <AddIcon />
                        Dodaj podkategorie
                    </Button>
                    <Button onClick={addProductAction}>
                        <AddIcon />
                        Dodaj Produkt
                    </Button>
                </Box>
            )}

            <Divider />
            {categories.map(({ id, name, subCategories }: CategoryData, i: number) => (
                <React.Fragment key={i}>
                    <ListItemButton className={`name${categoryId === id ? " active" : ""}`} onClick={() => setCategory(id)}>
                        {name}
                        {admin && <AdminControlsCategory categoryId={id} />}
                    </ListItemButton>

                    <SubCategoriesList subCategories={subCategories} />
                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};

const SubCategoriesList = ({ subCategories }: { subCategories: Array<SubCategoryData> }) => {
    const { subCategoryId, admin, setSubCategory } = useAppContext();

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
                    {admin && <AdminControlsSubcategory subcategoryId={id} />}
                </ListItemButton>
            ))}
        </>
    );
};

export default CategoriesList;
