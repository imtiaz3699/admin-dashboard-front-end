import React from 'react'
import { useApi } from '../../context/apiFuncContext';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Select from '../../components/form/Select';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Button from '../../components/ui/button/Button';
import * as Yup from 'yup';
export const validationSchema = Yup.object({
    branchId: Yup.string()
        .required("Branch is required"),

    productId: Yup.string()
        .required("Product is required"),

    adjustmentType: Yup.string()
        .required("Adjustment type is required"),

    reason: Yup.string()
        .required("Reason is required"),

    remarks: Yup.string()
        .required("Remarks are required"),

    quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("Quantity is required")
        .moreThan(0, "Quantity must be greater than 0"),
});
function AddAdjustment() {
    const reason = [
        { label: "Damaged", value: "DAMAGED" },
        { label: "Expired", value: "EXPIRED" },
        { label: "Lost", value: "LOST" },
        { label: "Stolen", value: "STOLEN" },
        { label: "Breakage", value: "BREAKAGE" },
        { label: "Quality Rejection", value: "QUALITY_REJECTION" },
        { label: "Supplier Return", value: "SUPPLIER_RETURN" },
        { label: "Internal Use", value: "INTERNAL_USE" },
        { label: "Sample Given", value: "SAMPLE_GIVEN" },

        // Common Reasons
        { label: "Count Correction", value: "COUNT_CORRECTION" },
        { label: "Warehouse Error", value: "WAREHOUSE_ERROR" },

        // Increase Reasons
        { label: "Found Stock", value: "FOUND_STOCK" },
        { label: "Customer Return", value: "CUSTOMER_RETURN" },
        { label: "Transfer Correction", value: "TRANSFER_CORRECTION" },
        { label: "Data Entry Correction", value: "DATA_ENTRY_CORRECTION" },
        { label: "Supplier Extra", value: "SUPPLIER_EXTRA" },
        { label: "Production Output", value: "PRODUCTION_OUTPUT" },

        // Fallback
        { label: "Other", value: "OTHER" },
    ];
    const adjustmentTypes = [
        {
            label: "INCREASE",
            value: "INCREASE",
        },
        {
            label: "DECREASE",
            value: "DECREASE",
        }
    ]
    const { postRequest, getRequest } = useApi()
    const formik = useFormik({
        initialValues: {
            branchId: "",
            productId: '',
            adjustmentType: "",
            reason: "",
            remarks: "",
            quantity: 0,
        },

        onSubmit: async (values) => {
            try {
                const res = await postRequest(`/api/adjustment/create-adjustment`, values,true);
                console.log(res, 'fadlfjasldkfjhalskdjfhlaskdj')
            } catch (e) {
                console.log(e);
            }
        }
    })
    const fetchProducts = async () => {
        try {
            const res = await getRequest(`/api/stock/available-products-per-branch/${formik.values.branchId}`);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    const productList = useQuery({
        queryKey: ['product-lists', formik.values.branchId],
        queryFn: fetchProducts,
        enabled: !!formik.values.branchId
    });

    const getBranchesList = async () => {
        try {
            const res = await getRequest("/api/branch/get-branches");
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    const branchesList = useQuery({
        queryKey: ['branches-list'],
        queryFn: getBranchesList
    });
    const branchOptions = branchesList?.data?.data?.map((branch: any) => {
        return {
            label: branch?.name,
            value: branch?._id
        }
    })
    const productOptions = productList?.data?.data?.map((product: any) => {
        return {
            label: product?.productId?.name,
            value: product?.productId?._id
        }
    })
    console.log(productOptions, 'fadlfjshaldfjhasldjkfhasd')

    return (
        <>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
                <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Adjustment</h1>
                <div className='flex flex-row items-center gap-5'>
                    <Select
                        label="Select Branch"
                        options={branchOptions || []}
                        value={formik.values.branchId}
                        onChange={(value) => formik.setFieldValue("branchId", value)}
                        name="branchId"
                        required={true}
                        errors={formik.touched?.branchId && formik.errors?.branchId ? formik.errors?.branchId : ""}
                    />
                    <Select
                        label="Select Product"
                        options={productOptions || []}
                        value={formik.values.productId}
                        onChange={(value) => formik.setFieldValue("productId", value)}
                        name="productId"
                        required={true}
                        errors={formik.touched?.productId && formik.errors?.productId ? formik.errors?.productId : ""}
                    />
                </div>
                <div className='flex flex-row items-center gap-5'>

                    <Select
                        label="Reason"
                        options={reason || []}
                        value={formik.values.reason}
                        onChange={(value) => formik.setFieldValue("reason", value)}
                        name="reason"
                        required={true}
                        errors={formik.touched?.reason && formik.errors?.reason ? formik.errors?.reason : ""}
                    />
                    <Select
                        label="Adjustment Type"
                        options={adjustmentTypes || []}
                        value={formik.values.adjustmentType}
                        onChange={(value) => formik.setFieldValue("adjustmentType", value)}
                        name="adjustmentType"
                        required={true}
                        errors={formik.touched?.adjustmentType && formik.errors?.adjustmentType ? formik.errors?.adjustmentType : ""}
                    />
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <InputWithLabel label='Remarks' name='remarks'
                        required={true}
                        type="text"
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.remarks && formik.errors.remarks ? true : false}
                        errorMessage={formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : ""}
                    />
                    <InputWithLabel label='Quantity' name='quantity'
                        required={true}
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.quantity && formik.errors.quantity ? true : false}
                        errorMessage={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                    />
                </div>
                <div className='flex flex-row items-center justify-end gap-5 mt-5'>
                    <Button type='submit' size='md' variant='primary' >
                        Submit
                    </Button>
                    <Button size='md' variant='outline' >
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    )
}

export default AddAdjustment
