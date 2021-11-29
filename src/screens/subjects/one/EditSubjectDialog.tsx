import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { collection, updateDoc, doc, getFirestore } from "@firebase/firestore";
import { useParams } from "react-router";
import { firebaseApp } from "../../../config/firebaseConfig";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  name?: string;
  code?: string;
  lecturer?: string;
}

export default function SubjectCreation({ name, code, lecturer }: Props) {
  const { subjectId } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fname, setName] = React.useState(name);
  const [fcode, setCode] = React.useState(code);
  const [flecturer, setLecturer] = React.useState(lecturer);

  const handleName = (event: any) => {
    setName(event.target.value);
  };

  const handleCode = (event: any) => {
    setCode(event.target.value);
  };

  const handleLecturer = (event: any) => {
    setLecturer(event.target.value);
  };

  const handleSubmitTask = async () => {
    const data = {
      name: fname,
      code: fcode,
      lecturer: flecturer,
    };

    try {
      setOpen(false);
      await updateDoc(
        doc(collection(getFirestore(firebaseApp), "subjects"), subjectId),
        data
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleOpen}>
        <Fab color="primary" aria-label="edit">
          <EditIcon />
        </Fab>
      </Box>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogTitle>Update Subject</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="given-name"
            name="subject_name"
            required
            fullWidth
            id="subject_name"
            label="Subject Name"
            style={{ marginBottom: 10, marginTop: 10 }}
            autoFocus
            onChange={handleName}
            value={fname}
          />
          <TextField
            required
            fullWidth
            id="subject_code"
            label="Subject Code"
            name="subject_code"
            autoComplete="subject_code"
            onChange={handleCode}
            value={fcode}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <TextField
            required
            fullWidth
            value={flecturer}
            id="subject_lecturer"
            label="Subject Lecturer"
            name="subject_lecturer"
            autoComplete="subject_lecturer"
            onChange={handleLecturer}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmitTask}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
