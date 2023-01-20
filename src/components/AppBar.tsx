import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const MyAppBar = () => {
    const { reset, admin, switchAdmin, setStatus } = useAppContext();

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
                    <ShoppingCartOutlinedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
