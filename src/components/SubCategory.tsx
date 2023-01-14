import { useCategoryContext } from "../App";

export interface SubCategoryData {
    id: number;
    name: string;
}

export const SubCategory = ({ id, name }: SubCategoryData) => {
    const { subCategoryId } = useCategoryContext();

    return <div className={`subCategory name ${subCategoryId === id ? "active" : ""}`}>{name}</div>;
};

export default SubCategory;
