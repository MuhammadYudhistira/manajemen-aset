"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image,
  Input,
} from "@nextui-org/react";

import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const BasicTable = ({ data, columns, handleDeleteClick, handleEditClick }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const countPage = table.getPageCount()

  return (
    <div>
      <div className="overflow-x-auto">
        <Input
          isClearable
          size="sm"
          placeholder="Type to search"
          color="primary"
          className="ml-auto md:w-1/5 mb-4"
          onChange={(e) => setFiltering(e.target.value)}
          onClear={() => setFiltering("")}
        />
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left table-auto">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: (
                          <KeyboardArrowUpOutlinedIcon className="text-sm" />
                        ),
                        desc: (
                          <KeyboardArrowDownOutlinedIcon className="text-sm" />
                        ),
                      }[header.column.getIsSorted() ?? null]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {countPage === 0 ? <tr>
              <td></td>
              <td className="py-4">No data available...</td>
              <td></td>
            </tr> : table.getRowModel().rows.map((row, index) => (
              <tr
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                key={`${index}_${row.id}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="whitespace-nowrap px-4 py-2 text-gray-700"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-white">
                        <MoreHorizIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="faded"
                      aria-label="Dropdown menu with icons"
                    >
                      <DropdownItem
                        key="edit"
                        startContent={<ModeEditOutlineOutlinedIcon />}
                        onPress={() => handleEditClick(row.original.id)}
                      >
                        Edit data
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-red-500 bg-red-50"
                        color="danger"
                        startContent={
                          <DeleteOutlineOutlinedIcon
                            className={"text-red-500"}
                          />
                        }
                        onPress={() => handleDeleteClick(row.original.id)}
                      >
                        Delete data
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center rounded-b-lg border-t border-gray-200 px-4 py-2">
        <p className="text-sm">
          Showing {table.getRowModel().rows.length.toLocaleString()} from{" "}
          {table.getRowCount()}
        </p>
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
              className={`h-8 px-3 items-center justify-center rounded border border-gray-100 ${!table.getCanPreviousPage() ? "bg-gray-100" : "bg-white"
                }`}
            >
              {" "}
              <FirstPageOutlinedIcon className="text-sm" />
            </button>
          </li>
          <li>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 ${!table.getCanPreviousPage() ? "bg-gray-100" : "bg-white"
                }`}
            >
              <NavigateBeforeOutlinedIcon className="text-sm" />
            </button>
          </li>
          <span className="flex items-center gap-1">
            Page
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-11"
            />{" "}
            of {table.getPageCount()}
          </span>
          <li>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 ${!table.getCanNextPage() ? "bg-gray-100" : "bg-white"
                }`}
            >
              <NavigateNextOutlinedIcon className="text-sm" />
            </button>
          </li>
          <li>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className={`h-8 px-3 items-center justify-center rounded border border-gray-100 ${!table.getCanPreviousPage() ? "bg-gray-100" : "bg-white"
                }`}
            >
              {" "}
              <LastPageOutlinedIcon className="text-sm" />
            </button>
          </li>
        </ol>
        <div className="flex items-center gap-2">
          <p className="text-sm">Show </p>
          <select
            disabled={table.getRowCount() <= 10}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
