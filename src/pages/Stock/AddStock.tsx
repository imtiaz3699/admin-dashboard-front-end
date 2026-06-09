import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router';
import * as Yup from "yup";
import { useApi } from '../../context/apiFuncContext';
import Select from '../../components/form/Select';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../context/userContext';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Button from '../../components/ui/button/Button';
import DatePicker from 'react-flatpickr';
function AddStock() {
    const { id } = useParams();
    console.log(id, 'fadslfhlasdjfhlasjdfhlajskd')
    const isEditMode = Boolean(id);
    const { postRequest, getRequest, putRequest } = useApi();
    const navigate = useNavigate();
    const { user } = useUser();
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
            createdBy: user?._id,
            updatedBy: user?._id
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
                    if (res) {
                        navigate('/dashboard/stock');
                    }
                } else {
                    res = await postRequest(
                        `/api/stock/create-stock`,
                        payload,
                        true
                    );
                    if (res) {
                        navigate('/dashboard/stock');
                    }

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
    const fetchLists = async () => {
        try {
            const branches = await getRequest(`/api/branch/get-branches?page=1&limit=1000`)
            let products = null;
            if (formik.values.branchId) {
                products = await getRequest(`/api/stock/available-products/${formik.values.branchId}`)
            }
            return { branches, products };
        } catch (e) {
            console.log(e);
        }
    }
    const { data } = useQuery({
        queryKey: ["add-stock-form-data", formik.values.branchId],
        queryFn: fetchLists,
    })
    const branchesOptions = data?.branches?.data?.map((branch: any) => ({
        label: branch?.name,
        value: branch?._id
    })) || [];
    const productsOptions = data?.products?.data?.map((product: any) => ({
        label: product?.name,
        value: product?._id
    })) || [];

    const fetchSingleStockDetails = async () => {
        try {
            const res = await getRequest(`/api/stock/get-stock/${id}`);
            console.log(res, 'fasdlfjahdlIamResponsible')
            if (res?._id) {
                formik.setValues({
                    productId: res?.productId || "",
                    branchId: res?.branchId || "",
                    quantity: res?.quantity || 0,
                    reservedQty: res?.reservedQty || 0,
                    damagedQty: res?.damagedQty || 0,
                    minStockLevel: res?.minStockLevel || 0,
                    maxStockLevel: res?.maxStockLevel || 0,
                    averageCostPrice: res?.averageCostPrice || 0,
                    lastPurchasePrice: res?.lastPurchasePrice || 0,
                    stockValue: res?.stockValue || 0,
                    status: res?.status || "in_stock",
                    lastStockInAt: res?.lastStockInAt || "",
                    createdBy: res?.createdBy || "",
                    updatedBy: res?.updatedBy || ""
                })
            }
        } catch (e) {
            console.log(e);

        }
    }
    useEffect(() => {
        if (id) {
            fetchSingleStockDetails();
        }
    }, [id])
    return (
        <form onSubmit={formik.handleSubmit} className='w-full space-y-5'>
            <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Stock</h1>
            <div className='flex flex-row items-center gap-5'>
                <Select
                    label="Branch Name"
                    options={branchesOptions}
                    value={formik.values.branchId}
                    onChange={(value: string) => formik.setFieldValue("branchId", value)}
                    name='branchId'
                    required={true}
                    errors={formik.touched?.branchId && formik.errors?.branchId ? formik.errors?.branchId : ""}
                />
                <Select
                    label="Product Name"
                    disabled={id !== undefined}
                    options={productsOptions}
                    value={formik.values.productId}
                    onChange={(value) => formik.setFieldValue("productId", value)}
                    name='productId'
                    required={true}
                    errors={formik.touched?.productId && formik.errors?.productId ? formik.errors?.productId : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Quantity'
                    name='quantity'
                    required={true}
                    type='number'
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.quantity && formik.errors.quantity ? true : false}
                    errorMessage={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                />
                <InputWithLabel
                    label='Reserved Quantity'
                    name='reservedQty'
                    required={true}
                    type='number'
                    value={formik.values.reservedQty}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.reservedQty && formik.errors.reservedQty ? true : false}
                    errorMessage={formik.touched.reservedQty && formik.errors.reservedQty ? formik.errors.reservedQty : ""}
                />
                <InputWithLabel
                    label='Damaged Quantity'
                    name='damagedQty'
                    required={true}
                    type='number'
                    value={formik.values.damagedQty}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.damagedQty && formik.errors.damagedQty ? true : false}
                    errorMessage={formik.touched.damagedQty && formik.errors.damagedQty ? formik.errors.damagedQty : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Min Stock Level'
                    name='minStockLevel'
                    required={true}
                    type='number'
                    value={formik.values.minStockLevel}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.minStockLevel && formik.errors.minStockLevel ? true : false}
                    errorMessage={formik.touched.minStockLevel && formik.errors.minStockLevel ? formik.errors.minStockLevel : ""}
                />
                <InputWithLabel
                    label='Max Stock Level'
                    name='maxStockLevel'
                    required={true}
                    type='number'
                    value={formik.values.maxStockLevel}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.maxStockLevel && formik.errors.maxStockLevel ? true : false}
                    errorMessage={formik.touched.maxStockLevel && formik.errors.maxStockLevel ? formik.errors.maxStockLevel : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Average Cost Price'
                    name='averageCostPrice'
                    required={true}
                    type='number'
                    value={formik.values.averageCostPrice}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.averageCostPrice && formik.errors.averageCostPrice ? true : false}
                    errorMessage={formik.touched.averageCostPrice && formik.errors.averageCostPrice ? formik.errors.averageCostPrice : ""}
                />
                <InputWithLabel
                    label='Last Purchase Price'
                    name='lastPurchasePrice'
                    required={true}
                    type='number'
                    value={formik.values.lastPurchasePrice}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.lastPurchasePrice && formik.errors.lastPurchasePrice ? true : false}
                    errorMessage={formik.touched.lastPurchasePrice && formik.errors.lastPurchasePrice ? formik.errors.lastPurchasePrice : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Stock Value'
                    name='stockValue'
                    required={true}
                    type='number'
                    value={formik.values.stockValue}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.stockValue && formik.errors.stockValue ? true : false}
                    errorMessage={formik.touched.stockValue && formik.errors.stockValue ? formik.errors.stockValue : ""}
                />
                <div className='flex flex-col'>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400'>Last Stock In Date</label>
                    <DatePicker name="lastStockInAt"
                        value={formik.values.lastStockInAt}
                        onChange={(date) =>
                            formik.setFieldValue("lastStockInAt", date)
                        } className='border-[1px] h-11 rounded-lg border-gray-300 px-5' placeholder='Select Date' />
                </div>
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
    )
}

export default AddStock
