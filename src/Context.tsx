import { createContext } from "react";
import { BasketItem, ProductData, SortType, Status } from "./Types";

type AppContext = {
    categoryId: number | undefined;
    setCategory: (id: number | undefined) => void;

    subCategoryId: number | undefined;
    setSubCategory: (id: number | undefined) => void;

    productId: number | undefined;
    setProduct: (id: number | undefined) => void;

    admin: boolean;
    setAdmin: (admin: boolean) => void;

    user: string | undefined;
    setUser: (user: string | undefined) => void;

    status: Status;
    setStatus: (edit: Status) => void;

    update: number;
    setUpdate: (next: number) => void;

    reset: () => void;

    searchPhrase: string | undefined;
    setSearchPhrase: (phase: string | undefined) => void;

    sortType: SortType;
    setSortType: (sortType: SortType) => void;

    basket: Array<BasketItem>;
    itemsInBasket: number;
    addOneToBasket: (product: ProductData) => void;
    removeOneFromBasket: (product: BasketItem) => void;
    removeFromBasket: (product: BasketItem) => void;
    clearBasket: () => void;
};

export const MyAppContext = createContext<AppContext>({
    categoryId: undefined,
    setCategory: () => { },

    subCategoryId: undefined,
    setSubCategory: () => { },

    productId: undefined,
    setProduct: () => { },

    admin: false,
    setAdmin: () => { },

    user: undefined,
    setUser: () => { },

    status: "none",
    setStatus: () => { },

    update: 0,
    setUpdate: () => { },

    reset: () => { },

    searchPhrase: undefined,
    setSearchPhrase: () => { },

    sortType: { prop: "name", direction: "asc" },
    setSortType: () => { },

    basket: [],
    itemsInBasket: 0,
    addOneToBasket: () => { },
    removeOneFromBasket: () => { },
    removeFromBasket: () => { },
    clearBasket: () => { },
});
