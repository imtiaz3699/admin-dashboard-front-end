import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputWithLabel from "../../components/InputWithLabel/InputWithLabel";
import Button from "../../components/ui/button/Button";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../../context/userContext";
import { useApi } from "../../context/apiFuncContext";


function AddSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const { postRequest, getRequest, putRequest } = useApi();
    const [error, setError] = React.useState("");
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            createdBy: user?._id,
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Supplier name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            address: Yup.string().required("Address is required"),
            createdBy: Yup.string().required("Created By is required"),
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                if (id) {
                    const res = await putRequest(`/api/supplier/update-supplier/${id}`, values, true);
                    if (res) {
                        resetForm();
                        navigate("/dashboard/supplier");
                    }
                } else {
                    const res = await postRequest("/api/supplier/create-supplier", values, true);
                    if (res) {
                        resetForm();
                        navigate("/dashboard/supplier");
                    }
                }
            } catch (error: any) {
                console.log(error?.response?.data?.message, 'lafjsdhlfjkashldkfjhalsdjkfh');
                setError(error?.response?.data?.message);
            }
        },
    });
    const fetchSupplier = async () => {
        try {
            const res = await getRequest(`/api/supplier/single-supplier/${id}`);
            if (res?.data) {
                formik.setValues({
                    name: res?.data?.name,
                    email: res?.data?.email,
                    phone: res?.data?.phone,
                    address: res?.data?.address,
                    createdBy: res?.data?.createdBy,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (id) {
            fetchSupplier();
        }
    }, [id])
    return (
        <div className="w-full p-5">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

                {/* Row 1 */}
                <div className="flex flex-row items-center gap-5">
                    <InputWithLabel
                        label="Supplier Name"
                        name="name"
                        required={true}
                        value={formik.values.name}
                        onChange={formik.handleChange}

                        disabled={formik.isSubmitting}
                        error={
                            formik.touched.name && formik.errors.name ? true : false
                        }
                        errorMessage={
                            formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : ""
                        }
                    />

                    <InputWithLabel
                        label="Email"
                        name="email"
                        required={true}
                        value={formik.values.email}
                        onChange={formik.handleChange}

                        disabled={formik.isSubmitting}
                        error={
                            formik.touched.email && formik.errors.email ? true : false
                        }
                        errorMessage={
                            formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""
                        }
                    />
                </div>

                {/* Row 2 */}
                <div className="flex flex-row items-center gap-5">
                    <InputWithLabel
                        label="Phone"
                        name="phone"
                        required={true}
                        value={formik.values.phone}
                        onChange={formik.handleChange}

                        disabled={formik.isSubmitting}
                        error={
                            formik.touched.phone && formik.errors.phone ? true : false
                        }
                        errorMessage={
                            formik.touched.phone && formik.errors.phone
                                ? formik.errors.phone
                                : ""
                        }
                    />
                    <InputWithLabel
                        label="Address"
                        name="address"
                        required={true}
                        value={formik.values.address}
                        onChange={formik.handleChange}

                        disabled={formik.isSubmitting}
                        error={
                            formik.touched.address && formik.errors.address
                                ? true
                                : false
                        }
                        errorMessage={
                            formik.touched.address && formik.errors.address
                                ? formik.errors.address
                                : ""
                        }
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='flex flex-row items-center justify-end gap-5'>
                    <Button type='submit' variant="primary" >
                        {id ? "Update Supplier" : "Add Supplier"}
                    </Button>
                    <Button type='submit' variant="outline">
                        {"Cancel"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddSupplier;