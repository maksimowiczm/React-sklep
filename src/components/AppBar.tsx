import { AppBar, Badge, BadgeProps, IconButton, styled, Toolbar, Tooltip, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const MyAppBar = () => {
    const { reset, admin, switchAdmin, setStatus, itemsInBasket } = useAppContext();

    const AccountIconWrapper = styled("div")(({ theme }) => ({
        display: "flex",
        color: admin ? theme.palette.success.light : undefined,
    }));

    const BasketIconWrapper = styled(Badge)<BadgeProps>(({ theme }) => ({
        color: "#fff",
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
                <IconButton sx={{ marginLeft: 1 }} onClick={switchAdmin}>
                    <Tooltip title="Konto">
                        <AccountIconWrapper>
                            <AccountCircleIcon />
                        </AccountIconWrapper>
                    </Tooltip>
                </IconButton>
                <IconButton sx={{ marginLeft: 1 }} onClick={() => setStatus("basket")}>
                    <BasketIconWrapper badgeContent={itemsInBasket} color="primary">
                        <Tooltip title="Koszyk">
                            <ShoppingCartOutlinedIcon />
                        </Tooltip>
                    </BasketIconWrapper>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
