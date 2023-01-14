import { useAdminContext, useProductContext } from "../App";
import AdminControls from "./AdminControls";
import { CategoryData } from "./Category";
import { SubCategoryData } from "./SubCategory";

export interface ProductData {
    id: number;
    name: string;
    category?: CategoryData;
    subCategory?: SubCategoryData;
}

export const Product = ({ id, name }: ProductData) => {
    const { setProduct } = useProductContext();
    const admin = useAdminContext();

    return (
        <div className="product" onClick={() => setProduct(id)}>
            <div className="name">{name}</div>
            {admin && <AdminControls productId={id} />}
        </div>
    );
};

export default Product;
