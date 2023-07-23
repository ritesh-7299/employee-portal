import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  // months.forEach((month) => {
  //   return month === time ? { time, amount } : { time: month, amount: 0 };
  // });
  return { time, amount };
}

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Chart({ data }) {
  const theme = useTheme();
  let newData = {};
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  data.map((item) => {
    return (newData[item.month] = item.count);
  });

  const graphData = [];

  months.forEach((month, index) => {
    if (Object.keys(newData).includes(month)) {
      graphData.push(createData(month, newData[month]));
    } else {
      currentMonth <= index
        ? graphData.push(createData(month, undefined))
        : graphData.push(createData(month, 0));
    }
  });

  return (
    <React.Fragment>
      <Title>This year: {currentYear}</Title>
      <ResponsiveContainer>
        <LineChart
          data={graphData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Employee count
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
