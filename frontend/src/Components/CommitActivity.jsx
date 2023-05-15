import React, { useEffect, useState } from "react";
import TimeSeriesGraph from "./TimeSeriesGraph";
import axios from "axios";
import ContributorChangesGraph from "./ContributorChangesGraph";

const CommitActivity = ({ repo }) => {
  const [commitActivity, setCommitActivity] = useState([]);
  const [contributorData, setContributorData] = useState([]);
  const fetchContributorData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/contributors`
      );
      if(Array.isArray(response.data) && response.data.length > 0){
        setContributorData(response.data);
      }
    } catch (error) {
        alert("there is some error in server")
      console.error("Error fetching contributor data:", error);
    }
  };
  const fetchCommitActivity = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/code_frequency`
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        setCommitActivity(response.data);
      }
    } catch (error) {
        alert("there is some error in server")
      console.error("Error fetching commit activity:", error);
    }
  };
  useEffect(() => {
    fetchCommitActivity();
    fetchContributorData();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-start row">
      <h3>Commit Activity for {repo?.name}</h3>
      {/* Render the time series graphs */}
      {commitActivity.length>0 ? (
        <TimeSeriesGraph commitActivity={commitActivity} />
      ) : (
        <p>Data not available</p>
      )}
      {contributorData.length>0 ? (
        <ContributorChangesGraph contributorData={contributorData} />
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};

export default CommitActivity;
