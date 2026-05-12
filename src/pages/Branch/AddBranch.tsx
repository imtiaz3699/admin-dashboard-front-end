import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import Select from '../../components/form/Select';
import DatePicker from 'react-flatpickr';
import Button from '../../components/ui/button/Button';
import { useUser } from '../../context/userContext';
import { useApi } from '../../context/apiFuncContext';
import { useQuery } from '@tanstack/react-query';
import { convertToISODate } from '../../components/common/helperFunctions';
import { useNavigate, useParams } from 'react-router';
const branchTypes = [{
    label: "Branch",
    value: 'branch'
},
{
    label: "Warehouse",
    value: "warehouse"
},
{
    label: "Head Office",
    value: "headoffice"
}
];
const status = [{
    label: "Active",
    value: "active"
},
{
    label: "Inactive",
    value: 'inactive'
}]
function AddBranch() {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const { getRequest, postRequest, putRequest } = useApi()
    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            phone: "",
            email: "",
            managerId: "",
            address: {
                city: "",
                area: ""
            },
            status: "",
            openingDate: "",
            createdBy: user?._id,
            updatedBy: user?._id
        },
        onSubmit: async (values) => {
            try {
                if (id) {
                    const res = await putRequest(`/api/branch/update-branch/${id}`,
                        { ...values, openingDate: convertToISODate(values.openingDate) }, true);
                    if (res) {
                        navigate('/dashboard/branch');
                    }
                } else {
                    const res = await postRequest('/api/branch/create-branch',
                        { ...values, openingDate: convertToISODate(values.openingDate) }, true);
                    if (res) {
                        navigate('/dashboard/branch');
                    }
                }


            } catch (e) {
                console.log(e);
            }
        }
    })

    const getAllManagers = async () => {
        try {
            const res = await getRequest(`/api/auth/get-all-managers`);
            return res;
        } catch (e) {
            console.log(e);
        }
    }
    const managers = useQuery({
        queryKey: ["managers"],
        queryFn: getAllManagers
    })

    console.log(managers?.data, 'fasdlfjashdlfjkshaldfjhalsdfjklas')
    const managerOptions = managers?.data?.map((element: any, idx: number) => {
        return {
            label: element?.name,
            value: element?._id
        }
    })
    const getSingleBranch = async () => {
        try {
            const res = await getRequest(`/api/branch/get-branch/${id}`);
            formik.setValues({
                name: res?.name,
                type: res?.type,
                phone: res?.phone,
                email: res?.email,
                managerId: res?.managerId,
                address: {
                    city: res?.address?.city,
                    area: res?.address?.area
                },
                status: res?.status,
                openingDate: res?.openingDate,
                createdBy: res?.createdBy,
                updatedBy: res?.updatedBy
            });
            console.log(res, 'fasdlfjshaldkfjhasldjfhlasjkdfhlsjda')
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (id) {
            getSingleBranch();
        }
    }, [])
    console.log(convertToISODate(formik.values.openingDate), 'asdflajshdlfjhasldkfjhalsjfsdafsda')
    return (
        <form onSubmit={formik.handleSubmit} className='w-full space-y-5' >
            <h1 className='flex cursor-pointer text-nowrap select-none items-center gap-3 text-2xl mb-5 font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400'>Add Product</h1>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Branch Name'
                    name='name'
                    required={true}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                />
                <InputWithLabel label='Email' name='email'
                    required={true}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.email && formik.errors.email ? true : false}
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <InputWithLabel
                    label='Phone Number'
                    name='phone'
                    required={true}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={formik.touched.phone && formik.errors.phone ? true : false}
                    errorMessage={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                />
                <Select
                    label="Manager Name"
                    options={managerOptions}
                    value={formik.values.managerId}
                    onChange={(value) => formik.setFieldValue("managerId", value)}
                    name='managerId'
                    required={true}
                    errors={formik.touched?.managerId && formik.errors?.managerId ? formik.errors?.managerId : ""}
                />
            </div>
            <div className='flex flex-row items-center gap-5'>
                <Select
                    label="Branch Type"
                    options={branchTypes}
                    value={formik.values.type}
                    onChange={(value) => formik.setFieldValue("type", value)}
                    name='type'
                    required={true}
                    errors={formik.touched?.type && formik.errors?.type ? formik.errors?.type : ""}
                />
                <Select
                    label="Branch Status"
                    options={status}
                    value={formik.values.status}
                    onChange={(value) => formik.setFieldValue("status", value)}
                    name='status'
                    required={true}
                    errors={formik.touched?.status && formik.errors?.status ? formik.errors?.status : ""}
                />

            </div>
            <div className='w-full flex flex-col items-start gap-5'>
                <h2 className='font-medium text-xl'>Address:</h2>
                <div className='flex flex-row items-center gap-5 w-full'>
                    <InputWithLabel
                        label='City'
                        name='address.city'
                        required={true}
                        value={formik.values.address.city}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={
                            formik.touched?.address?.city && formik.errors?.address?.city
                                ? true
                                : false
                        }
                        errorMessage={
                            formik.touched?.address?.city && formik.errors?.address?.city
                                ? formik.errors.address.city
                                : ""
                        }
                    />
                    <InputWithLabel
                        label='Area'
                        name='address.area'
                        required={true}
                        value={formik.values.address.area}
                        onChange={formik.handleChange}
                        disabled={formik.isSubmitting}
                        error={formik.touched?.address?.area && formik.errors?.address?.area ? true : false}
                        errorMessage={formik.touched?.address?.area && formik.errors?.address?.area ? formik.errors?.address?.area : ""}
                    />
                </div>
            </div>
            <div className='flex flex-row items-center gap-5 w-full'>
                <div className='w-[50%]'>
                    <div className='flex flex-col'>
                        <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400'>Opening Date</label>
                        <DatePicker name="openingDate"
                            value={formik.values.openingDate}
                            onChange={(date) =>
                                formik.setFieldValue("openingDate", date)
                            } className='border-[1px] h-11 rounded-lg border-gray-300 px-5' placeholder='Select Date' />
                    </div>
                </div>

            </div>
            <div className='flex flex-row items-center justify-end gap-5'>
                <Button type='submit' size='md' variant='primary' >
                    {id ? "Update" : "Submit"}
                </Button>
                <Button type='submit' size='md' variant='outline' >
                    Cancel
                </Button>
            </div>
        </form>
    )
}

export default AddBranch
