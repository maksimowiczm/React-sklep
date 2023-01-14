import ListItemButton from "@mui/material/ListItemButton";
import { useCategoryContext } from "../App";
import { SubCategoryData, SubCategory } from "./SubCategory";

export interface CategoryData {
    id: number;
    name: string;
    subCategories: Array<SubCategoryData>;
}

export const Category = ({ id, name, subCategories }: CategoryData) => {
    const { categoryId, setCategory } = useCategoryContext();
    const { setSubCategory } = useCategoryContext();

    return (
        <div className="category">
            <ListItemButton className={`name${categoryId === id ? " active" : ""}`} onClick={() => setCategory(id)}>
                {name}
            </ListItemButton>

            {subCategories.length > 0 && (
                <>
                    {subCategories.map((subCategory: SubCategoryData, i: number) => (
                        <ListItemButton
                            key={i}
                            onClick={(e) => {
                                setSubCategory(subCategory.id);
                                e.stopPropagation();
                            }}
                        >
                            <SubCategory id={subCategory.id} name={subCategory.name} />
                        </ListItemButton>
                    ))}
                </>
            )}
        </div>
    );
};

export default Category;
