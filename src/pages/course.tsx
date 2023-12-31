import { Header } from '@/components/ui/header';
import { apiGET, apiGETAuth, apiPOSTAuth } from '@/utils/apiUtils';
import { Badge, Box, Button, Divider } from '@chakra-ui/react';
import Head from 'next/head'
import { useState } from 'react';
import { Stars } from '../components/ui/stars';
import { CheckIcon } from '@chakra-ui/icons';
import { ReviewModal } from '@/components/ui/modals/review-modal';
import { CourseModal } from '@/components/ui/modals/course-modal';

export default function Home() {
    const [id, setId] = useState("");

    const [logged, setLogged] = useState(false);

    const [course, setCourse] = useState<any>();
    const [purchased, setPurchased] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

    const init = (logged: boolean) => {
        const urlParams = new URLSearchParams(window.location.search);
        const _id = urlParams.get('id');
        setId(_id || "");

        setLogged(logged);

        if (!logged) {
            apiGET("/courses/" + _id).then((data: any) => {
                setCourse(data);
            }) 
        } else {
            apiGETAuth("/courses/" + _id).then((data: any) => {
                setPurchased(Object.keys(data).includes("lessons"));
                setIsOwner(data.creatorDTO.username == localStorage.getItem("username"));
                setCourse(data);
                console.log(data);
            }) 
        }
    };

    const purchase = () => {
        apiPOSTAuth("/courses/" + id + "/purchase", {}).then((data: any) => {
            location.reload();
        });
    }

    const markAsDone = (lessonId: number) => {
        apiPOSTAuth("/courses/" + id + "/lessons/" + lessonId + "/done", {}).then((data: any) => {
            location.reload();
        });
    }

    const isDone = (lessonId: number) => {
        const lessonsDone = course.lessonsDone;
        return lessonsDone.filter((e: any) => e.id == lessonId).length > 0;
    }

    const canBeChecked = (lessonIndex: number) => {
        for (let i = 0; i < lessonIndex; i++) { 
            if (!isDone(course.lessons[i].id)) {
                return false;
            }
        }

        return true;
    }

    const calcCourseProgress = () => {
        if (!course || !course.lessonsDone || !course.lessons) return 0;
        if (course.lessons.length == 0) return 0;
        return course.lessonsDone.length / course.lessons.length * 100;
    }


    return (
        <>
            <Head>
                <title>Dev</title> <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box m={2}>
                <Header onInit={init}></Header>
                { course && 
                    <Box>
                        {isOwner &&
                            <Button size="sm" onClick={() => setIsCourseModalOpen(true)}>Edit course</Button>
                        }
                        <Box fontSize={32}>
                            {course.title}
                            <Badge ml={3} colorScheme='green'>{course.categoryDTO.name}</Badge>
                            <Badge ml={3}>{course.publicationDate.substring(0, 4)}</Badge>
                            <Badge ml={3}>{course.languageDTO.name.substring(0, 3)}</Badge>
                        </Box>
                        <Box mb={3}>{course.description}</Box>
                        <Box>Author: {course.creatorDTO.name} {course.creatorDTO.secondName}</Box>
                        {!purchased && <Box><Badge colorScheme='green' fontSize={20} mt={3}>{course.price}€</Badge></Box>}
                        { logged && !purchased &&
                            <Button colorScheme="green" onClick={purchase} mt={3}>Purchase</Button>
                            
                        }
                        { purchased &&
                            <>
                                <Box mt={10}>
                                    <Box fontSize="32">Lessons <Box as="span" fontSize={16}>({ calcCourseProgress() }%)</Box></Box>
                                    {course.lessons.length == 0 && <Box>No lessons yet</Box>}
                                    <table>
                                        <tbody>
                                            {course.lessons.map((e: any, index: number) => {
                                                const done = isDone(e.id);
                                                return (
                                                    <tr>
                                                        <Box as="td" pr={5}>{e.title}</Box>
                                                        <td>
                                                            {!done && canBeChecked(index) &&
                                                                <Button
                                                                    size={"sm"}
                                                                    variant='solid'
                                                                    colorScheme='teal'
                                                                    aria-label='Done'
                                                                    fontSize='15px'
                                                                    onClick={() => markAsDone(e.id)}
                                                                >Mark as done</Button>
                                                            }

                                                            {done && <CheckIcon></CheckIcon>}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </Box>
                            </>
                        }
                        <Box mt={10}>
                            <Box fontSize="32">Reviews</Box>
                            {calcCourseProgress() >= 50 && <Button size="sm" mb={5} onClick={() => setIsReviewModalOpen(true)}>Add review</Button>}
                            <Box>
                                {course.reviewsDTO.length == 0 && <Box>No reviews yet</Box>}
                                {course.reviewsDTO.map((e: any) => (
                                    <Box mt={2}>
                                        <Stars rating={e.satisfaction}></Stars>
                                        <Box as="span" fontSize={20}>{e.title}</Box>
                                        <Box>{e.content}</Box>
                                        <Divider mt={2}></Divider>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                }
            </Box>
            <ReviewModal isOpen={isReviewModalOpen} onClose={() => {setIsReviewModalOpen(false)}} courseId={course ? course.id : -1}></ReviewModal>
            <CourseModal isOpen={isCourseModalOpen} onClose={() => { setIsCourseModalOpen(false) }} courseId={course ? course.id : -1} courseData={course}></CourseModal>
        </>
    )
}
