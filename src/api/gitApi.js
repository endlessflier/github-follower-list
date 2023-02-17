import * as fetchApi from "./fetch";

const MAX_PER_PAGE = 100;
const USERAPI_URL = "https://api.github.com/users";

function parseUserFromResponse(obj) {
  return obj.login || "";
}

export const validUser = (userid) => {
  return fetchApi
    .get(`${USERAPI_URL}/${userid}`)
    .then(() => true)
    .catch(() => false);
};

const getPageFollower = (userid, page = 1, perpage = MAX_PER_PAGE) => {
  return fetchApi
    .get(`${USERAPI_URL}/${userid}/followers?per_page=${perpage}&page=${page}`)
    .then((resp) => resp.map(parseUserFromResponse))
    .catch(() => []);
};
export const getAllFollowerList = async (userid) => {
  let followerList = [];
  let page = 1;
  let prevPageLength = MAX_PER_PAGE;
  while (prevPageLength === MAX_PER_PAGE) {
    const currentPageList = await getPageFollower(userid, page, MAX_PER_PAGE);
    prevPageLength = currentPageList.length;
    followerList = followerList.concat(currentPageList);
    page++;
  }
  return followerList;
};
