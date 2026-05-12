import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import Button from '../../../components/ui/button/Button';
import { useApi } from '../../../context/apiFuncContext';
import Switch from '../../../components/form/switch/Switch';
interface EditCategory {
    name: string,
    description: string,
    isActive: boolean
    _id: string
}
function AddCategory({ editCategory, setEditCategory, handleClose }: { editCategory: EditCategory, setEditCategory: React.Dispatch<React.SetStateAction<EditCategory>>, handleClose: () => void }) {
    const { postRequest, putRequest } = useApi();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            isActive: false
        },
        enableReinitialize: true,
        initialErrors: {
            name: ""
        },
        onSubmit: async (values) => {
            try {
                if (editCategory?._id) {
                    const res = await putRequest(`/api/category/update-category/${editCategory?._id}`, values, true);
                    if (res) {
                        handleClose();
                    }
                } else {
                    const res = await postRequest("/api/category/create-category", values, true);
                    if (res) {
                        handleClose();
                    }

                }

            } catch (e: any) {
                console.log(e?.response?.data?.message, 'fasldfjhaslkdfjhskladjfhlaskdjf');
                formik.setErrors(e?.response?.data?.message);
            }
        },
    });
    // console.log(/formik.errors, 'lasjfhdlasjkdhflajkshdflajskdfjh')
    const handleIsActive = async () => {
        formik.setFieldValue("isActive", !formik.values.isActive);
    }
    useEffect(() => {
        if (editCategory?._id) {
            formik.setValues({
                name: editCategory?.name,
                description: editCategory?.description,
                isActive: editCategory?.isActive,
            })
        }
    }, [editCategory?._id])
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-stasrt gap-5 p-3'>
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
                <InputWithLabel label='description' name='description'
                    required={true}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.description && formik.errors.description ? true : false}
                    errorMessage={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                />
                {
                    formik.errors.name && <p className='text-red-500 text-sm'>{formik.errors.name} </p>
                }
                <Switch label="Active" onChange={handleIsActive} checked={formik.values.isActive} />

                <div className='flex flex-row items-end justify-end gap-3 w-full my-5'>
                    <Button variant="outline" type='submit'>Cancel</Button>
                    <Button variant="primary">{editCategory?._id ? "Update" : "Create"}</Button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory
