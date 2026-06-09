import React, { useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table';
import { formatDate } from '../../components/common/helperFunctions';
import { MoreDotIcon } from '../../icons';
import { Dropdown } from '../../components/ui/dropdown/Dropdown';
import { DropdownItem } from '../../components/ui/dropdown/DropdownItem';
import Pagination from '../../components/common/Pagination';
const tableHeadStyles = "px-5 py-3 font-bold text-nowrap text-gray-500 text-start text-theme-xs dark:text-gray-400"
function SupplierTable({ data, handleDelete, handlePageChange }: any) {
    const navigate = useNavigate();
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const currentPage = data?.page;
    const limit = data?.limit;
    const total = data?.total;
    const totalPages = data?.totalPages;
    return (
        <>
            <ComponentCard
                title="Supplier"
                handleAddRecord={() => navigate("/dashboard/add-supplier")}
                addText="Add Supplier"
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

                                        Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className={tableHeadStyles}
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className={tableHeadStyles}
                                    >
                                        Phone Number
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className={tableHeadStyles}
                                    >
                                        Address
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
                                {data?.data?.length > 0 && data?.data?.map((supplier: any) => (
                                    <TableRow key={supplier?._id}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {supplier?.name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {supplier?.email ?? "--"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {supplier?.phone ?? "--"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {supplier?.address ?? "--"}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                                            <div
                                                // onClick={() => setSelectUser(admin?._id)} 
                                                className='cursor-pointer '>
                                                <MoreDotIcon onClick={() => setSelectedSupplier(supplier?._id)} />
                                            </div>
                                            <Dropdown className='!left-0 z-[999999]'
                                                isOpen={selectedSupplier === supplier?._id}
                                                onClose={() => setSelectedSupplier("")}
                                            >
                                                <DropdownItem
                                                    onItemClick={() => { navigate(`/dashboard/update-supplier/${supplier?._id}`) }}
                                                >
                                                    <div className='text-gray-'> Edit</div>
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => { handleDelete(supplier?._id) }}
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
        </>
    )
}

export default SupplierTable
