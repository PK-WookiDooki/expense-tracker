import {Carousel} from "antd";
import PieChart from "./components/PieChart";
import useFilterData from "./hooks/useFilterData";

const DBPieCharts = ({recordsList}) => {
    const expenseData = useFilterData(recordsList, "EXPENSE");
    const incomeData = useFilterData(recordsList, "INCOME");

    const expenseCatColors = expenseData?.map((item) => item.color);
    const incomeCatColors = incomeData?.map((item) => item.color);

    return (
        <section className="lg:p-8 lg:py-10 md:p-3 md:py-5 p-2 py-4 rounded-2xl bg-cFA relative z-[1] overflow-hidden ">
            <h2 className="md:text-2xl font-medium text-c8C md:mb-8 mb-5 px-2 ">
                Pie Charts Categories
            </h2>
            <Carousel
                dotPosition="top"
                slidesToShow={2}
                slidesToScroll={1}
                draggable={true}
                dots={false}
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            dots: false,
                        },
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                        },
                    },
                ]}
            >
                <PieChart
                    chartTitle={"Expense Structure"}
                    chartData={expenseData}
                    dataColor={expenseCatColors}
                />
                <PieChart
                    chartTitle={"Income Structure"}
                    chartData={incomeData}
                    dataColor={incomeCatColors}
                    extraStyle={"income-chart"}
                />
            </Carousel>
        </section>
    );
};

export default DBPieCharts;
