import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DB, useAppContext } from "../../App";
import ConfirmDialog from "./ConfirmDialog";
import { EditIconTooltip, DeleteIconTooltip } from "./IconTooltips";

const AdminControlsSubcategory = ({ subcategoryId }: { subcategoryId: number }) => {
    const { update, setUpdate, setStatus, setSubCategory } = useAppContext();

    const editAction = (e: React.MouseEvent) => {
        setSubCategory(subcategoryId);
        setStatus("editSubCategory");
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/subcategories/${subcategoryId}`);
        setUpdate(update + 1);
        setSubCategory(undefined);
        close(e);
    };

    const [open, setOpen] = useState(false);

    const close = (e: React.MouseEvent) => {
        setOpen(false);
        e.stopPropagation();
    };

    return (
        <>
            <Box flexGrow={1} />
            <EditIconTooltip onClick={editAction} />
            <DeleteIconTooltip
                onClick={(e) => {
                    setOpen(true);
                    e.stopPropagation();
                }}
            />

            <ConfirmDialog open={open} close={close} confirm={remove} />
        </>
    );
};

export default AdminControlsSubcategory;
