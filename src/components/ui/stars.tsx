import { Box, Icon } from "@chakra-ui/react"

export const Stars = ({ rating }: { rating: number }) => {
    return (
        <Box>
            {Array.from(Array(5).keys()).map((i: number) => {
                const color = i < rating ? "yellow.500" : "gray.300";
                return (
                    <Icon key={i} color={color} w={5} h={5} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M12 18l-6 3l1-7l-5-5l7-1l3-6l3 6l7 1l-5 5l1 7z" />
                    </Icon>
                )
            })}
        </Box>
    )
}