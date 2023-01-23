import { AppBar, Badge, BadgeProps, IconButton, styled, Toolbar, Tooltip, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const MyAppBar = () => {
    const { reset, admin, switchAdmin, setStatus, itemsInBasket } = useAppContext();

    const AccountIconWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color: admin ? theme.palette.success.light : "#fff",
    }));

    const BasketIconWrapper = styled(Badge)<BadgeProps>(({ theme }) => ({
        color: theme.adminIcons.color,
        "& .MuiBadge-badge": {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }));

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="home" variant="h6" flexGrow={2} onClick={reset}>
                    Sklep
                </Typography>
                <SearchBar />
                <Tooltip title="Konto">
                    <IconButton sx={{ marginLeft: 1 }} onClick={switchAdmin}>
                        <AccountIconWrapper>
                            <AccountCircleIcon />
                        </AccountIconWrapper>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Koszyk">
                    <IconButton sx={{ marginLeft: 1 }} onClick={() => setStatus("basket")}>
                        <BasketIconWrapper badgeContent={itemsInBasket} color="secondary">
                            <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
                        </BasketIconWrapper>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
