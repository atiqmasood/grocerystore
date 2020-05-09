import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 40 + rand();
  const left = 48 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AppModal({isModalOpen, handleModal}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  function onClose(){
      handleModal(true);
  }

  return (
    <div>
      <button type="button" onClick={handleModal}>
        Open Modal
      </button>
      <Modal
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
            <Alert severity="success">You have successfully ordered!</Alert>
        </div>
      </Modal>
    </div>
  );
}