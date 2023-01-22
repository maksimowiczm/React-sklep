import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

interface click {
    onClick: (e: React.MouseEvent) => void;
}

const CustomIconButton = ({ onClick, jsx }: { onClick: (e: React.MouseEvent) => void; jsx: JSX.Element }) => {
    return <IconButton onClick={onClick}>{jsx}</IconButton>;
};

export const EditIconTooltip = ({ onClick }: click) => (
    <CustomIconButton
        onClick={onClick}
        jsx={
            <Tooltip title="Edytuj">
                <EditIcon />
            </Tooltip>
        }
    />
);

export const DeleteIconTooltip = ({ onClick }: click) => (
    <CustomIconButton
        onClick={onClick}
        jsx={
            <Tooltip title="Usuń">
                <DeleteIcon />
            </Tooltip>
        }
    />
);

const AddToCartIconWrapper = styled("div")(({ theme }) => ({
    color: theme.palette.success.main,
    display: "flex",
    ":hover": {
        color: theme.palette.success.dark,
    },
}));

export const AddToCartIconTooltip = ({
    onClick,
    fontSize,
}: {
    onClick: (e: React.MouseEvent) => void;
    fontSize?: "small" | "large" | "medium" | undefined;
}) => (
    <Tooltip title="Dodaj do koszyka">
        <AddToCartIconWrapper>
            <IconButton onClick={onClick} color="inherit">
                <AddShoppingCartIcon color="inherit" fontSize={fontSize} />
            </IconButton>
        </AddToCartIconWrapper>
    </Tooltip>
);
