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
function BranchTable(
  { data, handleDelete, setPage, page }:
    { data: any, handleDelete: any, page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {

  const navigate = useNavigate();
  const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
  const [selectBranch, setSelectBranch] = useState("");
  const currentPage = data?.data?.page;
  const limit = data?.data?.limit;
  const total = data?.data?.total;
  const totalPages = data?.data?.totalPages;


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <>
      <PageMeta
        title="Branch List"
        description='Branches Description'
      />
      <PageBreadcrumb pageTitle='Branch' />
      <div className='space-y-6'>
        <ComponentCard
          title="Branch"
          handleAddRecord={() => navigate('/dashboard/add-branch')}
          addText='Add Branch'
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
                      Branch Code
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Branch Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Branch Phone
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
                      Type
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
                  {data?.data?.data?.length > 0 && data?.data?.data?.map((branch: any) => (
                    <TableRow key={branch?._id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.branchCode ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.email ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.phone ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.managerId?.name ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className='flex flex-col gap-1 divide-y'>
                          <p className='!m-0 !p-0'>{branch?.address?.city ?? "N/A"}</p>
                          <p className='!m-0 !p-0'>{branch?.address?.area ?? "N/A"}</p>
                        </div>

                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className={`px-1 py-1 ${branch?.status ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-full text-black text-center font-medium`}>
                          {branch?.status ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {branch?.type ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                        <div
                          // onClick={() => setSelectUser(admin?._id)} 
                          className='cursor-pointer '>
                          <MoreDotIcon onClick={() => setSelectBranch(branch?._id)} />
                        </div>
                        <Dropdown className='!left-0 z-[999999]'
                          isOpen={selectBranch === branch?._id}
                          onClose={() => setSelectBranch("")}
                        >
                          <DropdownItem
                            onItemClick={() => { navigate(`/dashboard/update-branch/${branch?._id}`) }}
                          >
                            <div className='text-gray-'> Edit</div>
                          </DropdownItem>
                          <DropdownItem
                            onItemClick={() => { handleDelete(branch?._id) }}
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
    </>
  )
}

export default BranchTable
