import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import SwipeableViews from "react-swipeable-views";
import ERASearchableView from "./ERASearchableView";
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  }
});

class TabView extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
       
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="PENDING (27)" />
            <Tab label="COMPLETE (54)" />
            <Tab label="ARCHIVED (889)" />
          </Tabs>

            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>              
              <ERASearchableView />
              </TabContainer>
              <TabContainer dir={theme.direction}>COMPLETE TABLE</TabContainer>
              <TabContainer dir={theme.direction}>ARCHIVED Three</TabContainer>
            </SwipeableViews>

      
      </div>

    );
  }
}

TabView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TabView);
