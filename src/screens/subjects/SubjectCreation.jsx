import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import db from "../../services/subServices/subFirebaseConfig";


const style_modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SubjectCreation() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [fname, setName] = React.useState();
    const [fcode, setCode] = React.useState();
    const [flecturer, setLecturer] = React.useState();

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleCode = (event) => {
        setCode(event.target.value);
    };

    const handleLecturer = (event) => {
        setLecturer(event.target.value);
    };

    const handleSubmitTask = async () => {

        const data = { 
            name:fname,
            code:fcode,
            lecturer:flecturer
         };

        try {
            console.log("this is reached!1")
            await db.collection("subjects").doc("1").set(data);
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false);
            //window.location.reload();
        }
    }

    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleOpen}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style_modal} component="form" noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="subject_name"
                                    required
                                    fullWidth
                                    id="subject_name"
                                    label="Subject Name"
                                    autoFocus
                                    onChange={handleName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="subject_code"
                                    label="Subject Code"
                                    name="subject_code"
                                    autoComplete="subject_code"
                                    onChange={handleCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="subject_lecturer"
                                    label="Subject Lecturer"
                                    name="subject_lecturer"
                                    autoComplete="subject_lecturer"
                                    onChange={handleLecturer}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitTask}
                        >
                            Submit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

