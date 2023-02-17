import { useState } from "react";
import InputPanel from "../components/InputPanel";
import LoadingIndicator from "../components/LoadingIndicator";

export default function MainPage() {
  const [commonFollowerList, setCommonFollowerList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container col-10">
      <InputPanel
        setCommonFollowerList={setCommonFollowerList}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {(commonFollowerList || isLoading) && (
        <div>
          <h2 className="text-capitalize text-center mt-4">
            Common Follower List
          </h2>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ul className="list-group rounded-2 outline my-5">
              {!commonFollowerList?.length ? (
                <div className="alert text-danger text-center mb-0">
                  The common follower of two users doesn't exist.
                </div>
              ) : (
                commonFollowerList.map((userid) => (
                  <li
                    key={userid}
                    className="list-group-item d-flex justify-content-between border border-dark"
                  >
                    {userid}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
