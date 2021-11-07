import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

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

const RepositoryItem = ({idx, repo, classes}) => {
  const selected = idx % 2 === 0;
  return (
    <ListItem
      key={repo.id}
      alignItems="flex-start"
      selected={selected}
      data-testid="repository"
    >
      <ListItemText
        primary={
          <div>
            <a href={repo.html_url}>{repo.name}</a>
            <span style={{paddingLeft: 30}}>
              {repo.language ? `language: ${repo.language}, ` : ''} forks: {repo.forks_count}, stars: {repo.stargazers_count}
            </span>
          </div>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
              data-testid="repo-text"
            >
              {repo.description}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default function RepositoryList({organizationRepos}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {organizationRepos.map((repo, idx) => (
        <RepositoryItem idx={idx} key={repo.name} repo={repo} classes={classes}/>
      ))}
    </List>
  );
}
