import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const window = typeof window !== "undefined";

const WithPrivateRoute = ({ children }) => {
    const [loggedin, setLoggedin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (window) {
            if (!JSON.parse(sessionStorage.getItem("logininfo"))?.loggedin) {
                navigate("/login");
            } else {
                setLoggedin(true);
            }
        }
    }, [])

    return loggedin ? <>{children}</> : <></>
};

export default WithPrivateRoute;
