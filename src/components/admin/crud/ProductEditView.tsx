import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack, Typography, Rating } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useAppContext } from "../../../App";
import { CategoryData } from "../../../Types";

const InputField = ({
    defaultValue,
    onInput,
    label,
    multiline,
    maxRows,
    type,
}: {
    defaultValue: string;
    label: string;
    multiline?: boolean;
    maxRows?: number;
    type?: string;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => <TextField defaultValue={defaultValue} label={label} onInput={onInput} multiline={multiline} maxRows={maxRows} type={type} />;

export const ProductEditView = () => {
    const { productId, status, setStatus } = useAppContext();

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [chosenCategory, setChosenCategory] = useState<number | "">("");
    const [chosenSub, setChosenSub] = useState<number | "">("");
    const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [rating, setRating] = useState<number | null>(2);

    // xd
    const [nameTextField, setNameTextField] = useState<JSX.Element>(
        productId === undefined ? (
            <InputField label="Nazwa" defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        ) : (
            <></>
        )
    );
    const [descTextField, setDescTextField] = useState<JSX.Element>(
        productId === undefined ? (
            <InputField label="Opis" multiline maxRows={8} defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)} />
        ) : (
            <></>
        )
    );
    const [priceTextFiled, setPriceTextField] = useState<JSX.Element>(
        productId === undefined ? (
            <InputField label="Cena" defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} type="number" />
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

                setNameTextField(
                    <InputField label="Nazwa" defaultValue={res.data?.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                );
                setDescTextField(
                    <InputField
                        label="Opis"
                        multiline
                        maxRows={8}
                        defaultValue={res.data?.description}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
                    />
                );
                setPriceTextField(
                    <InputField label="Cena" defaultValue={res.data?.price} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} />
                );
                setRating(res.data?.rating);
            });
        }
    }, [productId]);

    const validateForm = () => {
        return !(Number(price) <= 0 || name === "" || desc === "" || rating === null || chosenCategory === 0 || chosenSub === 0);
    };

    const patch = () => {
        if (!validateForm()) return;

        axios.patch(`http://${DB}/products/${productId}`, { name: name, categoryId: chosenCategory, subCategoryId: chosenSub });
        setStatus("none");
    };
    const add = () => {
        if (!validateForm()) return;

        axios.post(`http://${DB}/products`, {
            name: name,
            description: desc,
            price: Number(price),
            rating: rating,
            categoryId: chosenCategory,
            subCategoryId: chosenSub,
        });
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
            <FormControl fullWidth>{nameTextField}</FormControl>
            <FormControl fullWidth>{descTextField}</FormControl>
            <FormControl fullWidth>{priceTextFiled}</FormControl>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
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
