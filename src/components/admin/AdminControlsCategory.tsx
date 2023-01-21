import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DB, useAppContext } from "../../App";
import { EditIconTooltip, DeleteIconTooltip } from "./IconTooltips";
import ConfirmDialog from "./ConfirmDialog";

const AdminControlsCategory = ({ categoryId }: { categoryId: number }) => {
    const { update, setUpdate, setStatus, setCategory } = useAppContext();

    const editAction = (e: React.MouseEvent) => {
        setCategory(categoryId);
        setStatus("editCategory");
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/categories/${categoryId}`);
        setUpdate(update + 1);
        setCategory(undefined);
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

export default AdminControlsCategory;
