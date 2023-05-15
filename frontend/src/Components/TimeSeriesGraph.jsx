import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const TimeSeriesGraph = ({ commitActivity }) => {
  const [displayOption, setDisplayOption] = useState('changes');

  const handleDisplayOptionChange = (e) => {
    setDisplayOption(e.target.value);
  };

  const data = commitActivity.map((week) => ({
    week: new Date(week[0] * 1000),
    changes: week[1] - week[2], // Total changes = Additions + Deletions
    additions: week[1],
    deletions: -1*week[2],
  }));

  return (
    <div className='flex flex-col mb-4 items-center justify-start'>
      <div>
        <label htmlFor="displayOption">Display Option:</label>
        <select id="displayOption" value={displayOption} onChange={handleDisplayOptionChange}>
          <option value="changes">Changes</option>
          <option value="additions">Additions</option>
          <option value="deletions">Deletions</option>
        </select>
      </div>

      <h2>Total Number of {displayOption.charAt(0).toUpperCase() + displayOption.slice(1)}</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="week" tickFormatter={(date) => date.toLocaleDateString()} />
        <YAxis />
        <Tooltip
          labelFormatter={(date) => date.toLocaleDateString()}
          formatter={(value) => [value, displayOption]}
        />
        <Line type="monotone" dataKey={displayOption} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TimeSeriesGraph;

