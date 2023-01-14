import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../App";
import { Tooltip } from "@mui/material";

const FloatingButton = () => {
    const { sortType, setSortType, setStatus, admin } = useAppContext();
    const actions = [
        {
            icon: <SortByAlphaIcon color={sortType.prop === "name" ? (sortType.direction === "asc" ? "success" : "error") : "primary"} />,
            name: "Alfabetycznie",
            click: () => {
                const { prop, direction } = sortType;
                if (prop === "name") setSortType({ prop, direction: direction === "asc" ? "desc" : "asc" });
                else setSortType({ prop: "name", direction: "asc" });
            },
        },
        {
            icon: <AttachMoneyIcon color={sortType.prop === "price" ? (sortType.direction === "asc" ? "success" : "error") : "primary"} />,
            name: "Cenowo",
            click: () => {
                const { prop, direction } = sortType;
                if (prop === "price") setSortType({ prop, direction: direction === "asc" ? "desc" : "asc" });
                else setSortType({ prop: "price", direction: "asc" });
            },
        },
    ];

    return (
        <Tooltip title="Sortowanie">
            <SpeedDial
                onClick={() => admin && setStatus("add")}
                ariaLabel=""
                icon={admin ? <AddIcon /> : <SortIcon />}
                sx={{
                    position: "sticky",
                    bottom: 50,
                    width: 0,
                    left: "95vw",
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            action.click();
                            e.stopPropagation();
                        }}
                    />
                ))}
            </SpeedDial>
        </Tooltip>
    );
};
export default FloatingButton;
