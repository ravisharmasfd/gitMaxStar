import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ContributorChangesGraph = ({ contributorData }) => {
  const data = contributorData.map((contributor) => ({
    contributor: contributor.author?.login,
    weeks: contributor.weeks.map((week) => ({
      week: new Date(week.w * 1000).toLocaleDateString(), // Convert Unix timestamp to human-readable date
      changes: week.c, // Total changes (commits) for the week
      contributor:contributor.author?.login
    })),
  }));
  return (
    <div>
      <h2>Contributor Changes</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="week"  />
        <YAxis />
        <Tooltip
          formatter={(value, name, entry) => [value, `${entry.payload.contributor} - ${entry.payload.week}`]}
          labelFormatter={(label) => `Week: ${label}`}
        />
        <Legend />
        {data.map((contributor) => (
          <Line
            key={contributor.contributor}
            type="monotone"
            dataKey="changes"
            name={contributor.contributor}
            data={contributor.weeks}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each contributor
          />
        ))}
      </LineChart>
    </div>
  );
};

export default ContributorChangesGraph;
