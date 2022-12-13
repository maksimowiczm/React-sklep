export interface SubCategoryData {
    id: number;
    name: string;
}

export const SubCategory = ({ id, name }: SubCategoryData) => <div className="subCategory">{name}</div>;

export default SubCategory;
