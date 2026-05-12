import React, { useEffect } from 'react'
import { useApi } from '../../../context/apiFuncContext';
import { useFormik } from 'formik';
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import Switch from '../../../components/form/switch/Switch';
import Button from '../../../components/ui/button/Button';

interface EditBrand {
    name: string,
    description: string,
    isActive: boolean
    _id: string
}
function AddBrand({ editBrand, setEditBrand, handleClose }: { editBrand: EditBrand, setEditBrand: React.Dispatch<React.SetStateAction<EditBrand>>, handleClose: () => void }) {
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
                if (editBrand?._id) {
                    const res = await putRequest(`/api/brand/update-brand/${editBrand?._id}`, values, true);
                    if (res) {
                        handleClose();
                    }
                } else {
                    const res = await postRequest("/api/brand/create-brand", values, true);
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
        if (editBrand?._id) {
            formik.setValues({
                name: editBrand?.name,
                description: editBrand?.description,
                isActive: editBrand?.isActive,
            })
        }
    }, [editBrand?._id])
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
                    <Button variant="primary">{editBrand?._id ? "Update" : "Create"}</Button>
                </div>
            </form>
        </div>
    )
}

export default AddBrand
