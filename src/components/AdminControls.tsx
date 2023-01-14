import axios from "axios";
import { useUpdateContext } from "../App";

const AdminControls = ({ productId }: { productId: number }) => {
    const DB = process.env.REACT_APP_DB_SERVER;

    const { update, setUpdate } = useUpdateContext();
    const edit = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const remove = (e: React.MouseEvent) => {
        axios.delete(`http://${DB}/products/${productId}`);
        setUpdate(update + 1);
        e.stopPropagation();
    };

    return (
        <>
            <div onClick={edit}>Edytuj</div>
            <div onClick={remove}>Usuń</div>
        </>
    );
};

export default AdminControls;
