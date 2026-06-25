import React, { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import CompopnentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Pagination from '../../components/common/Pagination';
import { MoreDotIcon, Warning } from '../../icons'
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useApi } from '../../context/apiFuncContext'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../../context/userContext'
import { Modal } from 'antd'
import ViewProduct from '../StockMovement/ViewProduct'
import Button from '../../components/ui/button/Button'
import toast, { Toaster } from 'react-hot-toast';
function StockTransferTable({ data, setPage, page }:
    { data: any, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const [selectedTransfer, setSelectedTransfer] = useState('')
    const [isModalOpen, setIsModalOpen] = useState("");
    const [isModalTwoOpen, setIsModalTwoOpen] = useState("");
    const [isViewModalOpen, setIsViewModalOpen] = useState('');
    const { user } = useUser();
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { deleteRequest, putRequest } = useApi();
    const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
    const currentPage = data?.page ?? 1;
    const limit = data?.limit;
    const total = data?.total;
    const totalPages = Math.ceil(data?.totalRecords / limit);


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    console.log(data, 'fasldfjasldkjfhlasdjfhjklasd')
    const handleDeleteTransfer = async (id: string) => {
        try {
            const res = await deleteRequest(`/api/transfer/delete-transfer/${id}`);
            if (res) {
                queryClient.invalidateQueries({
                    queryKey: ['transfer']
                })
                setIsModalOpen("");
            }

        } catch (e: any) {
            console.log(e, 'aldjfalsdjkfhlaskdjfhlaksdj');

        }
    }
    const handleOk = async () => {
        await handleDeleteTransfer(isModalOpen);
    }
    const handleReject = async () => {
        try {
            const res = await putRequest(`/api/transfer/reject-transfer/${isModalTwoOpen || isViewModalOpen}`, {}, true);
            if (res) {
                queryClient.invalidateQueries({
                    queryKey: ['transfer']
                })
                setIsModalTwoOpen("");
                setIsViewModalOpen("");
            }
        } catch (e: any) {
            toast(e?.response?.data?.message);
        }
    }
    const handleAcceptTransfer = async () => {
        try {
            const res = await putRequest(`/api/transfer/approve-transfer/${isViewModalOpen}`,{},true) 
            console.log(res,'responseoftheapi')
        } catch (e:any) {
            toast(e?.response?.data?.message)
            console.log(e)
        }
    }
    console.log(user, 'fasdlfjhasdUser')
    return (
        <>
            <Toaster

                position="bottom-right" />
            <PageMeta
                title="Stock Transfer"
                description='Transfer Description'
            />
            <PageBreadcrumb pageTitle='Transfer' />
            <div className='space-y-6'>
                <CompopnentCard
                    title="Transfer"
                    handleAddRecord={() => navigate('/dashboard/create-transfer')}
                    addText='Add Transfer'
                >
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

                        <div className="max-w-full overflow-x-auto">
                            <Table>
                                {/* Table Header */}
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            From Branch
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            To Branch
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >

                                            Total Products
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Status
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {data?.data?.length > 0 && data?.data?.map((transfer: any) => (
                                        <TableRow key={transfer?._id}>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <p>{transfer?.fromBranchId?.name}</p>
                                                <p>{transfer?.fromBranchId?.branchCode}</p>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <p>{transfer?.toBranchId?.name}</p>
                                                <p>{transfer?.toBranchId?.branchCode}</p>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transfer?.items?.length}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className={`px-1 py-1 ${transfer?.status === "PENDING" ? "bg-yellow-100 text-yellow-600" : transfer?.status === "APPROVED" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-full text-black text-center font-medium`}>
                                                    {transfer?.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                                                <div
                                                    // onClick={() => setSelectUser(admin?._id)} 
                                                    className='cursor-pointer '>
                                                    <MoreDotIcon onClick={() => setSelectedTransfer(transfer?._id)} />
                                                </div>
                                                <Dropdown className='!left-0 z-[999999]'
                                                    isOpen={selectedTransfer === transfer?._id}
                                                    onClose={() => setSelectedTransfer("")}
                                                >
                                                    <DropdownItem
                                                        onItemClick={() => { setIsViewModalOpen(transfer?._id); setSelectedTransfer('') }}
                                                    >
                                                        <div className='text-gray-'>View Transfer</div>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onItemClick={() => { navigate(`/dashboard/update-branch/${transfer?._id}`) }}
                                                    >
                                                        <div className='text-gray-'> Edit</div>
                                                    </DropdownItem>
                                                    {
                                                        (transfer?.status !== "PENDING" || transfer?.createdBy !== user?._id) && <DropdownItem
                                                            onItemClick={() => { setIsModalTwoOpen(transfer?._id); setSelectedTransfer('') }}
                                                        >
                                                            <div className='text-gray-'>Reject</div>
                                                        </DropdownItem>
                                                    }
                                                    {
                                                        transfer?.status === "PENDING" && <DropdownItem
                                                            // onItemClick={() => { handleDeleteTransfer(transfer?._id) }}
                                                            onItemClick={() => { setIsModalOpen(transfer?._id); setSelectedTransfer('') }}
                                                        >
                                                            <div>Delete</div>
                                                        </DropdownItem>
                                                    }
                                                </Dropdown>

                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Pagination
                        currentPage={Number(currentPage)}
                        totalPages={totalPages}
                        limit={limit}
                        onPageChange={handlePageChange}
                    />
                </CompopnentCard>
            </div>
            <Modal
                open={isModalOpen !== ""}
                title="Delete Transfer"
                onOk={handleOk}
                onCancel={() => { setIsModalOpen(""); setSelectedTransfer("") }}
                centered
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <div className='flex flex-col items-center justify-center'>
                    <Warning className='text-[100px] text-orange-400' />
                    <p className='font-bold text-[22px] text-center'>Are you sure you want to delete this transfer?</p>
                    <p className='font-medium text-[18px] text-center'>This operation cannot be undone?</p>
                </div>
            </Modal>
            <Modal
                open={isModalTwoOpen !== ""}
                title="Reject Transfer"
                onOk={handleReject}
                onCancel={() => { setIsModalTwoOpen(""); setSelectedTransfer("") }}
                centered
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <div className='flex flex-col items-center justify-center'>
                    <Warning className='text-[100px] text-orange-400' />
                    <p className='font-bold text-[22px] text-center'>Are you sure you want to reject this transfer?</p>
                    <p className='font-medium text-[18px] text-center'>This operation cannot be undone?</p>
                </div>
            </Modal>

            <Modal
                open={isViewModalOpen !== ""}
                title="Product View"
                onOk={handleAcceptTransfer}
                onCancel={() => { setIsViewModalOpen(""); setSelectedTransfer("") }}
                centered
                footer={() => (
                    <div className='flex flex-row items-center gap-5'>

                        <Button onClick={() => handleReject()} variant="outline">
                            Reject
                        </Button>
                        <Button onClick={()=> handleAcceptTransfer()} variant="primary">
                            Accept
                        </Button>

                    </div>
                )}
            >
                <ViewProduct transferId={isViewModalOpen} />
            </Modal>
        </>
    )
}

export default StockTransferTable
