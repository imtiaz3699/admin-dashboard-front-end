import { useFormik } from 'formik';
import React from 'react'
import { useApi } from '../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query';
import Select from '../../components/form/Select';
import SearchDropdown from '../../components/form/form-elements/SearchDropDown';
import Button from '../../components/ui/button/Button';
import * as Yup from 'yup';
import { message } from 'antd';
function CreateTransfer() {
    const { getRequest, postRequest } = useApi();
    const [messageApi, contextHolder] = message.useMessage();
    const validationSchema = Yup.object({
        fromBranchId: Yup.string().required("From branch is required."),
        toBranchId: Yup.string().required("To branch is required."),
    })
    const formik = useFormik({
        initialValues: {
            fromBranchId: "",
            toBranchId: "",
            items: [
                { productId: "", quantity: 0, costPrice: 0, sellingPrice: 0, name: "" }
            ]
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const cleardItems = values.items.map(({ name, costPrice, sellingPrice, ...rest }) => rest)
                const payload = { ...values, items: cleardItems }
                const res = await postRequest(`/api/transfer/create-transfer`, payload, true);
            } catch (e: any) {
                console.log(e, "error")
                messageApi.error({
                    content: e?.response?.data?.message,
                });
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
    const branchesData = useQuery({
        queryKey: ['branches-list-2'],
        queryFn: getBranchesList,
        refetchOnMount: true
    })
    const branchOptions = branchesData?.data?.data?.map((branch: any) => {
        return {
            label: branch?.name,
            value: branch?._id
        }
    })
    const fetchProducts = async (query: string) => {
        try {
            const res = await getRequest(`/api/product/search/${formik.values.fromBranchId}/${query}`)
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    console.log(formik.values, 'fasdlfjhasldjkfhalskdjh')
    return (
        <>
        {contextHolder}
            <form onSubmit={formik.handleSubmit} >
                <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Sales</h1>
                <div className='flex flex-row items-center gap-5'>
                    <Select
                        label="Select From Branch"
                        options={branchOptions || []}
                        value={formik.values.fromBranchId}
                        onChange={(value) => formik.setFieldValue("fromBranchId", value)}
                        name='branchId'
                        required={true}
                        errors={formik.touched?.fromBranchId && formik.errors?.fromBranchId ? formik.errors?.fromBranchId : ""}
                    />
                    <Select
                        label="Select To Branch"
                        options={branchOptions?.filter((branch: any) => branch.value !== formik.values.fromBranchId) || []}
                        value={formik.values.toBranchId}
                        onChange={(value) => formik.setFieldValue("toBranchId", value)}
                        name='branchId'
                        required={true}
                        errors={formik.touched?.toBranchId && formik.errors?.toBranchId ? formik.errors?.toBranchId : ""}
                    />
                </div>
                <div className='flex flex-col items-start gap-5 mt-5'>
                    <SearchDropdown
                        branchId={formik.values.fromBranchId}
                        disabled={!formik.values.fromBranchId}
                        module={"transfer"}
                        label="Select Product"
                        fetchOptions={fetchProducts}
                        value={formik.values.items?.[0]?.productId}
                        onChange={(selected) => {
                            const currentItems = formik.values.items || [];

                            // remove empty objects (IMPORTANT FIX)
                            const cleanedItems = currentItems.filter(
                                (i) => i.productId
                            );

                            // prevent duplicate
                            const exists = cleanedItems.some(
                                (i) => i.productId === selected?.product?._id
                            );

                            if (exists) return;

                            formik.setFieldValue("items", [
                                ...cleanedItems,
                                {
                                    productId: selected?.product?._id,
                                    quantity: 1,
                                    costPrice: selected?.product?.costPrice,
                                    sellingPrice: selected?.product?.sellingPrice,
                                    name: selected?.product?.name,

                                },
                            ]);
                        }}
                        placeholder="Search product"
                    />

                    <div className='flex justify-between w-full gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                            {formik.values?.items?.length > 0 &&
                                formik.values.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 p-3 border rounded-lg mb-3"
                                    >
                                        {/* Product Name */}
                                        <div className="text-sm font-semibold text-gray-700">
                                            {item?.name || "Product"}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">

                                            {/* Minus Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const current = formik.values.items[index].quantity || 0;
                                                    if (current <= 0) return;

                                                    formik.setFieldValue(
                                                        `items.${index}.quantity`,
                                                        current - 1
                                                    );
                                                }}
                                                className="px-3 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>

                                            {/* Quantity Input */}
                                            <input
                                                type="number"
                                                value={item?.quantity}
                                                onChange={(e) =>
                                                    formik.setFieldValue(
                                                        `items.${index}.quantity`,
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-20 text-center border rounded"
                                            />

                                            {/* Plus Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const current = formik.values.items[index].quantity || 0;

                                                    formik.setFieldValue(
                                                        `items.${index}.quantity`,
                                                        current + 1
                                                    );
                                                }}
                                                className="px-3 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>


                <div className='flex flex-row items-center justify-end gap-5'>
                    <Button type='submit' size='md' variant='primary' >
                        {"Submit"}
                    </Button>
                    <Button size='md' variant='outline' >
                        Cancel
                    </Button>
                </div>

            </form>
        </>
    )
}

export default CreateTransfer;