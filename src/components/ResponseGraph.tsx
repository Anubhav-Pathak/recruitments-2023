"use client"
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResponseTimeAreaChart = ({ responses }) => {
  const calculateResponseTime = (createdAt) => {
    const currentTime = new Date();
    const responseTime = currentTime - new Date(createdAt);
    return responseTime;
  };

  const interval = 'hour'; 

  const groupedData = responses.reduce((groups, response) => {
    const timestamp = new Date(response.createdAt).getTime();
    const intervalTimestamp = Math.floor(timestamp / (1000 * 60 * 60)); 
    if (!groups[intervalTimestamp]) {
      groups[intervalTimestamp] = {
        intervalTimestamp,
        count: 1,
        createdAt: response.createdAt,
      };
    } else {
      groups[intervalTimestamp].count++;
    }
    return groups;
  }, {});

  const data = Object.values(groupedData).map((group) => {
    const intervalLabel = `${group.count} response${group.count !== 1 ? 's' : ''}`;
    const createdAt = new Date(group.createdAt);
    const timeAgo = calculateTimeAgo(createdAt);
    return {
      name: `${timeAgo} (${createdAt.toLocaleString()})`, 
      responses: group.count,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip
          formatter={(value) => [`${value} responses`, '']}
          labelFormatter={(name) => `${name}`} 
        />
        <Area type="monotone" dataKey="responses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorResponses)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ResponseTimeAreaChart;

function calculateTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }
}
