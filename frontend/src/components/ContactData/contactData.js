/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import { TableSortLabel } from "@material-ui/core";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    textAlign: "center",
    borderBottom: "#182635",
    color: "#A9B2BC",
    justifyContent: "flex-end",
    flexDirection: "initial",
  },
  table: {
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#2e6799",
    },
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: "#182635",
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 35,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.tableRow,
          {
            [classes.noClick]: onRowClick == null,
          }
        )}
        variant="body"
        style={{
          height: "20px",
          backgroundColor: "#203246",
          color: "#fff",
          justifyContent: "flex-start",
        }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={
          (classes.tableRow,
          clsx(classes.tableCell, classes.flexContainer, classes.noClick))
        }
        variant="head"
        style={{ height: headerHeight, padding: ".4rem", textAlign: "center" }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <TableSortLabel
          onClick={(event) => this.props.onSort("contactstatus")}
          direction={this.props.asc ? "asc" : "desc"}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function ReactVirtualizedTable() {
  const [data, setData] = useState([]);
  const [asc, setAsc] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard`)
        .then((response) => response.json())
        .then((json) =>
          setData(
            json.sort(function (json1, json2) {
              return json1.contactstatus.localeCompare(json2.contactstatus);
            })
          )
        );
    }
    fetchData();
  }, []);

  const SortData = (colName) => {
    setData(
      data.slice().sort(function (json1, json2) {
        return json2[colName].localeCompare(json1[colName]);
      })
    );
  };

  const count = Object.keys(data).length;
  const contactstateCount = data.reduce((acc, match) => {
    const contactstate = match.contactstate;
    if (!acc[contactstate]) {
      acc[contactstate] = 1;
    } else {
      acc[contactstate]++;
    }
    return acc;
  }, {});

  return (
    <>
      <Paper
        style={{
          height: "50%",
          width: "100%",
          backgroundColor: "#182635",
          borderBottom: "#182635",
          borderRadius: "0",
        }}
      >
        <VirtualizedTable
          rowCount={data.length}
          onSort={(value) => SortData(value)}
          onAsc={(value) => setAsc(!asc ? false : true)}
          Asc={asc}
          style={{ borderBottom: "#182635" }}
          rowGetter={({ index }) => data[index]}
          columns={[
            {
              width: 20,
              label: `Total: ${count}`,
              dataKey: `${count}`,
            },
            {
              width: 0,
              label: `Failed: ${contactstateCount.failed}`,
              dataKey: `${contactstateCount.failed}`,
            },
            {
              width: 0,
              label: `Executing: ${contactstateCount.executing}`,
              dataKey: `${contactstateCount.executing}`,
            },
            {
              width: 90,
              label: "Contact Name",
              dataKey: "contactname",
              numeric: true,
            },
            {
              width: 90,
              label: "Contact Status",
              dataKey: "contactstatus",
            },
            {
              width: 125,
              label: "Begin Timestamp",
              dataKey: "contactbegintimestamp",
              numeric: true,
            },
            {
              width: 120,
              label: "Ending Timestamp",
              dataKey: "contactendtimestamp",
              numeric: true,
            },
          ]}
        />
      </Paper>
    </>
  );
}
