import React, { useState } from "react";
import CommitActivity from "./CommitActivity";
const RepositoryList = ({ repositories }) => {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const handleRepoClick = (repo) => {
    if(repo === selectedRepo){
        setSelectedRepo(null)
        return
    }
    setSelectedRepo(repo);
  };
  return (
    <div className="flex flex-col gap-4 w-4/5 p-4">
      {repositories.map((repo) => (
        <div className="w-full flex flex-col items-center justify-start" key={repo?.id}>
          <button
            key={repo.id}
            className="w-4/5 p-4 my-2 bg-white shadow flex flex-col rounded-xl"
            onClick={() => {
              handleRepoClick(repo);
            }}
          >
            <h3 className="text-xl font-bold">{repo.name}</h3>
            <p className="text-gray-600">{repo.description}</p>
            <p className="text-gray-600">Stars: {repo.stargazers_count}</p>
            <p className="text-gray-600">Issues: {repo.open_issues_count}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <p className="text-gray-600">Owner: {repo.owner.login}</p>
          </button>
          {selectedRepo === repo && (
            <CommitActivity
              repo={repo}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
