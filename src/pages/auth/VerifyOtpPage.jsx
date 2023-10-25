import {VerifyOtpForm} from "@/features";
import verifyImg from "@/assets/imgs/img_verify.svg";
import {AdvertText} from "@/components";

const VerifyOtpPage = () => {
    return (
        <section
            className="w-full flex min-h-screen relative lg:bg-[url('@/assets/imgs/img_bg.svg')] bg-[url('@/assets/imgs/img_bgMobile.svg')] lg:bg-center bg-cover bg-no-repeat ">
            <div
                className=" flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto lg:px-[150px] gap-9 md:gap-28 lg:gap-[200px] py-8 lg:py-0">
                <div className=" w-full flex flex-col text-white lg:pb-14">
                    <img
                        src={verifyImg}
                        alt="Verification Image"
                        className=" mt-auto max-w-[500px] md:w-full w-[70%] mx-auto lg:mx-0 "
                    />
                    <AdvertText/>
                </div>
                <VerifyOtpForm/>
            </div>
        </section>
    );
};

export default VerifyOtpPage;
