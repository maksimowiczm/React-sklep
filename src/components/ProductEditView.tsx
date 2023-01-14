import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useEditContext, useProductContext } from "../App";
import { CategoryData, ProductData } from "../Types";

export const ProductEditView = () => {
    const { productId } = useProductContext();
    const { edit, setEdit } = useEditContext();
    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [product, setProduct] = useState<ProductData>({ name: "", id: 0 });
    const [chosenCategory, setChosenCategory] = useState<number>(0);
    const [chosenSub, setChosenSub] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<"none" | "name" | "cat" | "sub">("none");

    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
        if (productId !== undefined) {
            axios.get(`http://${DB}/products/${productId}?_expand=category&_expand=subCategory`).then((res) => {
                setProduct(res.data);
                setName(res.data?.name);
                setChosenCategory(res.data?.category?.id!!);
                setChosenSub(res.data?.subCategory?.id!!);
            });
        }
    }, [productId]);

    const validateForm = () => {
        if (name === "") {
            setError("name");
            return false;
        }
        if (chosenCategory === 0) {
            setError("cat");
            return false;
        }
        if (chosenSub === 0) {
            setError("sub");
            return false;
        }

        setError("none");
        return true;
    };

    const patch = () => {
        if (!validateForm()) return;

        axios.patch(`http://${DB}/products/${productId}`, { name: name, categoryId: chosenCategory, subCategoryId: chosenSub });
        setEdit("none");
    };
    const add = () => {
        if (!validateForm()) return;

        axios.post(`http://${DB}/products`, { name: name, categoryId: chosenCategory, subCategoryId: chosenSub });
        setEdit("none");
    };

    let button;
    if (edit === "add") button = <button onClick={add}>Dodaj</button>;
    else if (edit === "edit") button = <button onClick={patch}>Edytuj</button>;

    return (
        <div className="edit">
            {error !== "none" && <div>{error}</div>}
            <div className="name">
                <label htmlFor="name">Nazwa</label>
                <input id="name" defaultValue={edit ? product?.name : ""} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </div>
            <div className="category">
                <label htmlFor="category">Kategoria</label>
                <select
                    id="category"
                    value={chosenCategory}
                    onChange={(e) => {
                        setChosenCategory(Number(e.target.value));
                        setChosenSub(0);
                    }}
                >
                    <option value={0}>Wybierz kategorię</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            {chosenCategory > 0 && (
                <div className="subCategory">
                    <label htmlFor="subCategory">Podkategoria</label>
                    <select
                        id="subCategory"
                        value={chosenSub}
                        onChange={(e) => {
                            setChosenSub(Number(e.target.value));
                        }}
                    >
                        <option value={0}>Wybierz kategorię</option>
                        {categories[chosenCategory - 1].subCategories.map((c, i) => (
                            <option key={i} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {button}
        </div>
    );
};

export default ProductEditView;
