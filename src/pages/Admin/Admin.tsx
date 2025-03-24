import { useState } from 'react';
import BasicTables from '../Tables/BasicTables'
import { Modal } from '../../components/ui/modal';
import AddAdmin from '../Forms/AddAdmin/AddAdmin';
import { useFormik } from 'formik';
import { useApi } from '../../context/apiFuncContext';
import { useUser } from '../../context/userContext';
import Loader from '../../components/ui/Loader/Loader';
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import DeleteDialogue from '../UiElements/DeleteDialogue';
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().when("_id", {
        is: (_id: string) => !_id,
        then: (schema) => schema.required("Password is required."),
        otherwise: (schema) => schema.notRequired(),
    }),
})
function Admin() {
    const [isModalOpen, steIsModalOpen] = useState(false);
    const { user, setShowToaster } = useUser();
    const { postRequest, getRequest, putRequest, deleteRequest } = useApi();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    })
    const [isDeleteModal, setIsDeleteModal] = useState("");

    const handleAddAdmin = () => {
        steIsModalOpen(true);
    }

    const fechList = async () => {
        try {
            const res = await getRequest(`/admin/get-all-admins?page=${pagination.page}&limit=${pagination.limit}`)
            return res
        } catch (e) {
            console.log(e);
        }
    }
    const adminData = useQuery({
        queryKey: ["admins", pagination.page, pagination.limit],
        queryFn: fechList,
    });
    const formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            "role": "admin",
            createdBy: user._id ?? "",
            error: "",
            _id: "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { }) => {
            try {
                if (values?._id) {
                    const res = await putRequest(`/admin/update-admin/${values?._id}`, values, true);
                    if (res?.status === 200) {
                        handleCloseModal();
                        setShowToaster({
                            show: true,
                            message: res?.message,
                            error: false
                        })
                        adminData.refetch();
                    }
                } else {
                    const payload = {
                        name: values?.name,
                        email: values?.email,
                        role: values?.role,
                        password: values?.password,
                        createdBy: user?._id
                    }
                    const res = await postRequest('/admin/add-admin', payload, true);
                    if (res.status === 200) {
                        handleCloseModal();
                        setShowToaster({
                            show: true,
                            message: res?.message,
                            error: false
                        })
                        adminData.refetch();
                    }
                }

            } catch (error: any) {
                console.log(error?.response?.data?.message, 'ffasdfdsalsdfjalds');
                formik.setFieldValue('error', error?.response?.data?.message)
            }

        }
    })

    const handleCloseModal = () => {
        steIsModalOpen(false);
        formik.resetForm();
    }
    const handleEdit = (data: any) => {
        steIsModalOpen(true);
        if (data?._id) {
            formik.setFieldValue("name", data?.name || "");
            formik.setFieldValue("email", data?.email || "");
            formik.setFieldValue("password", data?.password ?? "");
            formik.setFieldValue("_id", data?._id || "");
        }
    }
    const handleDelete = async () => {
        try {
            const res = await deleteRequest(`/admin/delete-admin/${isDeleteModal}`)
            if (res?.status === 200) {
                setShowToaster({
                    show: true,
                    message: res?.message,
                    error: false
                })
                adminData.refetch();
            }
        } catch (e: any) {
            console.log(e);
            setShowToaster({
                show: true,
                message: e?.response?.data?.message,
                error: true,
            })
        }
    }
    const openDeleteModal = (id: string) => {
        setIsDeleteModal(id);

    }
    return (
        <div>
            <BasicTables
                title={"Admin"}
                tableTitle={"Admin list"}
                addText="Add Admin"
                handleAddRecord={handleAddAdmin}
                data={adminData?.data?.data?.admins}
                handleEdit={handleEdit}
                handleDelete={openDeleteModal}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                className='!max-w-[700px] !w-full !p-5  border-[1px] shadow-2xl border-gray-100 rounded-[8px]  py-5'
                showCloseButton={true}
                heading={`${formik?.values?._id ? "Update" : "Add"} Admin `}
            >
                <Loader isLoading={formik.isSubmitting}>
                    <div className='flex flex-row items-center '>
                        <AddAdmin formik={formik} onClose={handleCloseModal} />
                    </div>
                </Loader>
            </Modal>
            <Modal
                isOpen={isDeleteModal !== ""}
                onClose={() => setIsDeleteModal("")}
                className='!max-w-[500px] !w-full !p-5  border-[1px] shadow-2xl border-gray-100 rounded-[8px]  py-5  '
                heading={""}
                showCloseButton={true}
            >
                <DeleteDialogue
                    onClose={() => setIsDeleteModal("")}
                    heading="Delete Admin"
                    description="Are you sure you want to delete this admin?"
                    handleDelete={handleDelete}
                />
            </Modal>
        </div>
    )
}

export default Admin
