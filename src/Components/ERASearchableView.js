import React from "react";
import { withStyles } from "material-ui/styles";
import ERASearchBar from "./ERASearchBar";
import ERATable from "./ERATable";
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  }
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

class ERASearchableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selected: []
    }
  }
  render() {
    return (
      <div>
        <ERASearchBar />
        <ERATable />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ERASearchableView);