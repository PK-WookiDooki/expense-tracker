import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { FormTitle, SubmitBtn } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { useResendOtpMutation, useVerifyOtpMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/global/globalSlice";

const VerifyOtpForm = () => {
    const { email, previousRoute } = useLocation().state;
    const [otp, setOtp] = useState("");
    const [isResent, setIsResent] = useState(false);
    const [timer, setTimer] = useState(59);
    const [error, setError] = useState("");
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [verifyOtp] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const onVerify = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await verifyOtp({ email, otp });
            console.log(error);
            if (data?.success) {
                if (previousRoute === "/signUp") {
                    dispatch(
                        setMessage({
                            msgType: "success",
                            msgContent: "Account registered successfully!",
                        })
                    );
                    nav("/signIn", { replace: true });
                } else if (previousRoute === "/signIn/forgotPassword") {
                    dispatch(
                        setMessage({
                            msgType: "success",
                            msgContent: "Email verified successfully!",
                        })
                    );
                    nav("/signIn/createNewPassword", {
                        replace: true,
                        state: email,
                    });
                }
            } else {
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        if (isResent === true) {
            setTimeout(() => {
                setIsResent(false);
            }, 60000);
        }

        const counter =
            isResent &&
            timer > 0 &&
            setInterval(() => setTimer(timer - 1), 1000);
        return () => clearInterval(counter);
    }, [timer, isResent]);

    const onResendOtp = async () => {
        setIsResent(true);
        try {
            const { data, error } = await resendOtp(email);
            if (data?.success) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="w-full flex flex-col items-center justify-center">
            <form
                onSubmit={onVerify}
                className="w-full max-w-[440px] md:shadow-md md:p-10 p-4 md:bg-white/80"
            >
                <div className="mb-8 text-center">
                    <FormTitle
                        title={"Verify Email"}
                        desc={
                            <>
                                {" "}
                                Please enter the verification code sent to{" "}
                                <span className="font-bold">{email}</span>.
                            </>
                        }
                    />
                </div>

                {/*{error?.trim().length > 0 ? (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="mb-3"
                    />
                ) : (
                    ""
                )}*/}

                <OTPInput
                    value={otp}
                    onChange={(code) => setOtp(code)}
                    numInputs={6}
                    containerStyle={"otp-form"}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                />

                <div className="flex flex-col my-8 gap-1 items-center">
                    <p>Do not receive an OTP?</p>
                    <p className={`text-xl ${isResent ? "block" : "hidden"} `}>
                        {" "}
                        {timer} s{" "}
                    </p>
                    <button
                        onClick={onResendOtp}
                        type="button"
                        disabled={isResent}
                        className={` ${
                            isResent
                                ? " text-primaryBlue/20 "
                                : "text-primaryBlue"
                        } `}
                    >
                        {" "}
                        Resend OTP{" "}
                    </button>
                </div>

                <SubmitBtn label={"Verify"} />
            </form>
        </section>
    );
};

export default VerifyOtpForm;