import React, { useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { MoreDotIcon } from '../../icons'
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { Modal } from '../../components/ui/modal'
import { Warning } from '../../icons'
import Button from '../../components/ui/button/Button'
import { useApi } from '../../context/apiFuncContext'
import { message } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineCancel } from "react-icons/md";

function PurchaseOrderTable({ data }: { data: any }) {
    const [selectPurchaseOrder, setSelectPurchaseOrder] = useState("")
    const [isModalOpen, setIsModalOpen] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { putRequest } = useApi();
    const navigate = useNavigate()
    const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
    const cancelPurchaseMutation = useMutation({
        mutationFn: async (id) => {
            const res = await putRequest(
                `/api/purchase/purchase-order/${isModalOpen}/cancel`,
                {},
                true
            );
            return res.data;
        },
        onSuccess: () => {
            messageApi.success("Purchase order cancelled");
            queryClient.invalidateQueries(["purchase"]);
        },
        onError: (error) => {
            console.log(error);
            messageApi.error("Failed to cancel purchase order");
        },
    });

    return (
        <>
            <PageBreadcrumb pageTitle="Purchase Order" />
            <ComponentCard
                title="Purchase Order Table"
                handleAddRecord={() => navigate("/dashboard/add-purchase-order")}
                addText="Add Purchase Order"
            >
                <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
                    <div className='max-w-full overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell className={tableHeadStyles}>
                                        Invoice Number
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Supplier
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Branch
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Products
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Stauts
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Total Amount
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data?.map((element: any, idx: number) => {
                                        return <TableRow key={element?._id}>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {element?.invoiceNumber}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {element?.supplierId?.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {element?.branchId?.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {element?.items?.length}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {element?.status}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                $ {element?.totalAmount}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                                                <div
                                                    className='cursor-pointer '>
                                                    {
                                                        element?.status === "pending" && <Button variant='outli' disabled={element?.status !== 'pending'} className='border-[1px] border-red-500 !h-[15] text-white !py-2 bg-red-500 hover:text-red-300 hover:bg-red-600' onClick={() => setIsModalOpen(element?._id)}> Cancel PO
                                                        </Button>
                                                    }
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>

                    </div>
                </div>

            </ComponentCard>

            <Modal
                isOpen={isModalOpen !== ""}
                onClose={() => setIsModalOpen("")}
            >
                <div className='flex flex-col items-center justify-center'>
                    <Warning className='text-[100px] mb-5 text-gray-900 dark:text-gray-400' />
                    <p className='text-gray-900 dark:text-gray-400  text-[18px]'>Are you sure you want to cancel this Purchase Order ?</p>
                    <p className='text-gray-900 dark:text-gray-400  text-[18px]'>This operation cannot be undone.</p>
                    <div className='flex items-center justify-end w-full gap-5 mt-5 mb-5 px-5'>
                        <Button onClick={() => cancelPurchaseMutation.mutate()} variant="primary">
                            Submit
                        </Button>
                        <Button onClick={() => setIsModalOpen("")} variant="outline">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PurchaseOrderTable
