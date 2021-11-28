import React, { useState, useEffect } from "react";
import SubjectCard from "../../components/SubjectCard";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import db from "../../config/firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";
import Subject from "../../models/Subject";

const AllSubjectScreen = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, "subjects"), (snapshot) => {
      setSubjects(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Subject))
      );
      setLoading(false);
    });
  }, []);

  return loading ? (
    <CircularProgress />
  ) : (
    <Box sx={{ width: "100%", padding: 20 }}>
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
