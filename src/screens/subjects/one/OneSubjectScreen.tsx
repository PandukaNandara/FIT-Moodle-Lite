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
