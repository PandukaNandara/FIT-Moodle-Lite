import { useState, useEffect } from "react";
import SubjectCard from "../../components/SubjectCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import Subject from "../../models/Subject";
import SubjectCreation from "./SubjectCreation";
import { SubjectService } from "../../services/subServices/SubjectService";
import { useAppBarContext } from "../../layouts/main/MainLayout";

const subjectService = new SubjectService();

const AllSubjectScreen = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const appBarContext = useAppBarContext();
  useEffect(() => {
    appBarContext.setTitle("All Subjects");
    subjectService.stream((data) => {
      setSubjects(data);
      setLoading(false);
    });
  }, [appBarContext]);

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={{ width: "100%", padding: 5 }}>
      <SubjectCreation />
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {subjects.map((subject) => (
          <Grid item xs={12} key={subject.code}>
            <SubjectCard data={subject} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllSubjectScreen;
