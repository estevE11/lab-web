import { apiGET, apiGETAuth } from '@/utils/apiUtils';
import { checkToken, deleteCookie } from '@/utils/cookieUtils';
import { Box, Button, Input } from '@chakra-ui/react';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Header } from '../components/ui/header';
import { redirect } from '@/utils/webUtils';
 
export default function Home() {

    const [courses, setCourses] = useState<any[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const init = (logged: boolean) => {
        if (!logged) {
            apiGET("/courses").then((data: any) => {
                setCourses(data);
            }) 
        } else {
            apiGETAuth("/courses").then((data: any) => {
                setCourses(data);
            }) 
        }
    };

    const search = (sch: string) => { 
        setSearchQuery(sch);
        apiGET("/courses/search?searchQuery=" + sch.replace(" ", "+")).then((data: any) => {
            setCourses(data);
        }) 
    }

    return (
        <>
            <Head>
                <title>Dev</title> <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header onInit={ init }></Header>

            <Box m={2}>
                <Box fontSize={25}>Courses</Box>
                <Input w={"50%"} minWidth={100} value={searchQuery} onChange={(e) => search(e.target.value)}></Input>
                <Box>
                    {courses?.map((course: any, index: number) => (
                        <Box key={index} cursor={"pointer"} onClick={() => redirect("/course?id=" + course.id)}>
                            {course.title}
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}
