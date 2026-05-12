import React, { useState } from 'react'
import PageMeta from '../../../components/common/PageMeta'
import PageBreadcrumb from '../../../components/common/PageBreadCrumb'
import ComponentCard from '../../../components/common/ComponentCard'
import { useApi } from '../../../context/apiFuncContext'
import { useQuery } from '@tanstack/react-query'
import BrandTable from '../../Tables/BrandTable'
import { Modal } from '../../../components/ui/modal'
import AddBrand from './AddBrand'

function Brand() {
    const { getRequest, deleteRequest } = useApi()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectBrand, setSelectBrand] = useState("");
    const [editBrand, setEditBrand] = useState({
        name: "",
        description: "",
        isActive: false,
        _id: ""
    });
    const fetchData = async () => {
        try {
            const res = await getRequest('/api/brand/all-brands');
            console.log(res, 'fasdlfkjshaldfjs')
            return res
        } catch (e) {
            console.log(e);
        }
    }
    const { data, refetch } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchData,
        refetchOnMount: true
    })

    const handleEdit = (brandId: string) => {
        setIsModalOpen(true);
        setSelectBrand(brandId)
        const editData = data?.data?.find((brand: any) => brand._id === brandId);
        console.log(editData, 'aldfkahslfjkashdlfjshladf')
        const newObj = {
            name: editData?.name,
            description: editData?.description,
            isActive: editData?.isActive,
            _id: editData?._id
        };
        setEditBrand(newObj)
    }
    const handleDelete = async (brandId: string) => {
        try {
            const res = await deleteRequest(`/api/brand/delete-brand/${brandId}`)
            console.log(res, 'fasldfjshaldfjhalsdjfhjklasd')
            if (res) {
                refetch();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const handleClose = () => {
        refetch();
        setIsModalOpen(false);
        setEditBrand({ name: "", description: "", isActive: false, _id: "" });
    }
    return (
        <>
            <PageMeta
                title="Brands"
                description="Product Brands"
            />
            <PageBreadcrumb pageTitle={"Brands"} />
            <div className="space-y-6">
                <ComponentCard
                    title={"Brand"}
                    addText={"Add Brand"}
                    handleAddRecord={() => setIsModalOpen(true)}>
                    <BrandTable
                        data={data?.data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete} />
                </ComponentCard>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                heading="Add Brand"
            >
                <AddBrand editBrand={editBrand} setEditBrand={setEditBrand} handleClose={handleClose} />
            </Modal>
        </>
    )
}

export default Brand
