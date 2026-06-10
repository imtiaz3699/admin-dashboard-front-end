import React, { useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { MoreDotIcon } from '../../icons'
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
function PurchaseOrderTable({ data }: { data: any }) {
    const [selectPurchaseOrder, setSelectPurchaseOrder] = useState("")
    const navigate = useNavigate()
    const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                                    <TableCell className={tableHeadStyles}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data?.map((element:any, idx:number) => {
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
                                                    // onClick={() => setSelectUser(admin?._id)} 
                                                    className='cursor-pointer '>
                                                    <MoreDotIcon onClick={() => setSelectPurchaseOrder(element?._id)} />
                                                </div>
                                                <Dropdown className='!left-0 z-[999999]'
                                                    isOpen={selectPurchaseOrder === element?._id}
                                                    onClose={() => setSelectPurchaseOrder("")}
                                                >
                                                    <DropdownItem
                                                        onItemClick={() => { navigate(`/dashboard/update-branch/${element?._id}`) }}
                                                    >
                                                        <div className='text-gray-'> Edit</div>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <div>Delete</div>
                                                    </DropdownItem>
                                                </Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </ComponentCard>
        </>
    )
}

export default PurchaseOrderTable
