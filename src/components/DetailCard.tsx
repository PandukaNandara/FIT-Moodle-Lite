import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  id?: string;
  description: string;
  url: string;
  date: Date;
  onEdit: () => void;
  onDelete: () => void;
}

const DetailCard: React.FC<Props> = ({
  description,
  url,
  date,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => window.open(url)}>
          <OpenInNewIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DetailCard;
