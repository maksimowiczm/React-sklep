import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";

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
