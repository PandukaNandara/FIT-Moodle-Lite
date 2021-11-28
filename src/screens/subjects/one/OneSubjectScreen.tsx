import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReminderCard from "../../../components/ReminderCard";
import AddIcon from "@mui/icons-material/Add";
import CreateReminderDialog from "../../../dialog/CreateReminderDialog";
import ReminderService from "../../../services/ReminderService";
import Reminder from "../../../models/Reminder";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Kuppi from "../../../components/Kuppi";
import RecReading from "../../../components/RecReading";
import StudentNotes from "../../../components/StudentNotes";
import EditSubject from "./EditSubjectDialog";
import DeleteSubject from "./DeleteSubjectDialog";
import Subject from "../../../models/Subject";
import { SubjectService } from "../../../services/subServices/SubjectService";
import KuppiSection from "./KuppiSection";
import { useAppBarContext } from "../../../layouts/main/MainLayout";
import RecommendedReadingSection from "./RecommendedReadingSection";


const mdTheme = createTheme();
const subjectService = new SubjectService();
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
  // return <div>This is 0ne subject {subjectId}</div>;
  const [subject, setSubject] = useState<Subject>();
  const appBarContext = useAppBarContext();

  useEffect(() => {
    if (subjectId)
      subjectService.getOne(subjectId).then((e) => {
        setSubject(e);
        appBarContext.setTitle(e.name);
      });
  }, [appBarContext, subjectId]);

  return !subject ? (
    <div />
  ) : (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={11} lg={11}>
                <EditSubject {...subject} />
              </Grid>
              <Grid item xs={12} md={1} lg={1}>
                <DeleteSubject />
              </Grid>
              {/* Kuppi */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <KuppiSection subjectId={subjectId!} />
                </Paper>
              </Grid>
              {/* Readings */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <RecommendedReadingSection subjectId={subjectId!} /> 
                </Paper>
              </Grid>
              {/* Notes */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <StudentNotes />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OneSubjectScreen;
