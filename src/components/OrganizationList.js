import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  url: {
    display: "block",
  },
}));

const OrganizationItem = ({idx, org, classes}) => {
  const {login} = org;
  const selected = idx % 2 === 1;
  return (
    <ListItem
      key={org.id}
      alignItems="flex-start"
      selected={selected}
      data-testid="organization"
    >
      <Link to={`/org/${login}`}>
        <ListItemAvatar>
          <Avatar
            alt="Avatar"
            src={org.avatar_url}
            data-testid="avatar"
          />
        </ListItemAvatar>
      </Link>

      <ListItemText
        primary={<Link to={`/org/${login}`}>{login}</Link>}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
              data-testid="organization-text"
            >
              {/*TODO: something more for {login} ??*/}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default function OrganizationList({orgs}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {orgs.map((org, idx) => (
        <OrganizationItem idx={idx} key={org.id} org={org} classes={classes}/>
      ))}
    </List>
  );
}
