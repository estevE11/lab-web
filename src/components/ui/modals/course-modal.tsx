import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { StarsInput } from "../stars-input";
import { apiPOSTAuth } from "@/utils/apiUtils";

type CourseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    courseId: number; 
    courseData: any;
}

export const CourseModal = ({isOpen, onClose, courseId, courseData}: CourseModalProps) => {
    const [values, setValues] = useState({
        title: "",
        description: ""
    });

    const save = () => {
        apiPOSTAuth("/courses/" + courseId, values).then((data: any) => {
            console.log(data);
            location.reload();
        });
    }

    useEffect(() => {
        if (courseData) {
            setValues({
                title: courseData.title,
                description: courseData.description
            });
        }
    }, [courseData, isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input placeholder='Title' value={values.title} onChange={(e) => setValues({...values, title: e.target.value})}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <Textarea placeholder='Content' value={values.description} onChange={(e) => setValues({...values, description: e.target.value})}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={save}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}