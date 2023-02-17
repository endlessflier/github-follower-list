import { useState, useMemo } from "react";
import * as gitApi from "../api/gitApi";
import Textfield from "./Textfield";
import { getValidateGitHubID, MAX_ID_LENGTH } from "../utils/validator";

export default function InputPanel({
  setCommonFollowerList,
  isLoading,
  setIsLoading,
}) {
  const [gitUsers, setGitUsers] = useState([
    { label: "First User", userid: "wolever" },
    { label: "Second User", userid: "shazow" },
  ]);
  const pageStatus = useMemo(() => {
    const userIdErrors = gitUsers.map(
      ({ userid }) => !getValidateGitHubID(userid)
    );
    return {
      userIdError: userIdErrors,
      buttonDisabled: isLoading || userIdErrors.some((hasError) => hasError),
    };
  }, [gitUsers, isLoading]);

  const handleGetCommonList = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const followers = await Promise.all(
      gitUsers.map(({ userid }) => gitApi.getAllFollowerList(userid))
    );

    const commonList = followers[0].filter((userid) =>
      followers[1].includes(userid)
    );
    setCommonFollowerList(commonList);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="py-4 text-center">
        <h1>GitHub Users</h1>
      </div>
      <form onSubmit={handleGetCommonList}>
        {gitUsers.map(({ userid, label }, userIndex) => (
          <Textfield
            key={user.userid}
            className="mb-3"
            type="text"
            label={label}
            icon={<i className="bi bi-person-fill"></i>}
            value={userid}
            placeholder="GitHub account id"
            maxLength={MAX_ID_LENGTH}
            errorText={pageStatus.firstUserError ? "Should be valid user!" : ""}
            onChange={(e) =>
              setGitUsers(
                gitUsers.map((user, index) =>
                  index === userIndex
                    ? { ...user, userid: e.target.value }
                    : user
                )
              )
            }
          />
        ))}
        <div className="d-grid mt-2">
          <button
            type="submit"
            disabled={pageStatus.buttonDisabled}
            className={`btn btn-primary ${
              pageStatus.buttonDisabled ? "btn-disabled" : ""
            }`}
          >
            Get Commone Followers
          </button>
        </div>
      </form>
    </div>
  );
}
