import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const YesNoDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  content: string;
  buttonColor?: string;
}> = ({ open, buttonColor, onClose, title, content, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button color={buttonColor as any} onClick={onSubmit} variant="contained">
          Yes
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default YesNoDialog;
