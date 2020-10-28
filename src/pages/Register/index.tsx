import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Button, Container, Box, TextField, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import styles from './../../assets/stylesLoginRegister';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { validLogin } from '../../utils/validations';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
  const classes = styles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [typeSnack, setTypeSnack] = useState<Color>('success');
  const [messageSnack, setMessageSnack] = useState<string>('');
  const [error, setError] = useState<any>();

  const changeInputEmail = useCallback((e: ChangeEvent<HTMLInputElement>) =>{
    setInputEmail(e.target.value)
  }, [inputEmail])

  const changeInputPassword = useCallback((e: ChangeEvent<HTMLInputElement>) =>{
    setInputPassword(e.target.value)
  }, [inputPassword])

  function infoSnack(message: string, type: Color) {
    setMessageSnack(message)
    setTypeSnack(type)
    setOpenSnackbar(true)
  }

  async function authentication(e: FormEvent){
    e.preventDefault()
    setError('')

    const validation = await validLogin(inputEmail, inputPassword)
    if(typeof validation !== "boolean" && validation !== true) {
      setError(validation)
      return
    }

    try {
      const response = await api.post('/register', {
        "email": inputEmail,
        "password": inputPassword
      })

      if(response.status !== 200) return

      infoSnack('Usuario cadastrado com sucesso', 'success');
    } catch (error) {
      infoSnack('Erro ao cadastar usuario', 'error');
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Box className={classes.box} display="flex" justifyContent="center" width="100%" height="450px" bgcolor="background.paper">
        <form className={classes.form} onSubmit={authentication} action="">
          <h3 className={classes.h3}>Cadastro</h3>
          <TextField error={error?.email ? true: false} helperText={error?.email} color='secondary' id="email" name="email" margin={'dense'} fullWidth label="E-mail" onChange={changeInputEmail} variant="outlined" />
          <TextField error={error?.password ? true: false} helperText={error?.password} id="password" color="secondary" name="password" type="password" margin={'dense'} fullWidth label="Senha" onChange={changeInputPassword} variant="outlined" />
          <br/>
          <Button type="submit" variant="contained"  color="secondary">Cadastrar</Button>
          <span className={classes.span}>Já tem uma conta? <Link to="/login">Login</Link></span>
        </form>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeSnack}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </Container>
  );
}