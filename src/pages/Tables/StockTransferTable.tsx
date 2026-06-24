import React, { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import CompopnentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Pagination from '../../components/common/Pagination';
import { MoreDotIcon } from '../../icons'
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { useApi } from '../../context/apiFuncContext'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../../context/userContext'
import { Modal } from 'antd'

function StockTransferTable({ data, setPage, page }:
    { data: any, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const [selectedTransfer, setSelectedTransfer] = useState('')
    const [isModalOpen, setIsModalOpen] = useState("");
    const { user } = useUser();
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { deleteRequest } = useApi();
    const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
    const currentPage = data?.page ?? 1;
    const limit = data?.limit;
    const total = data?.total;
    const totalPages = Math.ceil(data?.totalRecords / limit);;
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    console.log(data, 'fasldfjasldkjfhlasdjfhjklasd')
    const handleDeleteTransfer = async (id: string) => {
        try {
            const res = await deleteRequest(`/api/transfer/delete-transfer/${id}`);
            console.log(res, 'deltedtransferasdfad')
            queryClient.invalidateQueries({
                queryKey: ['transfer']
            })
        } catch (e) {
            console.log(e,);
        }
    }
    const handleOk = async () => {

    }
    console.log(user, 'fasdlfjhasdUser')
    return (
        <>
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
                                                <div className={`px-1 py-1 ${transfer?.status === "PENDING" ? "bg-yellow-100 text-yellow-600" : transfer?.status === "COMPLETED" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-full text-black text-center font-medium`}>
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
                                                        onItemClick={() => { navigate(`/dashboard/update-branch/${transfer?._id}`) }}
                                                    >
                                                        <div className='text-gray-'> Edit</div>
                                                    </DropdownItem>
                                                    {
                                                        (transfer?.status !== "PENDING" || transfer?.createdBy !== user?._id) && <DropdownItem
                                                        // onItemClick={() => { navigate(`/dashboard/update-branch/${transfer?._id}`) }}
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
                <div className=''>
                
                </div>
            </Modal>
        </>
    )
}

export default StockTransferTable
