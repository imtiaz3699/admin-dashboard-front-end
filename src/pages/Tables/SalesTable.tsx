import React, { useState } from 'react'

import PageMeta from '../../components/common/PageMeta'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import Pagination from '../../components/common/Pagination';

function SalesTable({ data, handleDelete, setPage, page }:
    { data: any, handleDelete: any, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    const navigate = useNavigate();
    const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
    const [selectBranch, setSelectBranch] = useState("");
    const currentPage = data?.page ?? 1;
    const limit = data?.limit;
    const total = data?.total;
    const totalPages = Math.ceil(data?.totalRecords / limit);;
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    console.log(limit, totalPages,currentPage, 'faldfjalsdfhlaskdfhalskdjh')
    return (
        <>
            <PageMeta
                title="Sales List"
                description='Sales Description'
            />
            <PageBreadcrumb pageTitle='Sales' />
            <div className='space-y-6'>
                <ComponentCard
                    title="Sales"
                    handleAddRecord={() => navigate('/dashboard/add-sales')}
                    addText='Add Sale'
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
                                            Invoice Number
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Total Sale
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >

                                            Branch Name
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className={tableHeadStyles}
                                        >
                                            Branch Code
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
                                            Branch Address
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {data?.data?.length > 0 && data?.data?.map((branch: any) => (
                                        <TableRow key={branch?._id}>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {branch?.invoiceNumber}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {branch?.totalAmount}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {branch?.branchId?.name}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {branch?.branchId?.branchCode ?? "--"}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {branch?.branchId?.managerId?.name ?? ""}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className='flex flex-col gap-1 divide-y'>
                                                    <p className='!m-0 !p-0'>{branch?.branchId?.address?.city ?? "N/A"}</p>
                                                    <p className='!m-0 !p-0'>{branch?.branchId?.address?.area ?? "N/A"}</p>
                                                </div>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Pagination
                        //                 currentPage = 1,
                        // totalPages = 1,
                        // totalRecords = 0,
                        // limit = 10,
                        // onPageChange: onPageChange = (page: number) => { }
                        currentPage={Number(currentPage)}
                        totalPages={totalPages}
                        limit={limit}
                        onPageChange={handlePageChange}
                    />
                </ComponentCard>

            </div>
        </>
    )
}

export default SalesTable
