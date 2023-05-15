import React, { useEffect, useState } from "react";
import RepositoryList from "./Components/RepositoryList ";
import axios from "axios";

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("1week");
  const fetchRepositories = async () => {
    const currentDate = new Date();
    let createdDate;

    if (timeRange === '1week') {
      createdDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
    } else if (timeRange === '2weeks') {
      createdDate = new Date(currentDate.setDate(currentDate.getDate() - 14));
    } else if (timeRange === '1month') {
      createdDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    }
    const formattedDate = createdDate.toISOString().split('T')[0];
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}`
      );
      const newRepositories = response.data.items;

      setRepositories((prevRepositories) => [
        ...new Set([...prevRepositories, ...newRepositories]),
      ]);
    } catch (error) {
      alert("Error while fetching repositories");
    }
    setLoading(false);
  };
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    setRepositories([]);
    fetchRepositories()
  };
  useEffect(() => {
    fetchRepositories();
  }, [page]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start gap-4">
      <div className="mb-4">
        <label htmlFor="timeRange" className="mr-2 font-semibold">
          Time Range:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="1week">1 Week</option>
          <option value="2weeks">2 Weeks</option>
          <option value="1month">1 Month</option>
        </select>
      </div>
      <h2 className="text-xl font-bold mb-2">Most Starred Repositories</h2>
      <RepositoryList repositories={repositories} />
      {loading && <p>Loading...</p>}
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default App;
