import { AppBar, Badge, BadgeProps, IconButton, styled, Toolbar, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const MyAppBar = () => {
    const { reset, admin, switchAdmin, setStatus, basket } = useAppContext();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="home name" variant="h6" flexGrow={2} onClick={reset}>
                    Sklep
                </Typography>
                <SearchBar />
                <IconButton sx={{ marginLeft: 1 }} onClick={switchAdmin}>
                    <AccountCircleIcon color={admin ? "success" : "disabled"} />
                </IconButton>
                <IconButton sx={{ marginLeft: 1 }} onClick={() => setStatus("basket")}>
                    <StyledBadge badgeContent={basket.length} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </StyledBadge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
