import React, { useState, FC } from "react";
import {
  CardContent,
  Typography,
  Card,
  Container,
  IconButton,
  Grid,
  CardActionArea,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { YesNoDialog } from "../dialog/YesNoDialog";
import EditReminderDialog from "../dialog/EditReminderDialog";
import Reminder from "../models/Reminder";
import ReminderService from "../services/ReminderService";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "30px",
    marginTop: "10px",
  },
  body: {
    border: "none",
    boxShadow: "none",
    height: "100px",
    padding: "10px 10px 10px 10px",
  },
  tagBody: {
    border: "none",
    boxShadow: "none",
    height: "60px",
    padding: "10px 10px 10px 10px",
  },
  label: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: "10px 10px",
    borderRadius: "10px",
    backgroundColor: "#C5C4D2",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  typography: {
    fontWeight: 20,
  },
}));

interface ReminderCardProps {
  reminder: Reminder;
}

const ReminderCard: FC<ReminderCardProps> = ({ reminder }) => {
  const [isSetDelete, setIsSetDelete] = useState(false);
  const openYesNoDialog = () => {
    setIsSetDelete(true);
  };

  const deleteReminder = () => {
    if (reminder.id) {
      const reminderService = new ReminderService(reminder.id);
      reminderService.delete(reminder.id);
    }
    setIsSetDelete(false);
  };

  const cancelDeleteReminder = () => {
    setIsSetDelete(false);
  };

  const classes = useStyles();

  const mouseDown = (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editOnClickHandler = (e: React.ChangeEvent<any>) => {
    handleClickOpen();
  };

  const deleteOnClickHandler = (e: React.ChangeEvent<any>) => {
    openYesNoDialog();
  };
  // const displayDate = new Date(reminder.expireDate.getSeconds());

  // console.log(new Date((reminder.expireDate as unknown as number)*10).toUTCString());
  // console.log(new Date((reminder.expireDate as unknown )*10).toUTCString());

  return (
    <>
      <Container>
        <Card className={classes.root} elevation={4}>
          <CardActionArea>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card className={classes.body}>
                        <Typography variant="h6">
                          {reminder.description}
                        </Typography>
                        <Typography variant="body1">
                          Dead Line {new Date().toUTCString()}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                      <Grid container spacing={5}>
                        <Grid sm={5} md={5} xl={5} xs={5} lg={5}></Grid>
                        <Grid sm={3} md={3} xl={3} xs={3} lg={3}>
                          <IconButton
                            onMouseDown={mouseDown}
                            onClick={editOnClickHandler}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid sm={3} md={3} xl={3} xs={3} lg={3}>
                          <IconButton
                            onMouseDown={mouseDown}
                            onClick={deleteOnClickHandler}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                        <Grid sm={1} md={1} xl={1} xs={1} lg={1}></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>

      <YesNoDialog
        open={isSetDelete}
        title="Delete"
        content="Do you want delete permanently?"
        yesHandle={deleteReminder}
        noHandle={cancelDeleteReminder}
      />

      <EditReminderDialog
        open={open}
        handleClose={handleClose}
        reminder={reminder}
      />
    </>
  );
};

export default ReminderCard;
