import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { collection, deleteDoc, doc, getFirestore } from "@firebase/firestore";
import { useNavigate, useParams } from "react-router";
import { firebaseApp } from "../../../config/firebaseConfig";

export default function DeleteSubject() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    handleClose();
    navigate('/', { replace: true });
    await deleteDoc(
      doc(collection(getFirestore(firebaseApp), 'subjects'), subjectId)
    );
  };

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleOpen}>
        <Fab color="secondary" aria-label="edit">
          <DeleteIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete the subject?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
