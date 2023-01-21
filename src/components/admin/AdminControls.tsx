import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DB, useAppContext } from "../../App";
import { EditIconTooltip, DeleteIconTooltip } from "./IconTooltips";
import ConfirmDialog from "./ConfirmDialog";
import React from "react";

interface AdminControlsProps {
    edit: (e: React.MouseEvent) => void;
    remove: (e: React.MouseEvent) => void;
}

const AdminControls = ({ edit, remove }: AdminControlsProps) => {
    const [open, setOpen] = useState(false);
    const close = (e: React.MouseEvent) => {
        setOpen(false);
        e.stopPropagation();
    };

    return (
        <>
            <Box flexGrow={1} />
            <EditIconTooltip onClick={edit} />
            <DeleteIconTooltip
                onClick={(e) => {
                    setOpen(true);
                    e.stopPropagation();
                }}
            />

            <ConfirmDialog
                open={open}
                close={close}
                confirm={(e) => {
                    setOpen(false);
                    remove(e);
                }}
            />
        </>
    );
};

export const AdminControlsCategory = ({ categoryId }: { categoryId: number }) => {
    const { update, setUpdate, setStatus, setCategory } = useAppContext();

    const edit = (e: React.MouseEvent) => {
        setCategory(categoryId);
        setStatus("editCategory");
        e.stopPropagation();
    };

    const remove = () => {
        axios.delete(`http://${DB}/categories/${categoryId}`);
        setUpdate(update + 1);
        setCategory(undefined);
    };

    return <AdminControls edit={edit} remove={remove} />;
};

export const AdminControlsSubcategory = ({ subcategoryId }: { subcategoryId: number }) => {
    const { update, setUpdate, setStatus, setSubCategory } = useAppContext();

    const edit = (e: React.MouseEvent) => {
        setSubCategory(subcategoryId);
        setStatus("editSubCategory");
        e.stopPropagation();
    };

    const remove = () => {
        axios.delete(`http://${DB}/subcategories/${subcategoryId}`);
        setUpdate(update + 1);
        setSubCategory(undefined);
    };

    return <AdminControls edit={edit} remove={remove} />;
};

export const AdminControlsProduct = ({ productId }: { productId: number }) => {
    const { update, setUpdate, setStatus, setProduct } = useAppContext();

    const edit = (e: React.MouseEvent) => {
        setProduct(productId);
        setStatus("editProduct");
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/products/${productId}`);
        setUpdate(update + 1);
        setProduct(undefined);
    };

    return <AdminControls edit={edit} remove={remove} />;
};
