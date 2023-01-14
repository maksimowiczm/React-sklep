import axios from "axios";
import { useEditContext, useProductContext, useUpdateContext } from "../App";

const AdminControls = ({ productId }: { productId: number }) => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const { update, setUpdate } = useUpdateContext();
    const { setEdit } = useEditContext();
    const { setProduct } = useProductContext();

    const editAction = (e: React.MouseEvent) => {
        setProduct(productId);
        setEdit("edit");
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
            <div onClick={editAction}>Edytuj</div>
            <div onClick={remove}>Usuń</div>
        </>
    );
};

export default AdminControls;
