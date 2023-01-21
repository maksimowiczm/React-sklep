export type CategoryData = {
    id: number;
    name: string;
    subCategories: Array<SubCategoryData>;
};

export type SubCategoryData = {
    id: number;
    name: string;
};

export type ProductData = {
    id: number;
    name: string;
    price: number;
    category?: CategoryData;
    subCategory?: SubCategoryData;
};

export type SortType = {
    prop: "name" | "price";
    direction: "asc" | "desc";
};

export type Status = "editProduct" | "addProduct" | "editCategory" | "addCategory" | "editSubCategory" | "addSubCategory" | "none" | "basket";

export type BasketItem = {
    product: ProductData;
    quantity: number;
};
