import {
    Alert,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Segmented,
    Select,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FixWButton } from "../../components";

const EditRecordForm = ({ record, date }) => {
    const { categoriesList } = useSelector((state) => state.categoriesSlice);
    const [form] = Form.useForm();

    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [type, setType] = useState(record?.type);

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError(null);
            }, 3000);
        }

        if (record) {
            form.setFieldValue("type", record?.type);
            form.setFieldValue("amount", record?.amount);
            form.setFieldValue("createdDate", dayjs(date));
            form.setFieldValue("userCategoryId", record?.userCategory);
            form.setFieldValue("description", record?.description);
        }
    }, [error, record]);

    const catOptions = categoriesList
        ?.filter((category) => category?.type === type)
        .map((category) => {
            return {
                label: (
                    <p className="flex items-center gap-1 capitalize">
                        <i className="material-symbols-outlined">
                            {category.icon}
                        </i>{" "}
                        {category.categoryName}{" "}
                    </p>
                ),
                value: category.id,
            };
        });

    const onFormSubmit = (values) => {
        const formattedDate = dayjs(values?.createdDate).format("YYYY-MM-DD");
        delete values.createdDate;

        const transaction = {
            ...values,
            createdDate: formattedDate,
        };
        console.log(transaction);
        closeModal();
    };

    const closeModal = () => {
        setError(null);
        setOpenModal(false);
    };

    return (
        <section className="flex">
            <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-primaryBlue menu-item "
            >
                {" "}
                Edit
            </button>

            <Modal
                centered
                footer={null}
                open={openModal}
                onCancel={closeModal}
                width={950}
                closeIcon={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFormSubmit}
                    className="!font-sans py-5"
                >
                    <h2 className="text-xl font-medium mb-10 text-center ">
                        {" "}
                        Edit Record{" "}
                    </h2>

                    {error !== null ? (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="mb-3"
                        />
                    ) : (
                        ""
                    )}
                    <Form.Item name={"type"}>
                        <Segmented
                            options={[
                                {
                                    label: "Expense",
                                    value: "EXPENSE",
                                },
                                {
                                    label: "Income",
                                    value: "INCOME",
                                },
                            ]}
                            className="w-full"
                            size="large"
                            block
                            onChange={(value) => setType(value)}
                        />
                    </Form.Item>
                    <div className="flex flex-col md:flex-row md:gap-10  ">
                        <div className="w-full">
                            <Form.Item
                                label={"Amount"}
                                name={"amount"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Amount is required!",
                                    },
                                    {
                                        type: "number",
                                        message: "Enter valid value!",
                                    },
                                ]}
                            >
                                <InputNumber className="flex flex-col justify-center !w-full" />
                            </Form.Item>
                            <Form.Item
                                label="Date"
                                name={"createdDate"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Date is required!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    className="default-input shadow-none "
                                    format={"DD-MM-YYYY"}
                                    allowClear={false}
                                />
                            </Form.Item>{" "}
                            <Form.Item
                                label="Category"
                                name={"userCategoryId"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Category is required!",
                                    },
                                ]}
                            >
                                <Select options={categoriesList} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Note"
                            name={"description"}
                            className="w-full note-input h-40 md:h-auto"
                        >
                            <Input.TextArea className="!resize-none" />
                        </Form.Item>
                    </div>

                    <div className="mt-9 flex gap-10 items-center justify-center">
                        <FixWButton
                            isButton={true}
                            event={closeModal}
                            label={"cancel"}
                            htmlType={"button"}
                            buttonType={"default"}
                        />
                        <FixWButton
                            label={"confirm"}
                            htmlType={"submit"}
                            buttonType={"primary"}
                            isButton={true}
                        />
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default EditRecordForm;