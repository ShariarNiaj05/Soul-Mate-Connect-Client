import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SuccessCounter = () => {
  return (
    <div>
      <Typography variant="h3" component="div" align="center">
        Our Success
      </Typography>
      <Grid container alignItems="center" justifyContent="center">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
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
      </Grid>
    </div>
  );
};

export default SuccessCounter;

SuccessCounter.propTypes = {
  props: PropTypes.any,
};
