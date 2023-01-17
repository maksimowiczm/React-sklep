import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { DB, useAppContext } from "../App";

const InputField = ({ defaultValue, onInput, error }: { defaultValue: string; onInput: (e: React.ChangeEvent<HTMLInputElement>) => void; error: boolean }) => (
    <TextField defaultValue={defaultValue} label="Nazwa" autoFocus onInput={onInput} error={error} />
);

export const ProductEditView = () => {
    const { categoryId, status, setStatus } = useAppContext();

    // const [categories, setCategories] = useState<Array<CategoryData>>([]);
    const [name, setName] = useState<string>("");

    //TODO wyswietlanie bledow
    const [error, setError] = useState<"none" | "name">("none");

    // xd
    const [textfield, setTextfield] = useState<JSX.Element>(
        categoryId === undefined ? (
            <InputField defaultValue="" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
        ) : (
            <></>
        )
    );

    useEffect(() => {
        //axios.get(`http://${DB}/categories?_embed=subCategories`).then((res) => setCategories(res.data));
        if (categoryId !== undefined) {
            axios.get(`http://${DB}/categories/${categoryId}`).then((res) => {
                setName(res.data?.name);

                setTextfield(
                    <InputField defaultValue={res.data?.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={false} />
                );
            });
        }
    }, [categoryId]);



    const validateForm = () => {
        if (name === "") {
            setError("name");
            return false;
        }

        setError("none");
        return true;
    };

    const patch = () => {
        if (!validateForm()) return;

        axios.patch(`http://${DB}/categories/${categoryId}`, { name: name });
        setStatus("none");
    };
    const add = () => {
        if (!validateForm()) return;

        axios.post(`http://${DB}/categories`, { name: name });
        setStatus("none");
    };

    let button;
    if (status === "addCategory")
        button = (
            <Button variant="contained" onClick={add}>
                Dodaj
            </Button>
        );
    else if (status === "editCategory")
        button = (
            <Button variant="contained" onClick={patch}>
                Edytuj
            </Button>
        );


    return (
        <Stack spacing={2} width={500} direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" align="center">
                {status === "addCategory" ? "Dodaj" : "Edytuj"} kategorie
            </Typography>
            <FormControl fullWidth>{textfield}</FormControl>
            {button}
        </Stack>
    );
};

export default ProductEditView;
