import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Table.css";
import RadioOptions from "../radiogroup/RadioOptions";

export default function CustomTable({
  rows,
  columns,
  className,
  RadioOpt = null,
  RadioCol = "",
  onselectionchange = () => {},
}) {
  return (
    <TableContainer sx={{ maxHeight: 700 }} className={className}>
      <Table
        stickyHeader
        aria-label="sticky table table-bordered"
        className="table"
      >
        <TableHead className="tableHead">
          <TableRow className="tableHeaderRow">
            {columns.map((column, colIndex) => (
              <TableCell
                className="tableHeaderCell fw-bold"
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth   }}
              >
                <b>{column.label}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {rows.map((eachRow, rowIndex) => (
            <TableRow className="tableBodyRow" key={rowIndex}>
              {Object.keys(eachRow).map((eachCell, cellIndex) =>
                RadioOpt == null ? (
                  <TableCell className="tableBodyCell" key={cellIndex}>
                    {eachRow[eachCell]}
                  </TableCell>
                ) : (
                  eachCell != RadioCol && (
                    <TableCell className="tableBodyCell" key={cellIndex}>
                      {eachRow[eachCell]}
                    </TableCell>
                  )
                )
              )}
              {RadioOpt && (
                <TableCell>
                  <RadioOptions
                    selectedValue={eachRow.answers}
                    name={""}
                    onChange={onselectionchange}
                    data={RadioOpt}
                    qNo={rowIndex + 1}
                    style={{ display: "block", }}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
