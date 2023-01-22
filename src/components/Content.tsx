import "../styles/style.scss";

import CategoriesList from "./CategoriesList";
import ProductEditView from "./admin/crud/ProductEditView";
import ProductsList from "./ProductsList";
import ProductView from "./ProductView";

import { Grid } from "@mui/material";
import CategoryEditView from "./admin/crud/CategoryEditView";
import SubcategoryEditView from "./admin/crud/SubcategoryEditView";
import Basket from "./Basket";
import { useAppContext } from "../App";

const Content = () => {
    const { status, productId } = useAppContext();

    const view = () => {
        switch (status) {
            case "addProduct":
                return <ProductEditView />;

            case "editProduct":
                return <ProductEditView />;

            case "editCategory":
                return <CategoryEditView />;

            case "addCategory":
                return <CategoryEditView />;

            case "editSubCategory":
                return <SubcategoryEditView />;

            case "addSubCategory":
                return <SubcategoryEditView />;

            case "basket":
                return <Basket />;

            default:
                throw new Error(`Nie istnieje widok dla statusu ${status}`);
        }
    };

    const getGrid = () => {
        if (status === "none")
            return (
                <>
                    <Grid item xs={3}>
                        <CategoriesList />
                    </Grid>
                    <Grid item xs={9}>
                        {productId === undefined ? <ProductsList /> : <ProductView />}
                    </Grid>
                </>
            );

        return (
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                {view()}
            </Grid>
        );
    };

    return (
        <Grid container spacing={2} padding={2}>
            {getGrid()}
        </Grid>
    );
};

export default Content;
