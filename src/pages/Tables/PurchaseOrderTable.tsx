import React from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
function PurchaseOrderTable() {
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
                                        Supplier
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Branch
                                    </TableCell>
                                    <TableCell className={tableHeadStyles}>
                                        Products
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
                                <TableRow>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        Supplier
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        Branch
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        Products
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        Total Amount
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </ComponentCard>
        </>
    )
}

export default PurchaseOrderTable
