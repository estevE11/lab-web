import { Box, Icon } from "@chakra-ui/react"
import { useState } from "react";


type StarsInputProps = {
    onChange: (value: number) => void;
}

export const StarsInput = ({onChange}: StarsInputProps) => {
    const [val, setVal] = useState(0);    

    const onClick = (i: number) => {
        onChange(i + 1);
        setVal(i+1)
    }

    return (
        <Box>
            {Array.from(Array(5).keys()).map((i: number) => {
                const color = i < val ? "yellow.500" : "gray.300";
                return (
                    <Icon onClick={() => onClick(i)} style={{cursor: "pointer"}} key={i} color={color} w={5} h={5} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M12 18l-6 3l1-7l-5-5l7-1l3-6l3 6l7 1l-5 5l1 7z" />
                    </Icon>
                )
            })}
        </Box>
    )
}