import React, {useMemo} from 'react'
import { useTable} from 'react-table'
import {ALERTCOLUMNS} from './AlertColumns'

const AlertsTable = (props) => {
    const columns = useMemo(() => ALERTCOLUMNS, [])
    const data = useMemo(() => props.alerts, [])

    const alertTable = useTable({
        columns: columns,
        data: data
    })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = alertTable
    
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
export default AlertsTable