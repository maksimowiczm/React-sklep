import { SubCategoryData, SubCategory } from "./SubCategory";

export interface CategoryData {
    id: number;
    name: string;
    subCategories: Array<SubCategoryData>;
    categoryClick: (id: number) => void;
    subCategoryClick: (id: number) => void;
}

export const Category = ({ id, name, subCategories, categoryClick, subCategoryClick }: CategoryData) => (
    <div className="category">
        <div className="name" onClick={() => categoryClick(id)}>
            {name}
        </div>
        {subCategories.length > 0 && (
            <div className="subCategories">
                {subCategories.map((subCategory: SubCategoryData, j: number) => (
                    <SubCategory key={j} id={subCategory.id} name={subCategory.name} subCategoryClick={subCategoryClick} />
                ))}
            </div>
        )}
    </div>
);

export default Category;
