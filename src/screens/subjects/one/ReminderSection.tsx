import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReminderCard from "../../../components/ReminderCard";
import AddIcon from "@mui/icons-material/Add";
import CreateReminderDialog from "../../../dialog/CreateReminderDialog";
import ReminderService from "../../../services/ReminderService";
import Reminder from "../../../models/Reminder";

interface Props {
  subjectId: string;
}

const ReminderSection: React.FC<Props> = ({ subjectId }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(allReminders);
  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Box display="flex">
              <Typography variant="h6" flexGrow={1}>
                Reminder
              </Typography>
              <IconButton onClick={createOnClickHandler}>
                <AddIcon />
              </IconButton>
            </Box>
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

export default ReminderSection;
