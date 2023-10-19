import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { AddNewRecordModal } from "../../features";
import { toggleSidebar } from "../../app/global/globalSlice";
import { useGetUserDataQuery } from "../../features/auth/userApi";

const Header = () => {
    const { isSidebarOpen } = useSelector((state) => state.globalSlice);
    const dispatch = useDispatch();
    const handleSidebar = () => {
        dispatch(toggleSidebar(!isSidebarOpen));
    };

    return (
        <header className="lg:pr-14 md:px-8 lg:pt-6 lg:pb-8 p-4 lg:shadow-none shadow flex items-center justify-between lg:justify-end w-full sticky top-0 z-10 lg:bg-lightGreen bg-white">
            <div className="flex items-center gap-5 lg:hidden">
                <button onClick={handleSidebar} className="text-3xl">
                    {" "}
                    {isSidebarOpen ? <RxCross1 /> : <RxHamburgerMenu />}{" "}
                </button>
                <h1 className="text-2xl font-medium">
                    <Link to={"/"}> Nextracker </Link>
                </h1>
            </div>
            <div className="flex items-center gap-2 lg:gap-6">
                <AddNewRecordModal />
                <div className="flex items-center gap-4">
                    <Link
                        to={"/account"}
                        className=" lg:pointer-events-none lg:hidden "
                    >
                        <span className="material-symbols-outlined text-2xl h-10 w-10 rounded-full flex items-center justify-center bg-dark text-whiteGray ">
                            person
                        </span>
                    </Link>
                    <AccountMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;