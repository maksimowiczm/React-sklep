import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DB, useAppContext } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
            <IconButton onClick={editAction}>
                <EditIcon />
            </IconButton>
            <IconButton
                onClick={(e) => {
                    setOpen(true);
                    e.stopPropagation();
                }}
            >
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={close}>
                <DialogTitle>Czy napewno chcesz usunąć te kategorie?</DialogTitle>
                <DialogActions>
                    <Button onClick={close}>Anuluj</Button>
                    <Button onClick={remove}>Potwierdź</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminControlsCategory;
