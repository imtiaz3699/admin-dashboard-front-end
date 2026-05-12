import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useApi } from '../../context/apiFuncContext';
import { useUser } from '../../context/userContext';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Button from '../../components/ui/button/Button';
import Select from '../../components/form/Select';
import Switch from '../../components/form/switch/Switch';
import DropzoneComponent from '../../components/form/form-elements/DropZone';


export interface Options {
    _id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

const mapBackendErrorsToFormik = (errors: any[]) => {
    const formattedErrors: Record<string, string> = {};

    errors.forEach((err) => {
        formattedErrors[err.path] = err.msg;
    });

    return formattedErrors;
};

function AddProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { postRequest, getRequest, putRequest, deleteRequest } = useApi();
    const { user, setShowToaster } = useUser();
    const [categoryOptions, setCategoryOptions] = useState([{
        label: "",
        value: ""
    }])
    const [brandOptions, setBrandOptions] = useState([
        {
            label: "",
            value: ""
        }
    ])
    const formik = useFormik({
        initialValues: {
            name: "",
            barcode: "",
            category: "",
            brand: "",
            unit: "",
            costPrice: "",
            sellingPrice: "",
            isActive: false,
            error: "",
            files: []
        },
        enableReinitialize: true,
        // validationSchema,
        onSubmit: async (values, { }) => {
            try {
                if (id) {
                    const res = await putRequest(`/api/product/update-product/${id}`, values, true);
                    if (res?.status === 200) {
                        setShowToaster({
                            show: true,
                            message: res?.message,
                            error: false
                        })
                        // navigate('/product');
                    }
                } else {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("barcode", values.barcode);
                    formData.append("category", values.category);
                    formData.append("brand", values.brand);
                    formData.append("unit", values.unit);
                    formData.append("costPrice", values.costPrice);
                    formData.append("sellingPrice", values.sellingPrice);
                    formData.append("isActive", String(values.isActive));

                    // files (important: loop)
                    values.files.forEach((file: File) => {
                        formData.append("files", file);
                    });
                    const res = await postRequest('/api/product/create-product', formData, true, {}, "formData");
                    console.log(res, 'fasdflajshdlfakjshdlfjaskd')
                    if (res.message === "Product created") {
                        setShowToaster({
                            show: true,
                            message: res?.message,
                            error: false
                        })
                        navigate('/dashboard/product');
                    }
                }

            } catch (error: any) {
                console.log(error?.response?.data, 'ffasdfdsalsdfjalds');
                const backendErrors = error?.response?.data?.errors;

                if (Array.isArray(backendErrors)) {
                    const formikErrors = mapBackendErrorsToFormik(backendErrors);
                    formik.setErrors(formikErrors);
                }
                // formik.setFieldValue('error', error?.response?.data?.message)
            }
        }
    })
    const fetchData = async () => {
        try {
            const categories = await getRequest('/api/category/all-categories');
            const brands = await getRequest("/api/brand/all-brands");
            const resBrands = brands?.data?.map((brand: Options) => {
                return {
                    label: brand?.name,
                    value: brand?._id
                }
            })
            const res = categories?.data?.map((category: Options) => {
                return {
                    label: category?.name,
                    value: category?._id
                }
            })
            setCategoryOptions(res);
            setBrandOptions(resBrands);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const fetchProduct = async () => {
        try {
            const res = await getRequest(`/api/product/get-single-product/${id}`);
            console.log(res, 'IamResponsible')
            if (res?._id) {

                const convertedFiles = res?.productImages?.map((url: string) => {
                    const file = new File([], "image.jpg", { type: "image/jpeg" });
                    Object.defineProperty(file, "preview", {
                        value: url?.url,
                    });
                    return file;
                });
                formik.setValues({
                    name: res?.name,
                    barcode: res?.barcode,
                    category: res?.category,
                    brand: res?.brand,
                    unit: res?.unit,
                    costPrice: res?.costPrice,
                    sellingPrice: res?.sellingPrice,
                    isActive: res?.isActive,
                    files: [...convertedFiles],
                    error: "",
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id])

    console.log(formik.values?.files, 'flakjfhdlakjhdfkajsdfasdfasd')
    return (
        <form className='w-full' onSubmit={formik.handleSubmit}>
            <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Product</h1>

            <DropzoneComponent files={formik.values.files} setFiles={(files) => formik.setFieldValue("files", files)} />
            <div className=' w-full flex flex-col gap-5 mt-10'>
                <div className='flex flex-row items-center gap-5'>
                    <InputWithLabel
                        label='Name'
                        name='name'
                        required={true}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.name && formik.errors.name ? true : false}
                        errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    />
                    <InputWithLabel label='Barcode' name='barcode'
                        required={true}
                        value={formik.values.barcode}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.barcode && formik.errors.barcode ? true : false}
                        errorMessage={formik.touched.barcode && formik.errors.barcode ? formik.errors.barcode : ""}
                    />
                </div>
                <div className='flex flex-row items-center gap-5 w-full'>
                    <Select
                        label="Brand"
                        name="brand"
                        options={brandOptions}
                        value={formik.values.brand}
                        onChange={(value) => formik.setFieldValue("brand", value)}
                        errors={formik.touched.brand && formik.errors.brand || ""}
                    />
                    <Select
                        label="Category"
                        name="category"
                        options={categoryOptions}
                        value={formik.values.category}
                        onChange={(value) => formik.setFieldValue("category", value)}
                        errors={formik.touched.brand && formik.errors.brand || ""}
                    />
                </div>
                <div className='flex flex-row items-center gap-5 w-full'>
                    <Select
                        label="Unit"
                        name='category'
                        value={formik.values.unit}
                        options={[{ label: "KG", value: "KG", }, { label: "PCS", value: "PCS", }, { label: "BOX", value: "BOX", }]}
                        placeholder='Select Category'
                        onChange={(value) => formik.setFieldValue("unit", value)}
                        errors={formik.touched.unit && formik.errors.unit || ""}
                    />
                    <InputWithLabel label='Cost Price' name='costPrice'
                        required={true}
                        value={formik.values.costPrice}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.costPrice && formik.errors.costPrice ? true : false}
                        errorMessage={formik.touched.costPrice && formik.errors.costPrice ? formik.errors.costPrice : ""}
                        type="number"
                    />
                </div>
                <div className='flex flex-row items-center gap-5 w-full'>
                    <InputWithLabel label='Selling Price' name='sellingPrice'
                        required={true}
                        value={formik.values.sellingPrice}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched.sellingPrice && formik.errors.sellingPrice ? true : false}
                        errorMessage={formik.touched.sellingPrice && formik.errors.sellingPrice ? formik.errors.sellingPrice : ""}
                        type="number"
                    />
                    <Switch label="Is Active" name="isActive" checked={formik.values.isActive} onChange={formik.handleChange} />
                </div>
                <div className='w-full'>
                    <div className='text-red-500'>{formik.values.error}</div>
                    <div className='flex flex-row items-end gap-5 justify-end '>
                        <Button type="submit" size="sm" variant="primary" disabled={formik.isSubmitting}>
                            Submit
                        </Button>
                        <Button onClick={() => navigate('/product')} size="sm" variant="outline">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProduct
