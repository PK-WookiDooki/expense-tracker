import { FloatingBtn } from "../components";
import { CategoriesList } from "../features";
import AddNewCategoryForm from "../features/categories/AddNewCategoryForm";
import { useGetAllIconsQuery } from "../features/categories/categoriesApi";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
    const { token } = useSelector((state) => state.authSlice);

    const { data: iconsList, isLoading: isIconsLoading } =
        useGetAllIconsQuery(token);

    if (isIconsLoading) {
        return (
            <section className="lg:p-10 p-5 bg-whiteGray rounded-2xl flex flex-col gap-8 h-full">
                Categories Loading!
            </section>
        );
    }

    return (
        <section className="lg:p-10 p-5 bg-whiteGray rounded-2xl flex flex-col gap-8 h-full">
            <AddNewCategoryForm iconsList={iconsList} />
            <CategoriesList />
            <FloatingBtn />
        </section>
    );
};

export default CategoriesPage;