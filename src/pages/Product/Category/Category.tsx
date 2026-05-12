

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import { useEffect, useState } from "react";
import CategoryTable from "../../Tables/CategoryTable";
import { useFormik } from "formik";
import { useApi } from "../../../context/apiFuncContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Modal } from "../../../components/ui/modal";
import AddCategory from "./AddCategory";



function Category() {
    const navigate = useNavigate();
    const { getRequest, deleteRequest } = useApi()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editCategory, setEditCategory] = useState({
        name: "",
        description: "",
        isActive: false,
        _id: ""
    });

    const fetchData = async () => {
        try {
            const res = await getRequest('/api/category/all-categories');
            console.log(res, 'fasdlfkjshaldfjs')
            return res
        } catch (e) {
            console.log(e);
        }
    }
    const { data, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchData,
        refetchOnMount: true
    })
    const handleEdit = (categoriId: string) => {
        setIsModalOpen(true);
        setSelectedCategory(categoriId)
        const editData = data?.data?.find((category: any) => category._id === categoriId);
        console.log(editData, 'aldfkahslfjkashdlfjshladf')
        const newObj = {
            name: editData?.name,
            description: editData?.description,
            isActive: editData?.isActive,
            _id: editData?._id
        };
        setEditCategory(newObj)
    }

    const handleDelete = async (categoryId: string) => {
        try {
            const res = await deleteRequest(`/api/category/delete-category/${categoryId}`)
            console.log(res, 'fasldfjshaldfjhalsdjfhjklasd')
            if (res) {
                refetch();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleClose = () => {
        setIsModalOpen(false);
        setEditCategory({ name: "", description: "", isActive: false, _id: "" });
    }
    return (
        <>
            <PageMeta
                title="Categories"
                description="Product Categories"
            />
            <PageBreadcrumb pageTitle={"Categories"} />
            <div className="space-y-6">
                <ComponentCard
                    title={"Category"}
                    addText={"Add Category"}
                    handleAddRecord={() => setIsModalOpen(true)}>
                    <CategoryTable
                        data={data?.data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete} />
                </ComponentCard>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                heading="Add Category"
            >
                <AddCategory editCategory={editCategory} setEditCategory={setEditCategory} handleClose={handleClose} />
            </Modal>
        </>
    )
}

export default Category
