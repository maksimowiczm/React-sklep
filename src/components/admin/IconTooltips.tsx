import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

interface click {
    onClick: (e: React.MouseEvent) => void;
}

const CustomIconButton = ({ onClick, children, title }: { onClick: (e: React.MouseEvent) => void; children: React.ReactNode; title: string }) => {
    return (
        <Tooltip title={title}>
            <IconButton onClick={onClick} color="inherit">
                {children}
            </IconButton>
        </Tooltip>
    );
};

const EditIconWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    ":hover": {
        color: theme.palette.info.main,
    },
}));

export const EditIconTooltip = ({ onClick }: click) => (
    <EditIconWrapper>
        <CustomIconButton onClick={onClick} title="Edytuj">
            <EditIcon />
        </CustomIconButton>
    </EditIconWrapper>
);

const DeleteIconWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    ":hover": {
        color: theme.palette.error.main,
    },
}));

export const DeleteIconTooltip = ({ onClick }: click) => (
    <DeleteIconWrapper>
        <CustomIconButton onClick={onClick} title="Usuń">
            <DeleteIcon />
        </CustomIconButton>
    </DeleteIconWrapper>
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
    <AddToCartIconWrapper>
        <Tooltip title="Dodaj do koszyka">
            <IconButton onClick={onClick} color="inherit">
                <AddShoppingCartIcon color="inherit" fontSize={fontSize} />
            </IconButton>
        </Tooltip>
    </AddToCartIconWrapper>
);
