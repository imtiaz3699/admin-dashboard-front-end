import React from 'react'

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";
import { useNavigate } from "react-router";
const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
interface data {
    _id: string;
    name: string;
    description: string;
}
function CategoryTable({
    data,
    handleEdit,
    handleDelete
}
    :
    {
        data: data[],
        handleEdit: (d: string) => void,
        handleDelete: (d: string) => void,
    }) {
    const [selectCategory, setSelectCategory] = useState("")
    return (
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
                                Description
                            </TableCell>
                            <TableCell
                                isHeader
                                className={tableHeadStyles}
                            >
                                Is Active
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
                        {data?.length > 0 && data?.map((category: any) => (
                            <TableRow key={category?._id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex flex-col gap-2 ">
                                    {category?.name}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {category?.description ?? "--"}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <div className={`px-1 py-1 ${category?.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-full text-black text-center font-medium`}>
                                        {category?.isActive ? "Active" : "Inactive"}
                                    </div>
                                </TableCell>

                                <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                                    <div
                                        className='cursor-pointer'>
                                        <MoreDotIcon onClick={() => { setSelectCategory(category?._id) }} />
                                    </div>
                                    <Dropdown className='!left-0 z-[999999]'
                                        isOpen={selectCategory === category?._id}
                                        onClose={() => setSelectCategory("")}
                                    >
                                        <DropdownItem
                                            onItemClick={() => { handleEdit(category?._id) }}
                                        >
                                            <div className='text-gray-500'>Edit</div>
                                        </DropdownItem>
                                        <DropdownItem
                                            onItemClick={() => { handleDelete(category?._id) }}
                                        >
                                            <div className="text-gray-500">Delete</div>
                                        </DropdownItem>
                                    </Dropdown>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CategoryTable
