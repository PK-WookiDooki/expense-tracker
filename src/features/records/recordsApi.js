import { baseApi } from "../../app/global/baseApi";

const endPoint = "/transactions";

export const recordsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRecords: builder.query({
            query: ({ startDate, endDate, keyword, token }) => ({
                url: `${endPoint}?startDate=${startDate}&endDate=${endDate}&filter=${keyword}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["records"],
        }),

        getAllExpenses: builder.query({
            query: ({ selectedMonth, token }) => ({
                url: `${endPoint}?selectedMonth=${selectedMonth}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["records", "user"],
        }),

        addNewRecord: builder.mutation({
            query: ({ record, token }) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: { authorization: `Bearer ${token}` },
                body: record,
            }),
            invalidatesTags: ["records", "user"],
        }),

        updateRecord: builder.mutation({
            query: ({ record, token }) => ({
                url: `${endPoint}`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: record,
            }),
            invalidatesTags: ["records"],
        }),

        deleteRecord: builder.mutation({
            query: ({ recordId, token }) => ({
                url: `${endPoint}`,
                method: "DELETE",
                headers: { authorization: `Bearer ${token}` },
                body: { recordId },
            }),
            invalidatesTags: ["records"],
        }),

        getRecordById: builder.query({
            query: ({ recordId, token }) => ({
                url: `${endPoint}/${recordId}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["records"],
        }),
    }),
});

export const {
    useGetAllRecordsQuery,
    useAddNewRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation,
    useGetRecordByIdQuery,
    useGetAllExpensesQuery,
} = recordsApi;