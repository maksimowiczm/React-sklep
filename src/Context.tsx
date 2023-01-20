import { createContext } from "react";
import { ProductData, SortType, Status } from "./Types";

type AppContext = {
    categoryId: number | undefined;
    setCategory: (id: number | undefined) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number | undefined) => void;

    productId: number | undefined;
    setProduct: (id: number | undefined) => void;

    admin: boolean;
    switchAdmin: () => void;

    status: Status;
    setStatus: (edit: Status) => void;

    update: number;
    setUpdate: (next: number) => void;

    reset: () => void;

    searchPhrase: string | undefined;
    setSearchPhrase: (phase: string | undefined) => void;

    sortType: SortType;
    setSortType: (sortType: SortType) => void;

    basket: Array<ProductData>;
    addToBasket: (product: ProductData) => void;
    removeFromBasket: (product: ProductData) => void;
    clearBasket: () => void;
};

export const MyAppContext = createContext<AppContext>({
    categoryId: undefined,
    setCategory: () => {},

    subCategoryId: undefined,
    setSubCategory: () => {},

    productId: undefined,
    setProduct: () => {},

    admin: false,
    switchAdmin: () => {},

    status: "none",
    setStatus: () => {},

    update: 0,
    setUpdate: () => {},

    reset: () => {},

    searchPhrase: undefined,
    setSearchPhrase: () => {},

    sortType: { prop: "name", direction: "asc" },
    setSortType: () => {},

    basket: [],
    addToBasket: () => {},
    removeFromBasket: () => {},
    clearBasket: () => {},
});
