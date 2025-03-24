import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useState } from "react";
import { MoreDotIcon } from "../../../icons";
export default function BasicTableOne({ data, handleEdit,handleDelete }: { data: any, handleEdit: any,handleDelete:any }) {
  const [selectUser, setSelectUser] = useState<string>("fasdf");
  console.log(selectUser,)
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.length > 0 && data?.map((admin: any) => (
              <TableRow key={admin._id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {admin?.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {admin.email ?? "--"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {admin?.role}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 relative left-0 text-theme-sm dark:text-gray-400">
                  <div onClick={() => setSelectUser(admin?._id)} className='cursor-pointer '>
                    <MoreDotIcon />
                  </div>
                  <Dropdown className='!left-0 z-[999999]' onClose={() => setSelectUser("")} isOpen={selectUser === admin?._id}>
                    <DropdownItem onItemClick={() => { handleEdit(admin); setSelectUser("") }}>
                      <div className='text-gray-'> Edit</div>
                    </DropdownItem>
                    <DropdownItem onItemClick={()=> {handleDelete(admin?._id);setSelectUser("")}} >
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
  );
}
