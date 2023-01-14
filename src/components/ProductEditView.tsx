import { ProductData } from "./Product";
import { CategoryData } from "./Category";
import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useEditContext } from "../App";

export const ProductEditView = ({ productId }: { productId: number | undefined }) => {
    const { edit } = useEditContext();
    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [product, setProduct] = useState<ProductData>({ name: "", id: 0 });
    const [chosenCategory, setChosenCategory] = useState<number>(0);
    const [chosenSub, setChosenSub] = useState<number>(0);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
        if (productId !== undefined)
            axios.get(`http://${DB}/products/${productId}?_expand=category&_expand=subCategory`).then((res) => {
                console.log(res);
                setProduct(res.data);
                setName(res.data?.name);
                setChosenCategory(res.data?.category?.id!!);
                setChosenSub(res.data?.subCategory?.id!!);
            });
    }, [productId]);

    const patch = () => {
        console.log(name, chosenCategory, chosenSub);
        axios.patch(`http://${DB}/products/${productId}`, { name: name, categoryId: chosenCategory, subCategoryId: chosenSub });
    };

    let button;
    if (edit == "add") button = <button>Dodaj</button>;
    else if (edit == "edit") button = <button onClick={patch}>Edytuj</button>;

    return (
        <div className="edit">
            <div className="name">
                <label htmlFor="name">Nazwa</label>
                <input id="name" defaultValue={edit ? product?.name : ""} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="category">
                <label htmlFor="category">Kategoria</label>
                <select
                    id="category"
                    value={chosenCategory}
                    onChange={(e) => {
                        setChosenCategory(Number(e.target.value));
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
