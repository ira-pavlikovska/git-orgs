import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as api from "../api/api";
import Avatar from "@material-ui/core/Avatar";
import RepositoryList from "../components/RepositoryList";
import {Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

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
  inline: {
    display: "inline",
  }
}));

const OrgDetailsContainer = props => {
  const orgLogin = props?.match?.params?.login;
  const [organization, setOrganization] = useState({});
  const [organizationRepos, setOrganizationRepos] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const classes = useStyles();

  useEffect(() => {

    // load organization details
    api.getOrganizationDetails(orgLogin)
      .then((response) => {
        setOrganization(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

    // load organization members
    api.getOrganizationMembers(orgLogin)
      .then((response) => {
        setOrganizationMembers(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

    // load organization repositories
    api.getOrganizationRepos(orgLogin)
      .then((response) => {
        setOrganizationRepos(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

  }, []);


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item sm={2}/>
        <Grid item sm={8}>
          <Paper className={classes.paper} style={{padding: 15}} elevation={3}>
            <Link to={"/"}>
              <Typography> &lt;&lt; Back to list</Typography>
            </Link>
          </Paper>

          <Paper className={classes.paper} style={{padding: "0px 15px 15px 15px"}} elevation={3}>
            <div style={{display: "inline-block", padding: 15}}>
              <Avatar
                alt="Avatar"
                src={organization.avatar_url}
                data-testid="avatar"
              />
            </div>
            <div style={{display: "inline-block", paddingTop: 25, verticalAlign: "top"}}>
              <Typography>{organization.name}</Typography>
            </div>
            <Typography>{organization.location}</Typography>
            <Typography>

              <span>Blog:&nbsp;<a href={organization.blog}>
              {organization.blog}
            </a></span>
            </Typography>
            <Typography>

              <span>Git page:&nbsp;<a href={organization.html_url}>
                {organization.html_url}
              </a></span>
            </Typography>
          </Paper>

          <Paper className={classes.paper} style={{padding: 15, textAlign: "center"}} elevation={3}>
            <Typography variant="h6">
              Members
            </Typography>
            <div style={{textAlign: "left", paddingTop: 10}}>
              {
                organizationMembers.map(member => {
                  return (
                    <div style={{display: "inline-block"}} key={member.avatar_url}>
                      <Avatar
                        alt="Avatar"
                        src={member.avatar_url}
                        data-testid="avatar"
                      />
                    </div>
                  )
                })
              }
            </div>
          </Paper>

          <Paper className={classes.paper} style={{paddingTop: 15, textAlign: "center"}} elevation={3}>
            <Typography variant="h6">
              Repositories
            </Typography>
            <div style={{paddingTop: 10}}>
              <RepositoryList organizationRepos={organizationRepos}/>
            </div>
          </Paper>

        </Grid>
        <Grid item sm={2}/>

      </Grid>
    </div>
  );
};

export default OrgDetailsContainer;
