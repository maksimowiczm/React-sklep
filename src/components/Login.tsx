import { DB, useAppContext } from "../App";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import bcrypt from "bcryptjs";
import axios from "axios";
import { TextField, Link, FormControl, Button, Typography, Box, Collapse, Alert } from "@mui/material/";

const LoginForm = () => {
    const { setAdmin, setUser, setStatus, status, user } = useAppContext();

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repetedPassword, setRepetedPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (user !== undefined) {
            setUser(undefined);
            setAdmin(false);
            setStatus("none");
        }
    }, [setUser, setAdmin, setStatus, user]);

    useEffect(() => {
        setError(false);
    }, [status]);

    const logIn = () => {
        setError(false);
        if (!validate()) {
            setError(true);
            return;
        }
        axios
            .get(`http://${DB}/accounts/${login}`)
            .then((response) => {
                if (bcrypt.compareSync(password, response.data?.password)) {
                    setUser(response.data?.id);
                    if (response.data?.id === "admin") {
                        setAdmin(true);
                    }
                    setStatus("none");
                } else setError(true);
            })
            .catch((err) => {
                setError(true);
            });
    };

    const registerNew = () => {
        setError(false);
        if (!validate()) {
            setError(true);
            return;
        }

        var hash = bcrypt.hashSync(password, 10);
        axios.post(`http://${DB}/accounts/`, { id: login, password: hash }).catch((err) => setError(true));
        if (!error) {
            logIn();
        }
    };

    const validate = () => {
        if (login === "" || login.length < 3) return false;
        if (password === "") return false;
        if (status === "register" && password !== repetedPassword) return false;
        return true;
    };

    const switchStatus = () => {
        if (status === "login") setStatus("register");
        else setStatus("login");
    };

    return (
        <Stack spacing={2} width={500} direction="column" justifyContent="center" alignItems="center">
            <Box position="absolute" top="0" padding={2} height="100vh" width="100vw" display="flex" flexDirection="column" alignItems="center" zIndex={-1}>
                <Box flexGrow={1} />
                <Collapse in={error} sx={{ width: "100%" }}>
                    <Alert variant="outlined" sx={{ mb: 2 }} severity={`${user === undefined ? "error" : "success"}`}>
                        {status === "login" ? "Nieprawidłowe dane logowania!" : "Hasła się nie zgadzają lub konto już istnieje!"}
                    </Alert>
                </Collapse>
            </Box>
            <Typography variant="h5" align="center">
                {status === "login" ? "Zaloguj" : "Zarejestruj"}
            </Typography>
            <FormControl fullWidth>
                <TextField label="Login" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} error={error} />
            </FormControl>
            <FormControl fullWidth>
                <TextField type="password" label="Hasło" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} error={error} />
            </FormControl>

            {status === "register" && (
                <FormControl fullWidth>
                    <TextField
                        type="password"
                        label="Powtórz Hasło"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setRepetedPassword(e.target.value)}
                        error={error}
                    />
                </FormControl>
            )}

            <Button variant="contained" onClick={status === "login" ? logIn : registerNew}>
                {status === "login" ? "Zaloguj" : "Zarejestruj"}
            </Button>
            <Link onClick={switchStatus} sx={{ cursor: "pointer" }}>
                {status === "login" ? "Nie masz konta?" : "Masz już konto?"}
            </Link>
        </Stack>
    );
};

export default LoginForm;
