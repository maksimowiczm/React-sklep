import { useProductContext } from "../App";

export interface ProductData {
    id: number;
    name: string;
}

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();
    return (
        <div className="product" onClick={() => setProduct(id)}>
            <div className="name">{name}</div>
        </div>
    );
};

export default Product;
