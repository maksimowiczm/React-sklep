import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useAppContext } from "../../../App";
import { CategoryData } from "../../../Types";

const InputField = ({ defaultValue, onInput, error }: { defaultValue: string; onInput: (e: React.ChangeEvent<HTMLInputElement>) => void; error: boolean }) => (
    <TextField defaultValue={defaultValue} label="Nazwa" autoFocus onInput={onInput} error={error} />
);

export const SubcategoryEditView = () => {
    const { subCategoryId, status, setStatus } = useAppContext();

    const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [chosenCategory, setChosenCategory] = useState<number | "">("");
    const [name, setName] = useState<string>("");

    // xd
    const [textfield, setTextfield] = useState<JSX.Element>(
        subCategoryId === undefined ? (
            <InputField defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
        ) : (
            <></>
        )
    );

    useEffect(() => {
        axios.get(`http://${DB}/categories`).then((res) => setCategories(res.data));
        if (subCategoryId !== undefined) {
            axios.get(`http://${DB}/subcategories/${subCategoryId}`).then((res) => {
                setName(res.data?.name);
                setChosenCategory(res.data?.category?.id!!);

                setTextfield(
                    <InputField defaultValue={res.data?.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
                );
            });
        }
    }, [subCategoryId]);

    const validateForm = () => !(name === "" || chosenCategory === 0);

    const patch = () => {
        if (!validateForm()) return;

        axios.patch(`http://${DB}/subcategories/${subCategoryId}`, { name: name, categoryId: chosenCategory });
        setStatus("none");
    };
    const add = () => {
        if (!validateForm()) return;

        axios.post(`http://${DB}/subcategories`, { name: name, categoryId: chosenCategory });
        setStatus("none");
    };

    let button;
    if (status === "addSubCategory")
        button = (
            <Button variant="contained" onClick={add}>
                Dodaj
            </Button>
        );
    else if (status === "editSubCategory")
        button = (
            <Button variant="contained" onClick={patch}>
                Edytuj
            </Button>
        );

    return (
        <Stack spacing={2} width={500} direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" align="center">
                {status === "addSubCategory" ? "Dodaj" : status === "editSubCategory" ? "Edytuj" : ""} podkategorie
            </Typography>
            <FormControl fullWidth>{textfield}</FormControl>
            <FormControl fullWidth>
                <InputLabel id="category-label">Kategoria nadrzędna</InputLabel>
                <Select
                    labelId="category"
                    id="category"
                    value={chosenCategory}
                    label="Kategoria"
                    onChange={(e) => {
                        setChosenCategory(Number(e.target.value));
                    }}
                >
                    {categories.map((c, i) => (
                        <MenuItem key={i} value={c.id}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {button}
        </Stack>
    );
};

export default SubcategoryEditView;
