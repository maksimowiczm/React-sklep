import { useAdminContext, useProductContext } from "../App";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminControls from "./AdminControls";
import { ProductData } from "../Types";

export const ProductView = () => {
    const { productId } = useProductContext();
    const [product, setProduct] = useState<ProductData | undefined>(undefined);
    const admin = useAdminContext();

    const DB = process.env.REACT_APP_DB_SERVER;
    useEffect(() => {
        axios.get(`http://${DB}/products/${productId}`).then((res) => setProduct(res.data));
    }, [productId, DB]);

    return (
        <div>
            <div>Produkt:</div>
            <div className="productView">
                <div>{product?.name}</div>
                {admin && <AdminControls productId={productId as number} />}
            </div>
        </div>
    );
};

export default ProductView;
