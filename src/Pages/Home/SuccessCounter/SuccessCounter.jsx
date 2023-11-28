import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: totalMarriage = {} } = useQuery({
    queryKey: ["total-marriage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-story");
      return res.data;
    },
  });

  console.log(stats);
  return (
    <div>
      <Typography align="center" variant="h3" color={"primary"}>
        Our Success
      </Typography>

      {/* <Grid container alignItems="center" justifyContent="center" >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          className=" flex flex-col md:flex-row"
          
        >
          <Item>
            <Button variant="outlined" color="success">
              Total Biodata 1
            </Button>
          </Item>
          <Item>
            {" "}
            <Button variant="outlined" color="success">
              Girls Biodata 2
            </Button>
          </Item>
          <Item>
            {" "}
            <Button variant="outlined" color="success">
              Boys Biodata 3
            </Button>
          </Item>
          <Item>
            {" "}
            <Button variant="outlined" color="success">
              Marriages Completed 3
            </Button>
          </Item>
        </Stack>
      </Grid> */}

      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 150,
            height: 200,
          },
        }}
      >
        {/* <Paper elevation={0} /> */}
        <Paper
          sx={{
            width: "25%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <p className=" text-xl font-semibold">Total Biodatas</p>
          <Button variant="contained">{stats.totalBiodataCount}</Button>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <p className=" text-xl font-semibold">Total Girls Biodata</p>
          <Button variant="contained">{stats.totalFemaleBiodataCount}</Button>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <p className=" text-xl font-semibold">Total Boys Biodata</p>
          <Button variant="contained">{stats.totalMaleBiodataCount}</Button>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <p className=" text-xl font-semibold">Total Marriages</p>
          <Button variant="contained">{totalMarriage.length}</Button>
        </Paper>

        {/* <Paper elevation={2} /> */}
      </Box>
    </div>
  );
};

export default SuccessCounter;

SuccessCounter.propTypes = {
  props: PropTypes.any,
};
