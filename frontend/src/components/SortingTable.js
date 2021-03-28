import {useMemo,} from 'react'
import { useTable, useSortBy} from 'react-table'

const  SortingTable = (props) => {

    const columns = useMemo(() => props.columns, [])
    const data = useMemo(() => props.table, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
        } = useTable({
            columns,
            data
        },
        useSortBy)

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>  
                            </th>
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
export default SortingTable