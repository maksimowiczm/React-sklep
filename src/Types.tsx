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
    category?: CategoryData;
    subCategory?: SubCategoryData;
};
