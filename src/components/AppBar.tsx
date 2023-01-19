import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyAppBar = () => {
    const { reset, admin, switchAdmin } = useAppContext();

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
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
