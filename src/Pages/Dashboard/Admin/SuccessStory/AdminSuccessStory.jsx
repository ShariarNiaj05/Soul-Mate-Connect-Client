import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AdminSuccessStory = () => {
  const [successStories, setSuccessStories] = useState([]);
  const axiosPublic = useAxiosPublic();
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(!open);
  // const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [selectedSuccessStory, setSelectedSuccessStory] = useState(null);

  const [modalContent, setModalContent] = useState("");

  const handleOpen = (successStory) => {
     setSelectedSuccessStory(successStory);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(async () => {
      const res = await axiosPublic.get("/admin-success-story");
      // console.log(res);
      setSuccessStories(res.data);
    }, 500);
  }, [axiosPublic]);
  console.log(successStories);

  const handleViewStory = (id) => {
    console.log(id);
  };
  console.log(modalContent);
  return (
    <table>
      <Typography align="center" variant="h3" color={"primary"}>
        View Success Story
      </Typography>
      <thead className=" flex justify-center mt-10">
        <tr className=" flex justify-between gap-5 text-center">
          <th>Male Biodata Id</th>
          <th>Female Biodata Id</th>
          <th>View Story</th>
        </tr>
      </thead>
      <tbody className=" flex justify-center mt-5">
        <div>
          {successStories.map((successStory) => (
            <tr
              key={successStory._id}
              className=" flex justify-between gap-5 text-center mb-10"
            >
              <td>{successStory.maleBiodataId}</td>
              <td>{successStory.femaleBiodataId}</td>
              <div>
                <Button
                  onClick={() => handleOpen(successStory)}
                  variant="contained"
                  color="secondary"
                >
                  View Story
                </Button>
              </div>
            </tr>
          ))}
        </div>
      </tbody>
      {
        selectedSuccessStory && (<Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Success Story
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             {selectedSuccessStory.successStoryText}
            </Typography>
          </Box>
        </Modal>)
      }
    </table>
  );
};

export default AdminSuccessStory;

AdminSuccessStory.propTypes = {
  props: PropTypes.any,
};
