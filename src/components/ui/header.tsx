import { apiGET } from "@/utils/apiUtils";
import { checkToken, deleteCookie } from "@/utils/cookieUtils";
import { redirect } from "@/utils/webUtils";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Header = ({onInit} : {onInit: (logged: boolean) => void}) => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const logged = checkToken();
        setLogged(logged);
        onInit(logged);
    }, []);

    const logout = () => {
        deleteCookie("token");
        localStorage.removeItem("username");
        redirect("/");
    }

    return (
        <Box>
            {logged &&
                <Box>
                    <span>User: { localStorage.getItem("username") }</span>
                    <Button size={"sm"} ml={3} colorScheme='red' onClick={logout}>Log out</Button>
                </Box>
            }
            {!logged &&
                <Button onClick={() => {redirect("/login")}}>Login</Button>
            }
        </Box>
    );
}
