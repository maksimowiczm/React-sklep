import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

interface click {
    onClick: (e: React.MouseEvent) => void;
    hover?: boolean;
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

export const EditIconTooltip = ({ onClick, hover }: click) => {
    const EditIconWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color: hover ? theme.adminIcons.edit : undefined,
        // color: hover ? theme.palette.info.main : undefined,
    }));

    return (
        <EditIconWrapper>
            <CustomIconButton onClick={onClick} title="Edytuj">
                <EditIcon />
            </CustomIconButton>
        </EditIconWrapper>
    );
};

export const DeleteIconTooltip = ({ onClick, hover }: click) => {
    const DeleteIconWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color: hover ? theme.adminIcons.delete : undefined,
    }));

    return (
        <DeleteIconWrapper>
            <CustomIconButton onClick={onClick} title="Usuń">
                <DeleteIcon />
            </CustomIconButton>
        </DeleteIconWrapper>
    );
};

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
