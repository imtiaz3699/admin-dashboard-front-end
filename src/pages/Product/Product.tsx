import { useState } from 'react';
import ProductTable from '../Tables/ProductTable';
import { Modal } from '../../components/ui/modal';
import AddAdmin from '../Forms/AddAdmin/AddAdmin';
import { useFormik } from 'formik';
import { useApi } from '../../context/apiFuncContext';
import { useUser } from '../../context/userContext';
import Loader from '../../components/ui/Loader/Loader';
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import DeleteDialogue from '../UiElements/DeleteDialogue';
import { useLocation, useNavigate } from 'react-router';
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
    const location = useLocation();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    })
    const [isDeleteModal, setIsDeleteModal] = useState("");

    const handleAddAdmin = () => {
        navigate("/dashboard/add-product")
    }

    const fechList = async () => {
        try {
            const res = await getRequest(`/api/product/all-product?page=${pagination.page}&limit=${pagination.limit}`)
            return res
        } catch (e) {
            console.log(e);
        }
    }
    const productData = useQuery({
        queryKey: ["admins", pagination.page, pagination.limit],
        queryFn: fechList,
    });

    console.log(productData?.data?.data,'fadlfjhasldkjfsad')
    const handleEdit = (data:string) => {
        navigate(`/dashboard/update-product/${data}`);
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
            <ProductTable
                title={"Product List"}
                tableTitle={"Product list"}
                addText="Add Product"
                handleAddRecord={handleAddAdmin}
                data={productData?.data?.data || []}
                handleEdit={handleEdit}
                handleDelete={openDeleteModal}
            />
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
