import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { StarsInput } from "../stars-input";
import { apiPOSTAuth } from "@/utils/apiUtils";

type ReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    courseId: number; 
}

export const ReviewModal = ({isOpen, onClose, courseId}: ReviewModalProps) => {
    const [values, setValues] = useState({
        title: "",
        content: "",
        satisfaction: 0
    });

    const save = () => {
        apiPOSTAuth("/courses/" + courseId + "/review", values).then((data: any) => {
            console.log(data);
            location.reload();
        });
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Leave your review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <StarsInput onChange={(value: number) => setValues({...values, satisfaction: value})}></StarsInput>
                        <FormControl mt={4}>
                            <Input placeholder='Title' value={values.title} onChange={(e) => setValues({...values, title: e.target.value})}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <Textarea placeholder='Content' value={values.content} onChange={(e) => setValues({...values, content: e.target.value})}/>
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