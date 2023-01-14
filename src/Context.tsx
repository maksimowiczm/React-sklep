import { createContext } from "react";

type AppContext = {
    categoryId: number | undefined;
    setCategory: (id: number) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number) => void;

    productId: number | undefined;
    setProduct: (id: number | undefined) => void;

    admin: boolean;

    status: "edit" | "add" | "none";
    setStatus: (edit: "edit" | "add" | "none") => void;

    update: number;
    setUpdate: (next: number) => void;

    reset: () => void;

    setSearchPhrase: (phase: string | undefined) => void;
};

export const MyAppContext = createContext<AppContext>({
    categoryId: undefined,
    setCategory: () => {},

    subCategoryId: undefined,
    setSubCategory: () => {},

    productId: undefined,
    setProduct: () => {},

    admin: false,

    status: "none",
    setStatus: () => {},

    update: 0,
    setUpdate: () => {},

    reset: () => {},

    setSearchPhrase: () => {},
});
