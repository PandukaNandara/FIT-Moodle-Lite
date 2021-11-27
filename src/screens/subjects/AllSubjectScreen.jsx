import React, { useState, useEffect } from 'react'
import SubjectCard from '../../components/SubjectCard';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CircularProgress } from "@mui/material";
import db from "../../config/firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const AllSubjectScreen = () => {

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onSnapshot(collection(db, "subjects"), (snapshot) => {
            setSubjects(snapshot.docs.map((doc) => doc.data()));
            console.log(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    }, []);


    return loading ? (
        <CircularProgress />
    ) : (
        <div>
            <Box sx={{ width: '100%', padding: 20 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    
                    {subjects.map((subject) => (
                        <Grid item xs={12} key={subject.code}>
                            <Item><SubjectCard data={subject} /></Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </div>
    )
}

export default AllSubjectScreen
