import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const ConfirmDialog = ({ open, close, confirm }: { open: boolean; close: (e: React.MouseEvent) => void; confirm: (e: React.MouseEvent) => void }) => (
    <Dialog open={open} onClose={close}>
        <DialogTitle>Czy napewno chcesz usunąć te kategorie?</DialogTitle>
        <DialogActions>
            <Button onClick={close}>Anuluj</Button>
            <Button onClick={confirm}>Potwierdź</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;
