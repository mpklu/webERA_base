import React from "react";
import PropTypes from 'prop-types';
import {  
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
// const columnData = [
//   { id: 'date_received', numeric: false, disablePadding: true, label: 'Date Received' },
//   { id: 'era_name', numeric: false, disablePadding: false, label: 'File Name' },
//   { id: 'carrier', numeric: false, disablePadding: false, label: 'Carrier Name' },
//   { id: 'ref_num', numeric: true, disablePadding: false, label: 'Trace/Check Number' },
//   { id: 'remittance_date', numeric: false, disablePadding: false, label: 'Remittance Date' },
//   { id: 'amount', numeric: true, disablePadding: false, label: 'Remittance Amount' },
//   { id: 'prov_adj', numeric: true, disablePadding: false, label: 'Provider Adjustment(s)' },
//   { id: 'total_claims', numeric: true, disablePadding: false, label: 'Total Claims' },
//   { id: 'remaining_claims', numeric: true, disablePadding: false, label: 'Remaining Claims' },
// ];

class SortableTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };


  render() {
    const { columnData, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

SortableTableHead.propTypes = {
  columnData: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default SortableTableHead