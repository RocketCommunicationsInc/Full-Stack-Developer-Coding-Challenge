import React, {useMemo} from 'react'
import { useTable} from 'react-table'

const DataTable = (props) => {

    const dataTable = useTable({
        columns: props.columns,
        data: props.table
    })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = dataTable
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}      
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })
                                } 
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default DataTable