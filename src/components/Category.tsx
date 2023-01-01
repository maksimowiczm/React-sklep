import { useCategoryContext } from "../App";
import { SubCategoryData, SubCategory } from "./SubCategory";

export interface CategoryData {
    id: number;
    name: string;
    subCategories: Array<SubCategoryData>;
}

export const Category = function ({ id, name, subCategories }: CategoryData) {
    const { categoryId, setCategory } = useCategoryContext();

    return (
        <div className="category">
            <div className={`name ${categoryId === id ? "active" : ""}`} onClick={() => setCategory(id)}>
                {name}
            </div>
            {subCategories.length > 0 && (
                <div className="subCategories">
                    {subCategories.map((subCategory: SubCategoryData, j: number) => (
                        <SubCategory key={j} id={subCategory.id} name={subCategory.name} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
