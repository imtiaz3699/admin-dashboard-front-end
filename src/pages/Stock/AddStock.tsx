import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router';
import * as Yup from "yup";
import { useApi } from '../../context/apiFuncContext';
function AddStock() {
    const id = useParams();
    const isEditMode = Boolean(id);
    const { postRequest, getRequest, putRequest } = useApi();
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            productId: "",
            branchId: "",
            quantity: 0,
            reservedQty: 0,
            damagedQty: 0,
            minStockLevel: 0,
            maxStockLevel: 0,
            averageCostPrice: 0,
            lastPurchasePrice: 0,
            stockValue: 0,
            status: "in_stock",
            lastStockInAt: "",
            createdBy: "",
            updatedBy: ""
        },

        validationSchema: Yup.object({
            productId: Yup.string().required("Product is required"),
            branchId: Yup.string().required("Branch is required"),
            quantity: Yup.number().min(0).required(),
            reservedQty: Yup.number().min(0),
            damagedQty: Yup.number().min(0),
            minStockLevel: Yup.number().min(0),
            maxStockLevel: Yup.number().min(0),
            averageCostPrice: Yup.number().min(0),
            lastPurchasePrice: Yup.number().min(0),
            stockValue: Yup.number().min(0),
            status: Yup.string().oneOf([
                "in_stock",
                "low_stock",
                "out_of_stock"
            ]),
            lastStockInAt: Yup.date().required("Date is required"),
        }),

        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const payload = {
                    ...values,
                    lastStockInAt: values.lastStockInAt
                        ? new Date(values.lastStockInAt).toISOString()
                        : null
                };

                let res;

                if (isEditMode) {
                    res = await putRequest(`/api/stock/update-stock/${id}`, payload, true);
                } else {
                    res = await postRequest(
                        `/api/stock/create-stock`,
                        payload
                    );
                }

                formik.resetForm();

            } catch (error: any) {

                // 🔥 Backend validation errors handling
                if (error.response?.data?.errors) {

                    const backendErrors = {} as any;

                    error.response.data.errors.forEach((err: any) => {
                        backendErrors[err.path] = err.msg;
                    });

                    setErrors(backendErrors);
                }

                console.log(error.response?.data || error.message);

            } finally {
                setSubmitting(false);
            }
        }
    });
    return (
        <form onSubmit={formik.handleSubmit} className = 'w-full space-y-5'>
                
        </form>
    )
}

export default AddStock
