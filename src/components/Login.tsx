import { useAppContext } from "../App";
import { useEffect } from "react";

const LoginForm = () => {
    const { switchAdmin, setUser, setStatus, user, admin } = useAppContext();

    // TODO Usunąć i zrobić logowanie
    useEffect(() => {
        if (user !== undefined) {
            setUser(undefined);
            if (admin) switchAdmin();
        } else {
            setUser("admin");
            switchAdmin();
        }

        setStatus("none");
    }, []);

    return <>Login</>;
};

export default LoginForm;
