import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAppContext } from "../App";
import SearchBar from "./SearchBar";

const MyAppBar = () => {
    const { reset } = useAppContext();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="home name" variant="h6" flexGrow={2} onClick={reset}>
                    Sklep
                </Typography>
                <SearchBar />
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
