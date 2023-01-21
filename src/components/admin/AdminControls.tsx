import React, { useState } from "react";
import axios from "axios";

import { Status } from "../../Types";

import { DB, useAppContext } from "../../App";
import ConfirmDialog from "./ConfirmDialog";
import { EditIconTooltip, DeleteIconTooltip } from "./IconTooltips";

import { Box } from "@mui/material";

interface AdminControlsProps {
    id: number;
    item: string;
    status: Status;
    setItem: (id: number | undefined) => void;
}

const AdminControls = ({ id, item, status, setItem }: AdminControlsProps) => {
    const { setStatus, setUpdate, update } = useAppContext();
    const [open, setOpen] = useState(false);
    const close = (e: React.MouseEvent) => {
        setOpen(false);
        e.stopPropagation();
    };

    const edit = (e: React.MouseEvent) => {
        setItem(id);
        setStatus(status);
        e.stopPropagation();
    };

    const remove = () => {
        axios.delete(`http://${DB}/${item}/${id}`);
        setUpdate(update + 1);
        setItem(undefined);
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
                    remove();
                    e.stopPropagation();
                }}
            />
        </>
    );
};

export const AdminControlsCategory = ({ categoryId }: { categoryId: number }) => {
    const { setCategory } = useAppContext();
    return <AdminControls id={categoryId} item={"categories"} setItem={setCategory} status="editCategory" />;
};

export const AdminControlsSubcategory = ({ subcategoryId }: { subcategoryId: number }) => {
    const { setSubCategory } = useAppContext();
    return <AdminControls id={subcategoryId} item={"subcategories"} setItem={setSubCategory} status="editSubCategory" />;
};

export const AdminControlsProduct = ({ productId }: { productId: number }) => {
    const { setProduct } = useAppContext();
    return <AdminControls id={productId} item={"products"} setItem={setProduct} status="editProduct" />;
};
