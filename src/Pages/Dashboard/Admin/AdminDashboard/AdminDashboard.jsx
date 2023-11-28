import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Typography } from "@mui/material";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // console.log(stats);

  const statistics = [
    { name: "Total Biodata", value: stats?.totalBiodataCount },
    { name: "Total Male Biodata", value: stats?.totalMaleBiodataCount },
    { name: "Total Female Biodata", value: stats?.totalFemaleBiodataCount },
    { name: "Total Premium Biodata", value: stats?.totalPremiumBiodataCount },
    // { name: "Total Revenue", value: stats?.revenue },
  ];
  const revenue = [
   
    { name: "Total Revenue", value: stats?.revenue },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return <p>loading............</p>;
  }

  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        Statistics{" "}
      </Typography>
      <div className=" flex justify-evenly">
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={statistics}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statistics.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip></Tooltip>
            <Legend></Legend>
          </PieChart>
        </div>
              <div>
              <PieChart width={400} height={400}>
            <Pie
              data={revenue}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {revenue.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip></Tooltip>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.propTypes = {
  props: PropTypes.any,
};
