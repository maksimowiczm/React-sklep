import { useProductContext } from "../App";
import { useState, useEffect } from "react";
import { ProductData } from "./Product";
import axios from "axios";

export const ProductView = () => {
    const { productId } = useProductContext();
    const [product, setProduct] = useState<ProductData | undefined>(undefined);

    const DB = process.env.REACT_APP_DB_SERVER;
    useEffect(() => {
        axios.get(`http://${DB}/products/${productId}`).then((res) => setProduct(res.data));
    }, [productId, DB]);

    return (
        <div>
            <div>Produkt:</div>
            <div className="productView">
                <div>{product?.name}</div>
            </div>
        </div>
    );
};

export default ProductView;
