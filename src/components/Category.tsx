import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
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
            <div className={`name${categoryId === id ? " active" : ""}`} onClick={() => setCategory(id)}>
                {name}
            </div>
            {subCategories.length > 0 && (
                <List component="div" disablePadding>
                    {subCategories.map((subCategory: SubCategoryData, j: number) => (
                        <ListItemButton sx={{ pl: 4 }}><SubCategory key={j} id={subCategory.id} name={subCategory.name} />  </ListItemButton>
                    ))}
                </List>
            )}
        </div>
    );

};

export default Category;
