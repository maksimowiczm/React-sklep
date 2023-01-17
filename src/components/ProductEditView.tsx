import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useAppContext } from "../App";
import { CategoryData } from "../Types";

const InputField = ({ defaultValue, onInput, error }: { defaultValue: string; onInput: (e: React.ChangeEvent<HTMLInputElement>) => void; error: boolean }) => (
    <TextField defaultValue={defaultValue} label="Nazwa" autoFocus onInput={onInput} error={error} />
);

export const ProductEditView = () => {
    const { productId, status, setStatus } = useAppContext();

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [chosenCategory, setChosenCategory] = useState<number | "">("");
    const [chosenSub, setChosenSub] = useState<number | "">("");
    const [name, setName] = useState<string>("");

    //TODO wyswietlanie bledow
    const [error, setError] = useState<"none" | "name" | "cat" | "sub">("none");

    // xd
    const [textfield, setTextfield] = useState<JSX.Element>(
        productId === undefined ? (
            <InputField defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
        ) : (
            <></>
        )
    );

    useEffect(() => {
        axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
        if (productId !== undefined) {
            axios.get(`http://${DB}/products/${productId}?_expand=category&_expand=subCategory`).then((res) => {
                setName(res.data?.name);
                setChosenCategory(res.data?.category?.id!!);
                setChosenSub(res.data?.subCategory?.id!!);

                setTextfield(
                    <InputField defaultValue={res.data?.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
                );
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
        setStatus("none");
    };
    const add = () => {
        if (!validateForm()) return;

        axios.post(`http://${DB}/products`, { name: name, categoryId: chosenCategory, subCategoryId: chosenSub });
        setStatus("none");
    };

    let button;
    if (status === "addProduct")
        button = (
            <Button variant="contained" onClick={add}>
                Dodaj
            </Button>
        );
    else if (status === "editProduct")
        button = (
            <Button variant="contained" onClick={patch}>
                Edytuj
            </Button>
        );

    return (
        <Stack spacing={2} width={500} direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" align="center">
                {status === "addProduct" ? "Dodaj" : status === "editProduct" ? "Edytuj" : ""} produkt
            </Typography>
            <FormControl fullWidth>{textfield}</FormControl>
            <FormControl fullWidth>
                <InputLabel id="category-label">Kategoria</InputLabel>
                <Select
                    labelId="category"
                    id="category"
                    value={chosenCategory}
                    label="Kategoria"
                    onChange={(e) => {
                        setChosenCategory(Number(e.target.value));
                        setChosenSub("");
                    }}
                >
                    {categories.map((c, i) => (
                        <MenuItem key={i} value={c.id}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {chosenCategory > 0 && (
                <FormControl fullWidth>
                    <InputLabel id="sub">Podkategoria</InputLabel>
                    <Select
                        labelId="sub"
                        value={chosenSub}
                        label="Podkategoria"
                        onChange={(e) => {
                            setChosenSub(Number(e.target.value));
                        }}
                    >
                        {categories[Number(chosenCategory) - 1].subCategories.map((c, i) => (
                            <MenuItem key={i} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            {button}
        </Stack>
    );
};

export default ProductEditView;
