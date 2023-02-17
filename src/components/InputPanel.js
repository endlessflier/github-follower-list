import { useState, useMemo } from "react";
import * as gitApi from "../api/gitApi";
import Textfield from "./Textfield";
import { getValidateGitHubID, MAX_ID_LENGTH } from "../utils/validator";

export default function InputPanel({
  setCommonFollowerList,
  isLoading,
  setIsLoading,
}) {
  const [firstUser, setFirstUser] = useState("wolever");
  const [secondUser, setSecondUser] = useState("shazow");
  const pageStatus = useMemo(() => {
    const firstUserError = !getValidateGitHubID(firstUser);
    const secondUserError = !getValidateGitHubID(secondUser);
    return {
      firstUserError,
      secondUserError,
      buttonDisabled: isLoading || firstUserError || secondUserError,
    };
  }, [firstUser, secondUser, isLoading]);

  const handleGetCommongList = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const firstFollowers = await gitApi.getAllFollowerList(firstUser);
    const secondFollowers = await gitApi.getAllFollowerList(secondUser);

    const commonList = firstFollowers.filter((userid) =>
      secondFollowers.includes(userid)
    );
    setCommonFollowerList(commonList);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="py-4 text-center">
        <h1>GitHub Users</h1>
      </div>
      <form onSubmit={handleGetCommongList}>
        <Textfield
          className="mb-3"
          type="text"
          label="First GitUser"
          icon={<i className="bi bi-person-fill"></i>}
          value={firstUser}
          placeholder="GitHub account id"
          maxLength={MAX_ID_LENGTH}
          errorText={pageStatus.firstUserError ? "Should be valid user!" : ""}
          onChange={(e) => setFirstUser(e.target.value)}
        />
        <Textfield
          className="mb-5"
          type="text"
          label="Second GitUser"
          icon={<i className="bi bi-person-fill"></i>}
          value={secondUser}
          maxLength={MAX_ID_LENGTH}
          placeholder="GitHub account id"
          errorText={pageStatus.secondUserError ? "Should be valid user!" : ""}
          onChange={(e) => setSecondUser(e.target.value)}
        />
        <div className="d-grid">
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
