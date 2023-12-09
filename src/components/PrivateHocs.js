import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loggedin, setLoggedin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const haveToken = sessionStorage.getItem('accessToken')
        if (!haveToken) {
            setLoggedin(false);
            setTimeout(() => {
                navigate('/')
            }, 500)
        } else {
            setLoggedin(true);
        }
    }, [])

    // useEffect(() => {
    //     if (window) {
    //         if (!JSON.parse(sessionStorage.getItem("logininfo"))?.loggedin) {
    //             navigate("/login");
    //         } else {
    //             setLoggedin(true);
    //         }
    //     }
    // }, [])

    return loggedin ? <> {children} </> : <> please wait..</>
};

export default ProtectedRoute;
