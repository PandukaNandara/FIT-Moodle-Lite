import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type DialogType = {
  description: string;
  url: string;
  date: Date;
};

interface DialogPros {
  updatingValue?: DialogType;
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DialogType) => void;
}

const DetailDialog: React.FC<DialogPros> = ({
  updatingValue = {},
  title,
  open,
  onClose,
  onSubmit,
}) => {
  const { description, url, date } = updatingValue;

  const [descriptionLocal, setDescriptionLocal] = useState<string>();
  const [urlLocal, setUrlLocal] = useState<string>();

  const [error, setError] = useState({
    description: "",
    url: "",
  });

  useEffect(() => {
    setDescriptionLocal(description);
    setUrlLocal(url);
  }, [description, url]);

  const onSubmitLocal = () => {
    const errorLocal = {
      description: !Boolean(descriptionLocal) ? "Required" : undefined,
      url: !Boolean(urlLocal) ? "Required" : undefined,
    };
    setError(errorLocal as any);
    if (errorLocal.description || errorLocal.url) return;
    if (updatingValue.date) {
      //  this is an update
      onSubmit({
        description: descriptionLocal!,
        url: urlLocal!,
        date: date!,
      });
    } else {
      onSubmit({
        description: descriptionLocal!,
        url: urlLocal!,
        date: new Date(),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <br />
        <TextField
          label="Description"
          name="description"
          onChange={(e) => setDescriptionLocal(e.target.value)}
          value={descriptionLocal}
          error={Boolean(error.description)}
          helperText={error.description}
        />
        <br />
        <br />
        <TextField
          label="URL"
          name="url"
          type="url"
          value={urlLocal}
          onChange={(e) => setUrlLocal(e.target.value)}
          error={Boolean(error.url)}
          helperText={error.url}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmitLocal}>
          SUBMIT
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
