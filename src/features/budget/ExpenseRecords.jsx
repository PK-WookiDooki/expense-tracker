import { useSelector } from "react-redux";
import { RecordCard } from "..";
import { formatData } from "../../core/functions/formatData";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ExpenseRecords = ({ selectedMonth, setSelectedMonth }) => {
    const { recordsList } = useSelector((state) => state.recordsSlice);

    const [isASC, setIsASC] = useState(false);
    const expensesList = recordsList?.filter(
        (record) => record.type === "EXPENSE"
    );
    const [expenseRecords, setExpenseRecords] = useState(
        formatData(expensesList)
    );

    useEffect(() => {
        const records = formatData(expensesList);
        if (isASC) {
            setExpenseRecords(
                records
                    .slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
            );
        } else {
            setExpenseRecords(
                records
                    .slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
            );
        }
    }, [isASC]);

    return (
        <section className="md:p-10 p-4 rounded-2xl bg-whiteGray flex flex-col gap-9 h-full">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium"> Transactions </h2>
                <div className="flex items-center gap-2 ">
                    <button
                        onClick={() => setIsASC(!isASC)}
                        className="min-w-[40px] h-10 border border-gray rounded-md bg-white flex items-center justify-center"
                    >
                        {" "}
                        <i className="material-symbols-outlined">
                            swap_vert
                        </i>{" "}
                    </button>
                    <DatePicker.MonthPicker
                        defaultValue={selectedMonth}
                        format={"MMMM YYYY"}
                        onChange={(value) => setSelectedMonth(value)}
                        className=" md:!w-60"
                    />
                </div>
            </div>

            {expenseRecords?.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {expenseRecords?.map((record) => (
                        <RecordCard key={record?.id} record={record} />
                    ))}
                </div>
            ) : (
                <div className=" h-full flex items-center justify-center">
                    {" "}
                    <h3 className="text-2xl font-medium text-lightGray">
                        There is no transactions for now!
                    </h3>{" "}
                </div>
            )}
        </section>
    );
};

export default ExpenseRecords;