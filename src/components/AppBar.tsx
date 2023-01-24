import { AppBar, Badge, BadgeProps, IconButton, styled, Toolbar, Box, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "@mui/material/styles";

const MyAppBar = () => {
    const { reset } = useAppContext();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography className="home" variant="h6" onClick={reset}>
                    Sklep
                </Typography>
                <Box flexGrow={1} />
                <SearchBar />
                <AccountIcon />
                <BasketIcon />
            </Toolbar>
        </AppBar>
    );
};

const AccountIcon = () => {
    const { setStatus, user } = useAppContext();

    const theme = useTheme();
    let color = user ? theme.palette.secondary.main : "#fff";
    let hoverColor = user ? theme.palette.secondary.dark : "#ddd";

    let AccountWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color,
        ":hover": {
            color: hoverColor,
        },
    }));

    const AccountIconWrapper = styled("div")(({ theme }) => ({
        color: "inherit",
        display: "flex",
        ":hover": {
            color: "inherit",
        },
    }));

    return (
        <AccountWrapper>
            <IconButton sx={{ marginLeft: 1, borderRadius: 10, color: "inherit" }} onClick={() => setStatus("login")}>
                <AccountIconWrapper>
                    <AccountCircleIcon />
                </AccountIconWrapper>
                <Typography marginLeft={1}>{user ? "Wyloguj" : "Zaloguj"}</Typography>
            </IconButton>
        </AccountWrapper>
    );
};

const BasketIcon = () => {
    const { setStatus, itemsInBasket, user } = useAppContext();

    let BasketWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color: user ? theme.palette.secondary.main : "#fff",
        ":hover": {
            color: user ? theme.palette.secondary.dark : "#ddd",
        },
    }));

    const BasketIconWrapper = styled(Badge)<BadgeProps>(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: "0 4px",
        },
    }));

    return (
        <BasketWrapper>
            <IconButton sx={{ marginLeft: 1, borderRadius: 10, color: "inherit" }} onClick={() => setStatus("basket")}>
                <BasketIconWrapper badgeContent={itemsInBasket} sx={{ color: "inherit" }} color="secondary">
                    <ShoppingCartOutlinedIcon />
                </BasketIconWrapper>
                <Typography marginLeft={2}>Koszyk</Typography>
            </IconButton>
        </BasketWrapper>
    );
};

export default MyAppBar;
