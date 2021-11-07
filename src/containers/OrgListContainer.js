import React, {useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {getOrgs, getMoreResults, getLessResults} from "../actions/OrgsActions";
import OrganizationList from "../components/OrganizationList";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  paper: {
    padding: "0px",
    margin: "5px",
    textAlign: "left",
  },
  loadMorePaper: {
    padding: "10px 0px 10px 0px",
    margin: "5px",
    textAlign: "center",
  },
}));

const OrgListContainer = ({
                            organizations,
                            getOrgs,
                            getMoreResults,
                            getLessResults,
                          }) => {

  const classes = useStyles();

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item sm={2}/>
        <Grid item sm={8}>
          <Paper className={classes.paper} style={{padding: 15, textAlign: "center"}} elevation={3}>
            <Typography variant="h6">
              Git Organizations
            </Typography>
          </Paper>

          <Paper className={classes.paper} style={{padding: "5px 0px 5px 0px", textAlign: "center"}} elevation={3}>
            <div style={{paddingTop: 10}}>
              <OrganizationList orgs={organizations}/>
            </div>
          </Paper>

          <Paper className={classes.loadMorePaper}>
            <Button color="primary" onClick={getMoreResults}>
              Show More
            </Button>
            <Button color="primary" onClick={getLessResults}>
              Show Less
            </Button>
          </Paper>
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  organizations: state.orgs.list,
});

const mapDispatchToProps = {
  getOrgs,
  getMoreResults,
  getLessResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrgListContainer);
