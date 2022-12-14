export interface SubCategoryData {
    id: number;
    name: string;
    subCategoryClick: (id: number) => void;
}

export const SubCategory = ({ id, name, subCategoryClick }: SubCategoryData) => (
    <div className="subCategory name" onClick={() => subCategoryClick(id)}>
        {name}
    </div>
);

export default SubCategory;
