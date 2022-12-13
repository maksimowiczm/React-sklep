import { SubCategoryData, SubCategory } from "./SubCategory";

export interface CategoryData {
    id: number;
    name: string;
    subCategories: Array<SubCategoryData>;
}

export const Category = ({ id, name, subCategories }: CategoryData) => (
    <div className="category">
        <div className="name">{name}</div>
        {subCategories.length > 0 && (
            <div className="subCategories">
                {subCategories.map((subCategory: SubCategoryData, j: number) => (
                    <SubCategory key={j} id={subCategory.id} name={subCategory.name} />
                ))}
            </div>
        )}
    </div>
);

export default Category;
