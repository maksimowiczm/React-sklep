import { createContext } from "react";
import { SortType } from "./Types";

type AppContext = {
    categoryId: number | undefined;
    setCategory: (id: number | undefined) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number | undefined) => void;

    productId: number | undefined;
    setProduct: (id: number | undefined) => void;

    admin: boolean;
    switchAdmin: () => void;

    status: "editProduct" | "addProduct" | "editCategory" | "addCategory" | "editSubCategory" | "addSubCategory" | "none";
    setStatus: (edit: "editProduct" | "addProduct" | "editCategory" | "addCategory" | "editSubCategory" | "addSubCategory" | "none") => void;

    update: number;
    setUpdate: (next: number) => void;

    reset: () => void;

    searchPhrase: string | undefined;
    setSearchPhrase: (phase: string | undefined) => void;

    sortType: SortType;
    setSortType: (sortType: SortType) => void;
};

export const MyAppContext = createContext<AppContext>({
    categoryId: undefined,
    setCategory: () => { },

    subCategoryId: undefined,
    setSubCategory: () => { },

    productId: undefined,
    setProduct: () => { },

    admin: false,
    switchAdmin: () => { },

    status: "none",
    setStatus: () => { },

    update: 0,
    setUpdate: () => { },

    reset: () => { },

    searchPhrase: undefined,
    setSearchPhrase: () => { },

    sortType: { prop: "name", direction: "asc" },
    setSortType: () => { },
});
