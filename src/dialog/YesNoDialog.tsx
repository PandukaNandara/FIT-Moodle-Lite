import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface YesNoDialogProps {
  title: string;
  content: string;
  open: boolean;
  yesText?: string;
  noText?: string;
  yesHandle: () => void;
  noHandle: () => void;
  handleClose?: () => void;
}

export const YesNoDialog: React.FC<YesNoDialogProps> = ({
  title,
  content,
  open,
  yesText = "Yes",
  noText = "No",
  yesHandle,
  noHandle,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={noHandle}>{noText}</Button>
        <Button onClick={yesHandle}>{yesText}</Button>
      </DialogActions>
    </Dialog>
  );
};
