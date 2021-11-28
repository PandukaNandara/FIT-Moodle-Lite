import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReminderCard from "../../../components/ReminderCard";
import AddIcon from "@mui/icons-material/Add";
import CreateReminderDialog from "../../../dialog/CreateReminderDialog";
import ReminderService from "../../../services/ReminderService";
import Reminder from "../../../models/Reminder";

const OneSubjectScreen = () => {
  const { subjectId } = useParams();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createOnClickHandler = (e: React.ChangeEvent<any>) => {
    handleClickOpen();
  };
  const [allReminders, setAllReminders] = useState<Reminder[]>();
  const reminderService = new ReminderService(subjectId as string);
  const getAllReminders = (reminders: Reminder[]) => {
    setAllReminders(reminders);
  };
  useEffect(() => {
    reminderService.stream(getAllReminders);
  }, []);
  console.log(allReminders);
  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h3">Reminders</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={createOnClickHandler}
              fullWidth
              startIcon={<AddIcon />}
            >
              New Reminder
            </Button>
          </Grid>
        </Grid>
      </Box>
      {allReminders?.map((reminder) => (
        <div>
          <ReminderCard key={reminder.description} reminder={reminder} />
        </div>
      ))}
      <CreateReminderDialog
        handleClose={handleClose}
        open={open}
        subjectId={subjectId as string}
      />
    </div>
  );
};

export default OneSubjectScreen;
