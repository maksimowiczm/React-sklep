import { useAdminContext, useProductContext } from "../App";
import AdminControls from "./AdminControls";

export interface ProductData {
    id: number;
    name: string;
}

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();
    const admin = useAdminContext();

    return (
        <div className="product" onClick={() => setProduct(id)}>
            <div className="name">{name}</div>
            {admin && <AdminControls />}
        </div>
    );
};

export default Product;
