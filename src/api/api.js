import axios from "axios";

const PAGE_SIZE = 10;
const headers = {'Accept': 'application/vnd.github.v3+json'};


export const getOrganization = () =>
  axios.get(`https://api.github.com/organizations?per_page=${PAGE_SIZE}`, {
    headers: headers,
  });

export const getMoreResults = (nextResults) =>
  axios.get(nextResults, {
    headers: headers,
  });

export const getOrganizationDetails = (login) =>
  axios.get(`https://api.github.com/orgs/${login}`, {
    headers: headers,
  });

export const getOrganizationMembers = (login) =>
  axios.get(`https://api.github.com/orgs/${login}/members`, {
    headers: headers,
  });


export const getOrganizationRepos = (login) =>
  axios.get(`https://api.github.com/orgs/${login}/repos`, {
    headers: headers,
  });

