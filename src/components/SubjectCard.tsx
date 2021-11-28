import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import Subject from "../models/Subject";

interface SubjectCardProps {
  data: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ data }) => {
  const { name, lecturer, code, id } = data;
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => id && navigate(`subjects/${id}`)}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Lecturer : {lecturer}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {code}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default SubjectCard;
