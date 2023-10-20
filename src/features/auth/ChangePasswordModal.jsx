import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";
import ModalHeader from "../../components/modals/ModalHeader";
import { SubmitBtn } from "../../components";
import { useChangePasswordMutation } from "./userApi";

const ChangePasswordModal = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);

    const [form] = Form.useForm();
    const nav = useNavigate();

    const dispatch = useDispatch();
    const [changePassword] = useChangePasswordMutation();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const onFormSubmit = async (values) => {
        try {
            delete values.password_confirmation;
            const { data, error: apiError } = await changePassword({
                passwords: { ...values },
                token,
            });
            if (data?.success) {
                nav("/signIn", {
                    replace: true,
                });
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Password changed successfully!",
                    })
                );
                closeModal();
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <section className="mt-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Password</h2>
                <button
                    onClick={() => setOpenModal(true)}
                    className="py-1 px-4 rounded-full border border-primaryGreen text-primaryGreen hover:text-whiteGray hover:bg-primaryGreen outline-none duration-200"
                >
                    {" "}
                    Change Password{" "}
                </button>
            </div>

            <Modal
                centered
                open={openModal}
                className="account-modal"
                closeIcon={false}
                footer={null}
            >
                <ModalHeader event={closeModal} title={"Change Password"} />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                    className="p-6 pb-0"
                >
                    <Form.Item
                        name="oldPassword"
                        label="Current Password"
                        rules={[
                            {
                                required: true,
                                message: "Current password is required!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required!",
                            },
                            {
                                pattern:
                                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                            },
                            {
                                min: 8,
                                message:
                                    "Password must have at least 8 characters!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label="Confirm Password"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Password confirmation is required!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The password confirmation does not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="py-3 border-t border-gray">
                        <SubmitBtn
                            label={"save"}
                            isFixedWidth={true}
                            extraStyle={" block ml-auto "}
                        />
                    </div>
                </Form>{" "}
            </Modal>
        </section>
    );
};

export default ChangePasswordModal;
