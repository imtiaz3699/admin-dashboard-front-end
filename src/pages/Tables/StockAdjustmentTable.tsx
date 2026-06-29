import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Pagination from '../../components/common/Pagination';
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon, Tick } from '../../icons';
import { Modal } from 'antd'
import { Warning } from '../../icons'
import { useApi } from '../../context/apiFuncContext';
import toast, { Toaster } from 'react-hot-toast';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
function StockAdjustmentTable({ data, setPage, refetch }: { refetch: any, data: any, setPage: React.Dispatch<React.SetStateAction<number>> }) {
  const [selectedAdjustment, setSelectedAdjustment] = React.useState('')
  const [isRejectModal, setIsRejectModal] = React.useState("");
  const [isAcceptModal, setIsAcceptModal] = React.useState("");
  const [reason, setReason] = React.useState("");
  const { putRequest } = useApi()

  const navigate = useNavigate();
  const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"

  const currentPage = data?.page ?? 1;
  const limit = data?.limit;
  const total = data?.total;
  const totalPages = data?.totalPages;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await putRequest(`/api/adjustment/${id}/approve`, {}, true);
      toast.success("Adjustment approved successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };
  const handleReject = async (id: string) => {
    try {
      const res = await putRequest(`/api/adjustment/${id}/reject`, { reason }, true);
      refetch();
      setIsRejectModal("");
      toast.success("Adjustment approved successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <Toaster
        position="bottom-right" />
      <PageMeta
        title="Adjustment List
        "
        description='Adjustment Description'
      />
      <PageBreadcrumb pageTitle='Adjustment' />
      <div className='space-y-6'>
        <ComponentCard
          title="Adjustment"
          handleAddRecord={() => navigate('/dashboard/add-adjustment')}
          addText='Add Adjustment'
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

                      Product Name
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
                      Adjustment Type
                    </TableCell>


                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Approved / Rejected By
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Reason
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Remarks
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
                  {data?.data?.data?.length > 0 && data?.data?.data?.map((adjustment: any) => (
                    <TableRow key={adjustment?._id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.branchId?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.branchId?.branchCode}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.productId?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.quantity ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className={`px-1 py-1 ${adjustment?.adjustmentType === "INCREASE" ? "bg-green-400 text-green-700" : "text-red-700 bg-red-400"}  rounded-full text-black text-center font-medium`}>
                          {adjustment?.adjustmentType}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {/* {(adjustment?.approvedBy === "Approved" ? "Approved" :  || ) ?? ""} */}
                        after integration
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.reason ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {adjustment?.remarks ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className={`px-1 py-1 ${adjustment?.status === "PENDING" ? "bg-yellow-400 text-yellow-700" : adjustment?.status === "REJECTED" ? "text-red-700 bg-red-400" : "bg-green-400 text-green-700"}  rounded-full text-black text-center font-medium`}>
                          {adjustment?.status}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                        <div
                          // onClick={() => setSelectUser(admin?._id)} 
                          className='cursor-pointer '>
                          <MoreDotIcon onClick={() => setSelectedAdjustment(adjustment?._id)} />
                        </div>
                        <Dropdown className='!left-0 z-[999999]'
                          isOpen={selectedAdjustment === adjustment?._id}
                          onClose={() => setSelectedAdjustment("")}
                        >
                          <DropdownItem
                            onItemClick={() => setIsRejectModal(adjustment?._id)}
                          >
                            Reject
                          </DropdownItem>
                          <DropdownItem
                            onItemClick={() => setIsAcceptModal(adjustment?._id)}>
                            Approve
                          </DropdownItem>
                          {
                            adjustment?.status === "PENDING" && <DropdownItem
                            >
                              Delete
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
      <Modal open={isRejectModal !== ""}
        title="Reject Reason"
        onCancel={() => setIsRejectModal("")}
        onOk={() => { reason === "" ? toast.error("Reason is required") : handleReject(isRejectModal) }}
        centered
        classNames={{
          body:
            "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300",
        }}
        className='!w-[500px] !bg-gray-500'
      >
        <div className=' flex flex-col items-center justify-center'>
          <Warning className='text-[100px] text-orange-400' />
          <p className='font-bold text-[22px] text-center'>Are you sure you want to reject this adjustment ?</p>
          <InputWithLabel
            label='Reason'
            name='name'
            required={true}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        onOk={() => handleApprove(isAcceptModal)}
        open={isAcceptModal !== ""}
        onCancel={() => setIsAcceptModal("")}
        title="Accept"
      >
        <div className='flex flex-col items-center justify-center'>
          <Tick className='text-[100px] text-orange-400' />

          <p className='font-bold text-[22px] text-center'>Are you sure you want to reject this adjustment ?</p>
          <p className='font-medium text-[18px] text-center'>This operation cannot be undone?</p>
        </div>
      </Modal>
    </>
  )
}

export default StockAdjustmentTable
