import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DB, useAppContext } from "../../App";
import { EditIconTooltip, DeleteIconTooltip } from "./IconTooltips";

const AdminControlsProduct = ({ productId }: { productId: number }) => {
    const { update, setUpdate, setStatus, setProduct } = useAppContext();

    const editAction = (e: React.MouseEvent) => {
        setProduct(productId);
        setStatus("editProduct");
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/products/${productId}`);
        setUpdate(update + 1);
        setProduct(undefined);
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

            <Dialog open={open} onClose={close}>
                <DialogTitle>Czy napewno chcesz usunąć ten produkt?</DialogTitle>
                <DialogActions>
                    <Button onClick={close}>Anuluj</Button>
                    <Button onClick={remove}>Potwierdź</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminControlsProduct;
