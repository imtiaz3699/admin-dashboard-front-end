import React, { useState } from 'react'
import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { convertToISODate, formatDate } from '../../components/common/helperFunctions'
import Pagination from '../../components/common/Pagination'

function StockTable({ data, handleDelete, setPage, page }: { data: any, handleDelete: any, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const tableHeadStyles = "px-5 py-3 font-bold text-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400"
    const navigate = useNavigate();
    const [selectStock, setSelectStock] = useState("");
    const currentPage = data?.data?.page;
    const limit = data?.data?.limit;
    const total = data?.data?.total;
    const totalPages = data?.data?.totalPages;
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <PageMeta
                title="Stock List"
                description="Stock List"
            />
            <PageBreadcrumb
                pageTitle='Stock'
            />
            <div className='space-y-6'>
                <ComponentCard
                    title="Stock"
                    handleAddRecord={() => navigate("/dashboard/add-stock")}
                    addText="Add Stock"
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

                                            Product
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Branch
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Manager
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Quantity
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Reserved Quantity
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Damaged Quantity
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Min Stock
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Max Stock
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Average Cost Price
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Last Purchase Price
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Stock Value
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
                                            Last Stock In
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Created By
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Updated By
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
                                    {data?.data?.data?.length > 0 && data?.data?.data?.map((stock: any) => (
                                        <TableRow key={stock?._id}>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.productId?.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.branchId?.name ?? "--"}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.manager ?? "--"}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.quantity ?? "--"}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.reservedQty ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.damagedQty ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.minStockLevel ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.maxStockLevel ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.averageCostPrice ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.lastPurchasePrice ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                PKR:{stock?.stockValue ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.status ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {formatDate(stock?.lastStockInAt) ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {
                                                    stock?.createdBy?.name ?? "--"
                                                }
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {stock?.updatedBy?.name ?? "--"}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                                                <div
                                                    // onClick={() => setSelectUser(admin?._id)} 
                                                    className='cursor-pointer '>
                                                    <MoreDotIcon onClick={() => setSelectStock(stock?._id)} />
                                                </div>
                                                <Dropdown className='!left-0 z-[999999]'
                                                    isOpen={selectStock === stock?._id}
                                                    onClose={() => setSelectStock("")}
                                                >
                                                    <DropdownItem
                                                        onItemClick={() => { navigate(`/dashboard/update-branch/${stock?._id}`) }}
                                                    >
                                                        <div className='text-gray-'> Edit</div>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onItemClick={() => { handleDelete(stock?._id) }}
                                                    >
                                                        <div>Delete</div>
                                                    </DropdownItem>
                                                </Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        limit={limit}
                        onPageChange={handlePageChange}
                    />
                </ComponentCard>
            </div>
        </div>
    )
}

export default StockTable
