import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { useState } from "react";
import { useNavigate } from "react-router";
const tableHeadStyles = "px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
export default function ProductTable({ title, tableTitle, addText, handleAddRecord, data, handleEdit, handleDelete }
  :
  { title: string, tableTitle: string, addText: string, handleAddRecord: any, data: any, handleEdit: any, handleDelete: any }) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <PageMeta
        title="Product List"
        description="Product Description"
      />
      <PageBreadcrumb pageTitle={title} />
      <div className="space-y-6">
        <ComponentCard
          title={tableTitle}
          handleAddBrand={() => navigate('/dashboard/brand')}
          handleAddCategory={() => navigate('/dashboard/category')}
          brand="Add Brand"
          category="Add Category"
          addText={addText}
          handleAddRecord={handleAddRecord}>
          {/* <BasicTableOne data={data} handleEdit={handleEdit} handleDelete = {handleDelete} /> */}

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
                      Barcode
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Category
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Brand
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Unit
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Cost Price
                    </TableCell>
                    <TableCell
                      isHeader
                      className={tableHeadStyles}
                    >
                      Selling Price
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
                  {data?.length > 0 && data?.map((product: any) => (
                    <TableRow key={product?._id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex flex-col gap-2 ">
                        <div className='w-[50px] h-[50px] rounded-xl '>
                          <img src={product?.productImages[0]?.url} className='w-[50px] h-[50px] rounded-xl ' />
                        </div>
                        {product?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.barcode ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.category?.name ?? "--"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.brand?.name ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.unit ?? ""}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.costPrice ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product?.sellingPrice ?? "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className={`px-1 py-1 ${product?.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-full text-black text-center font-medium`}>
                          {product?.isActive ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                        <div
                          // onClick={() => setSelectUser(admin?._id)} 
                          className='cursor-pointer '>
                          <MoreDotIcon onClick={() => setSelectedProduct(product?._id)} />
                        </div>
                        <Dropdown className='!left-0 z-[999999]'
                          isOpen={selectedProduct === product?._id}
                          onClose={() => setSelectedProduct("")}
                        >
                          <DropdownItem
                            onItemClick={() => { handleEdit(product?._id); setSelectedProduct("") }}
                          >
                            <div className='text-gray-'> Edit</div>
                          </DropdownItem>
                          <DropdownItem
                            onItemClick={() => { handleDelete(product?._id); setSelectedProduct("") }}
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
        </ComponentCard>
      </div>
    </>
  );
}
