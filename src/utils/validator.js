export const MAX_ID_LENGTH = 39;

export function getValidateGitHubID(userid) {
  return (
    userid.length <= MAX_ID_LENGTH &&
    /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(userid)
  );
}
