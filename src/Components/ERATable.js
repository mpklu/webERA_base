import React from "react";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Pagination from "./Pagination";
import SortableTableHead from "./SortableTableHead";
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const columnData = [
  { id: 'date_received', numeric: false, disablePadding: true, label: 'Date Received' },
  { id: 'era_name', numeric: false, disablePadding: false, label: 'File Name' },
  { id: 'carrier', numeric: false, disablePadding: false, label: 'Carrier Name' },
  { id: 'ref_num', numeric: true, disablePadding: false, label: 'Trace/Check Number' },
  { id: 'remittance_date', numeric: false, disablePadding: false, label: 'Remittance Date' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Remittance Amount' },
  { id: 'prov_adj', numeric: true, disablePadding: false, label: 'Provider Adjustment(s)' },
  { id: 'total_claims', numeric: true, disablePadding: false, label: 'Total Claims' },
  { id: 'remaining_claims', numeric: true, disablePadding: false, label: 'Remaining Claims' },
];

let counter = 0;
function createData(date, name, carrier, reference, remit_date, amount, providerAdjustment, totalClaim, remainClaims) {
  counter += 1;
  return { 
    id: counter, 
    date_received: date,
    era_name:name, 
    carrier: carrier, 
    ref_num: reference,
    remittance_date: remit_date,
    amount: amount,
    prov_adj: providerAdjustment,
    total_claims: totalClaim,
    remaining_claims: remainClaims
   };
}

class ERATable extends React.Component { 

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [
        createData('04/01/2018', '00172', 'ATENA', '1234567890', '02/18/2018', 300.00, 0.00, 13, 10),
        createData('03/18/2018', '00192', 'BLUE CROSS', '1234567890', '02/18/2018', 300.00, 0.00, 13, 10),
        createData('03/08/2018', '00178', 'UNITED HEALTHCARE', '1234567890', '02/18/2018', 300.00, 0.00, 13, 10)
      ].sort((a, b) => (a.date_received < b.date_received ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
    };
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  render() {
    
    const { classes } = this.props;
    const { order, orderBy, selected, data, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          
          <Table className={classes.table}>
            <SortableTableHead
              columnData={columnData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow 
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  > 
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell padding="none">{n.date_received}</TableCell>
                    <TableCell>{n.era_name}</TableCell>
                    <TableCell>{n.carrier}</TableCell>
                    <TableCell>{n.ref_num}</TableCell>
                    <TableCell>{n.remittance_date}</TableCell>
                    <TableCell numeric>{n.amount}</TableCell>
                    <TableCell numeric>{n.prov_adj}</TableCell>
                    <TableCell numeric>{n.total_claims}</TableCell>
                    <TableCell numeric>{n.remaining_claims}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  Actions={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true})(ERATable);