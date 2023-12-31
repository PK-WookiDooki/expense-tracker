import {Form, Input} from "antd";
import {FormTitle, SubmitBtn} from "@/components";
import {useLocation, useNavigate} from "react-router-dom";
import {useForgotPasswordMutation} from "./authApi";
import {useDispatch} from "react-redux";
import {setMessage} from "@/app/global/globalSlice";
import {useState} from "react";

const EmailVerificationForm = () => {
    const nav = useNavigate();
    const currentRoute = useLocation().pathname;

    const [forgotPassword] = useForgotPasswordMutation();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            const {data, error} = await forgotPassword(values.email);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/verify", {
                    replace: true,
                    state: {email: values.email, previousRoute: currentRoute},
                });
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                setIsSubmitting(false);

                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.message,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <Form
                layout="vertical"
                onFinish={onFormSubmit}
                className="w-full max-w-[440px] rounded md:shadow-xl lg:p-10 md:p-6 md:bg-white md:border border-cD9">
                <div className="mb-6 text-center">
                    <FormTitle
                        isCenter={true}
                        title={"Forgot Password"}
                        desc={
                            "Please enter your email address to verify your account."
                        }
                    />
                </div>
                <Form.Item
                    validateTrigger={"onSubmit"}
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Email address is required!",
                        },
                        {
                            type: "email",
                            pattern: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Enter valid email address!",
                        },
                    ]}
                >
                    <Input type="email" placeholder="Enter your email address"/>
                </Form.Item>

                <SubmitBtn label={"Confirm"} isLoading={isSubmitting}/>
            </Form>
        </section>
    );
};

export default EmailVerificationForm;
