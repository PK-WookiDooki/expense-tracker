import {Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import {ModalHeader, SubmitBtn} from "@/components";
import {useChangeUsernameMutation} from "./userApi";

const EditNameModal = ({username}) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
        if (username) {
            form.setFieldsValue({username});
        }
    }, [openModal]);

    const {token} = useSelector((state) => state.authSlice);
    const [changeUsername] = useChangeUsernameMutation();

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const {data, error: apiError} = await changeUsername({
                username: values.username,
                token,
            });
            if (data?.success) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
                closeModal();
            } else {
                setIsSubmitting(false)
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: apiError?.data.message || apiError?.error,
                    })
                );
            }
        } catch (error) {
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: error?.message,
                })
            );
        }
    };

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
        setIsSubmitting(false)
    };

    const nameValidator = async (rule, value) => {
        if (value?.toString().charAt(0) === " ") {
            throw new Error("Enter valid username!")
        }
    }

    return (
        <section className="pb-6 border-b border-cD9 text-c26 ">
            <h2 className="text-xl">Name</h2>
            <div className="flex items-center justify-between mt-2">
                <p className={` text-[#434343] `}> {username || "Nexcoder"} </p>
                <button
                    onClick={() => setOpenModal(true)}
                    className="edit-btn">
                    {" "}
                    Edit{" "}
                </button>
            </div>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
                width={420}

            >
                <ModalHeader title={"change name"} event={closeModal}/>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                >
                    <div className={" p-6 pb-0"}>
                        <Form.Item
                            label={"Name"}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Name is required!",
                                },
                                {
                                    validator: nameValidator
                                }, {
                                    min: 3,
                                    message: "Username must have at least 3 characters!"
                                }
                            ]}
                            validateTrigger={"onSubmit"}
                        >
                            <Input placeholder={"Enter your name"}/>
                        </Form.Item>
                    </div>
                    <div className="py-3 border-t px-6 border-cD9/60">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" !h-8 ml-auto"}
                            isLoading={isSubmitting}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default EditNameModal;
