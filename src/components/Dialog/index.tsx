import React, { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalProps } from '@material-ui/core';
import './styles.css';

interface DialogProps {
  open: boolean,
  title: string,
  description: string,
  close: ModalProps['onClose']
}

const FormDialog:FC<DialogProps> = ({children, open, title, description, close}) =>  {

  return (
    <div>
      <Dialog open={open} onClose={close} className="color" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          { children }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormDialog