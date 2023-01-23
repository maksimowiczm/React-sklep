import React, { useEffect, useState } from "react";
import { Stack, Button, Divider, ListItemButton, Typography, styled, Box } from "@mui/material";
import axios from "axios";
import { DB, useAppContext } from "../App";
import { SubCategoryData, CategoryData } from "../Types";
import { AdminControlsCategory, AdminControlsSubcategory } from "./admin/AdminControls";
import AddIcon from "@mui/icons-material/Add";

const CategoryListWrapper = styled("div")(({ theme }) => ({
    border: "solid 1px",
    borderColor: theme.palette.primary.main,
}));

const CategoryLabelWrapper = styled("div")(({ theme }) => ({
    ":hover": {
        color: theme.palette.success.light,
    },
}));

const CategoriesList = () => {
    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const { categoryId, setCategory, update, setStatus, admin, reset } = useAppContext();

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
                <Stack spacing={1} margin={1}>
                    <Button onClick={addCategoryAction} variant="contained" size="small" fullWidth>
                        <AddIcon />
                        <Box flexGrow={1}>
                            <Typography justifyContent="center">Dodaj Kategorię</Typography>
                        </Box>
                    </Button>
                    <Button onClick={addSubCategoryAction} variant="contained" size="small" fullWidth>
                        <AddIcon />
                        <Box flexGrow={1}>
                            <Typography justifyContent="center">Dodaj podkategorie</Typography>
                        </Box>
                    </Button>
                    <Button onClick={addProductAction} variant="contained" size="small" fullWidth>
                        <AddIcon />
                        <Box flexGrow={1}>
                            <Typography justifyContent="center">Dodaj Produkt</Typography>
                        </Box>
                    </Button>
                </Stack>
            )}

            <CategoryListWrapper>
                <CategoryLabelWrapper>
                    <Typography variant="h4" align="center" padding={1} fontWeight={600} onClick={reset} sx={{ cursor: "pointer" }}>
                        Kategorie
                    </Typography>
                </CategoryLabelWrapper>
                {categories.map(({ id, name, subCategories }: CategoryData, i: number) => (
                    <React.Fragment key={i}>
                        <CategoryLabelWrapper>
                            <ListItemButton onClick={() => setCategory(id)}>
                                <Typography color={`${categoryId === id ? "primary" : undefined}`} fontWeight={600}>
                                    {name}
                                </Typography>
                                {admin && <AdminControlsCategory categoryId={id} />}
                            </ListItemButton>
                        </CategoryLabelWrapper>

                        <SubCategoriesList subCategories={subCategories} />
                        <Divider />
                    </React.Fragment>
                ))}
            </CategoryListWrapper>
        </>
    );
};

const SubCategoryWrapper = styled("div")(({ theme }) => ({
    paddingLeft: 10,
}));

const SubCategoriesList = ({ subCategories }: { subCategories: Array<SubCategoryData> }) => {
    const { subCategoryId, admin, setSubCategory } = useAppContext();

    return (
        <>
            {subCategories.map(({ id, name }: SubCategoryData, i: number) => (
                <CategoryLabelWrapper>
                    <ListItemButton
                        key={i}
                        onClick={(e) => {
                            setSubCategory(id);
                            e.stopPropagation();
                        }}
                    >
                        <SubCategoryWrapper>
                            <Typography color={`${subCategoryId === id ? "primary" : undefined}`}>• {name}</Typography>
                        </SubCategoryWrapper>
                        {admin && <AdminControlsSubcategory subcategoryId={id} />}
                    </ListItemButton>
                </CategoryLabelWrapper>
            ))}
        </>
    );
};

export default CategoriesList;
