import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../context/apiFuncContext';
import Select from '../../components/form/Select';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Button from '../../components/ui/button/Button';
import { useNavigate, useParams } from 'react-router';
import * as Yup from 'yup';
import { useUser } from '../../context/userContext';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

export const stockMovementSchema = Yup.object().shape({
    productId: Yup.string().required("Product is required"),

    branchId: Yup.string().required("Branch is required"),

    type: Yup.string()
        .oneOf(["IN", "OUT", "TRANSFER", "DAMAGE"])
        .required("Type is required"),

    quantity: Yup.number()
        .typeError("Quantity must be a number")
        .positive("Quantity must be greater than 0")
        .required("Quantity is required"),

    referenceType: Yup.string()
        .oneOf(["SALE", "PURCHASE", "TRANSFER", "ADJUSTMENT"])
        .required("Reference type is required"),

    referenceId: Yup.string().nullable(),

    fromBranchId: Yup.string().when(["type", "referenceType"], {
        is: (type: string, referenceType: string) => (type === "TRANSFER") || (type === "OUT" && referenceType !== "SALE"),
        then: (schema) => schema.required("From branch is required"),
        otherwise: (schema) => schema.nullable(),
    }),

    toBranchId: Yup.string().when("type", {
        is: "TRANSFER",
        then: (schema) => schema.required("To branch is required"),
        otherwise: (schema) => schema.nullable(),
    }),

    costPrice: Yup.number()
        .typeError("Cost price must be a number")
        .min(0, "Cost price cannot be negative")
        .required("Cost price is required"),

    sellingPrice: Yup.number()
        .typeError("Selling price must be a number")
        .min(0, "Selling price cannot be negative")
        .required("Selling price is required"),

    userId: Yup.string().required("User is required"),
});
function StockOut({ stock }: { stock: "IN" | "OUT" | "TRANSFER" }) {
    const [messageApi, contextHolder] = message.useMessage();


    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { getRequest, postRequest } = useApi();
    const { user } = useUser();
    const { id } = useParams();
    const [availableQuqntity, setAvailableQuantity] = React.useState(0);


    const formik = useFormik({
        initialValues: {
            productId: "",
            branchId: "",
            type: "OUT",
            quantity: "",
            referenceType: "",
            referenceId: "",
            fromBranchId: "",
            toBranchId: "",
            costPrice: "",
            sellingPrice: "",
            userId: user?._id
        },
        validationSchema: stockMovementSchema,

        onSubmit: async (values) => {
            console.log(values, 'values submitted')
            const payload = {
                ...values,
                referenceId: values.referenceId || undefined,
                fromBranchId: values.fromBranchId || undefined,
                toBranchId: values.toBranchId || undefined
            }
            try {
                const res = await postRequest("/api/stock-movement/create-stock-movement", payload, true);
                if (res) {
                    formik.resetForm();
                    queryClient.invalidateQueries({
                        queryKey: ['product-list']
                    });
                    queryClient.invalidateQueries({
                        queryKey: ['branches-list']
                    })
                }
            } catch (e: any) {
                messageApi.info(e.response?.data?.error);
                console.error(e, 'fasldfjhasldkfjhasjkd');

            }
        }
    })
    const getBranchesList = async () => {
        try {
            const res = await getRequest("/api/branch/get-branches");
            return res;
        } catch (e) {
            console.log(e);
        }
    }


    const getProductList = async () => {
        try {
            let type = formik.values.referenceType;
            let branchId = type === "SALE" ? formik.values.branchId : formik.values.fromBranchId;
            const res = await getRequest(`/api/stock/available-products-per-branch/${branchId}`);;
            return res?.data;
        } catch (e) {
            console.log(e);
        }
    }


    const productList = useQuery({
        queryKey: ['product-list', formik.values.branchId, formik.values.fromBranchId],
        queryFn: getProductList,
        enabled: !!formik.values.branchId || !!formik.values.fromBranchId
    });
    console.log(productList?.data, 'faldfhlaksjdfhlasjkdfhlakjsfd')
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
    const productOption = productList?.data?.map((product: any) => {
        return {
            label: product?.productId?.name,
            value: product?.productId?._id
        }
    });

    const referenceTypeOptions = [
        stock === "OUT" && {
            label: "SALE",
            value: "SALE",
        },
        stock === "IN" && {
            label: "PURCHASE",
            value: "PURCHASE"
        },
        {
            label: "TRANSFER",
            value: "TRANSFER"
        },
    ].filter(Boolean)



    React.useEffect(() => {
        const totalQuantity = productList?.data?.find((product: any) => product?.productId?._id === formik.values.productId)?.quantity;
        const costPrice = productList?.data?.find((product: any) => product?.productId?._id === formik.values.productId)?.productId?.costPrice;
        formik.setFieldValue("quantity", totalQuantity);
        formik.setFieldValue("costPrice", costPrice);
    }, [formik.values.productId])

    console.log(formik.errors, 'fadlfjhasldkfjhalsdjkfhlaksdjfhasjd')
    return (
        <>
            {contextHolder}
            <form onSubmit={formik.handleSubmit} className='w-full space-y-5' >
                <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Stock Movement</h1>
                <div className='flex flex-row items-center gap-5'>
                    <Select
                        label="Select Branch"
                        options={branchOptions || []}
                        value={formik.values.branchId}
                        onChange={(value) => formik.setFieldValue("branchId", value)}
                        name='branchId'
                        required={true}
                        errors={formik.touched?.branchId && formik.errors?.branchId ? formik.errors?.branchId : ""}
                    />
                    <Select
                        label="Select Product"
                        options={productOption || []}
                        value={formik.values.productId}
                        onChange={(value) => formik.setFieldValue("productId", value)}
                        name='productId'
                        required={true}
                        errors={formik.touched?.productId && formik.errors?.productId ? formik.errors?.productId : ""}
                    />
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <Select
                        label="Reference Type"
                        options={referenceTypeOptions || []}
                        value={formik.values.referenceType}
                        onChange={(value) => formik.setFieldValue("referenceType", value)}
                        name='referenceType'
                        required={true}
                        errors={formik.touched?.referenceType && formik.errors?.referenceType ? formik.errors?.referenceType : ""}
                    />
                </div>
                <div className='flex flex-col items-start gap-1 w-full '>

                    <InputWithLabel label='Quantity' name='quantity'
                        required={true}
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.quantity && formik.errors.quantity ? true : false}
                        errorMessage={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                    />
                    {/* {
          getAvailableStock?.data?.data?._id && <span className='text-xs text-gray-500' >Available Quantity: {getAvailableStock?.data?.data?.quantity || 0} {" "} Damaged Quantity:{getAvailableStock?.data?.data?.damagedQty || 0} {" "} Reserved Quantity: {getAvailableStock?.data?.data?.reservedQty || 0}</span>
        } */}

                </div>
                <div className='flex flex-row items-center gap-5'>
                    {
                        formik.values.referenceType === "TRANSFER" && <Select
                            label="From Branch"
                            options={branchOptions}
                            value={formik.values.fromBranchId}
                            onChange={(value) => formik.setFieldValue("fromBranchId", value)}
                            name='fromBranchId'
                            required={true}
                            errors={formik.touched?.fromBranchId && formik.errors?.fromBranchId ? formik.errors?.fromBranchId : ""}
                        />
                    }
                    {
                        formik.values.referenceType === "TRANSFER" && <Select
                            label="To Branch"
                            options={branchOptions}
                            value={formik.values.toBranchId}
                            onChange={(value) => formik.setFieldValue("toBranchId", value)}
                            name='toBranchId'
                            required={true}
                            errors={formik.touched?.toBranchId && formik.errors?.toBranchId ? formik.errors?.toBranchId : ""}
                        />
                    }
                </div>
                <div className='flex flex-row items-center gap-5'>
                    <InputWithLabel label='Cost Price' name='costPrice'
                        required={true}
                        type="number"
                        value={formik.values.costPrice}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.costPrice && formik.errors.costPrice ? true : false}
                        errorMessage={formik.touched.costPrice && formik.errors.costPrice ? formik.errors.costPrice : ""}
                    />
                    <InputWithLabel label='Selling Price' name='sellingPrice'
                        required={true}
                        type="number"
                        value={formik.values.sellingPrice}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.sellingPrice && formik.errors.sellingPrice ? true : false}
                        errorMessage={formik.touched.sellingPrice && formik.errors.sellingPrice ? formik.errors.sellingPrice : ""}
                    />
                </div>
                <div className='flex flex-row items-center justify-end gap-5'>
                    <Button type='submit' size='md' variant='primary' >
                        {id ? "Update" : "Submit"}
                    </Button>
                    <Button size='md' variant='outline' >
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    )
}

export default StockOut
