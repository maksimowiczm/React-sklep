export interface ProductData {
    id: number;
    name: string;
    productClick: (id: number) => void;
    categoryId?: number;
    subCategoryId?: number;
}

export const Product = ({ id, name, productClick }: ProductData) => {
    return (
        <div className="product" onClick={() => productClick(id)}>
            <div className="name">{name}</div>
        </div>
    );
};

export default Product;
