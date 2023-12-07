import { apiGET } from "@/utils/apiUtils";
import { checkToken, deleteCookie } from "@/utils/cookieUtils";
import { redirect } from "@/utils/webUtils";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
        <Box mb={5}>
            {logged &&
                <Box>
                    <Button size={"sm"} onClick={() => redirect("/")}><ArrowBackIcon></ArrowBackIcon></Button>
                    <Button ml={3} size={"sm"} colorScheme='red' onClick={logout}>Log out</Button>
                    <Box as={"span"} ml={3}>User: { localStorage.getItem("username") }</Box>
                </Box>
            }
            {!logged &&
                <Button onClick={() => {redirect("/login")}}>Login</Button>
            }
        </Box>
    );
}
