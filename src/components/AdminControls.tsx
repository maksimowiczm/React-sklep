import { Button } from "@mui/material";
import axios from "axios";
import { DB, useAppContext } from "../App";

const AdminControls = ({ productId }: { productId: number }) => {
    const { update, setUpdate, setStatus, setProduct } = useAppContext();

    const editAction = (e: React.MouseEvent) => {
        setProduct(productId);
        setStatus("edit");
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/products/${productId}`);
        setUpdate(update + 1);
        setProduct(undefined);
        e.stopPropagation();
    };

    return (
        <>
            <Button onClick={editAction} size="small">
                Edit
            </Button>
            <Button onClick={remove} size="small">
                Delete
            </Button>
        </>
    );
};

export default AdminControls;
