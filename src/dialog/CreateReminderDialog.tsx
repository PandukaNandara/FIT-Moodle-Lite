import { Box, Card, Grid, TextareaAutosize, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Reminder from "../models/Reminder";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ReminderService from "../services/ReminderService";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    padding: "0px 50px 40px 40px",
    width: "70%",
  },
  typography: {
    fontWeight: 600,
  },
  textArea: {
    borderRadius: "10px",
  },
  submitButton: {},
  headingText: {
    fontWeight: 700,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          // sx={{
          //   position: "absolute",
          //   right: 8,
          //   top: 8,
          //   color: (theme: { palette: { grey: any[]; }; }) => theme.palette.grey[500],
          // }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface CreateReminderDialogProps {
  open: boolean;
  handleClose: () => void;
  subjectId: string;
}

const CreateReminderDialog: FC<CreateReminderDialogProps> = ({
  open,
  handleClose,
  subjectId,
}) => {
  const classes = useStyles();

  interface EditReminderState {
    description: string;
    expireDate: Date;
    url?: string;
  }

  const [editReminderValues, setEditReminderValues] =
    useState<EditReminderState>({
      description: "",
      url: "",
      expireDate: new Date(),
    });

  const handleEditChange = (prop: keyof EditReminderState) => (event: any) => {
    setEditReminderValues({
      ...editReminderValues,
      [prop]: event.target.value,
    });
  };

  const onCreateHandler = async () => {
    console.log(editReminderValues);
    const reminderService = new ReminderService(subjectId);
    const reminder = {
      description: editReminderValues.description,
      url: editReminderValues.url,
      expireDate: editReminderValues.expireDate,
      date: new Date(),
    } as Reminder;
    reminderService.create(reminder);
    setEditReminderValues({
      description: "",
      url: "",
      expireDate: new Date(),
    });
    handleClose();
  };

  return (
    <>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography className={classes.headingText} variant="h5">
            Create Reminder
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Card className={classes.root} style={{ width: "500px" }}>
            <Grid container>
              <Grid item xs={12} sm={9}>
                <Typography variant="h5" className={classes.typography}>
                  Description
                </Typography>
                <Box
                  sx={{
                    maxWidth: "100%",
                    margin: "10px 20px 30px 0",
                  }}
                >
                  <TextareaAutosize
                    className={classes.textArea}
                    minRows="8"
                    id="description"
                    aria-label="maximum height"
                    style={{ border: "1px solid #D3D3D3", width: "150%" }}
                    value={editReminderValues.description}
                    onChange={handleEditChange("description")}
                  />
                </Box>
                <Typography variant="h5" className={classes.typography}>
                  URL
                </Typography>
                <Box
                  sx={{
                    maxWidth: "120%",
                    margin: "10px 0px 30px 0",
                  }}
                >
                  <TextField
                    fullWidth
                    id="Description"
                    value={editReminderValues.url}
                    onChange={handleEditChange("url")}
                  />
                </Box>
                <Typography variant="h5" className={classes.typography}>
                  End Date
                </Typography>
                <Box
                  sx={{
                    maxWidth: "120%",
                    margin: "10px 0px -1px 0",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      value={editReminderValues.expireDate}
                      onChange={(newValue) => {
                        setEditReminderValues({
                          ...editReminderValues,
                          expireDate: newValue as Date,
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            className={classes.submitButton}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={onCreateHandler}
            className={classes.submitButton}
            variant="outlined"
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default CreateReminderDialog;
