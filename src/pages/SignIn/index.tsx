import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Button, Container, Box, TextField, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import styles from './../../assets/stylesLoginRegister';
import api from '../../services/api';
import { saveCookie, getCookies } from '../../utils/cookies';
import { Link, useHistory } from 'react-router-dom';
import { validLogin } from '../../utils/validations';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
  const classes = styles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [error, setError] = useState<any>();

  const history = useHistory()
  const changeInputEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value)
  }, [inputEmail])

  const changeInputPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value)
  }, [inputPassword])

  useEffect(() => {
    const cookie = getCookies();
    if (cookie.token !== 'QpwL5tke4Pnpja7X4') return
    history.push('/list')
  })

  async function authentication(e: FormEvent) {
    e.preventDefault()
    setError('')
    const data = {
      "email": inputEmail,
      "password": inputPassword
    };

    const validation = await validLogin(inputEmail, inputPassword)
    if(typeof validation !== "boolean" && validation !== true) {
      setError(validation)
      return
    }

    try {
      const response = await api.post('/login', data)
      saveCookie('token', response.data.token)
      history.push('/list')

    } catch (error) {
      setOpenSnackbar(true)
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
          <h3 className={classes.h3}>Efetuar login</h3>
          <TextField error={error?.email ? true: false} helperText={error?.email} color='secondary' id="email" name="email" margin={'dense'} fullWidth label="E-mail" onChange={changeInputEmail} variant="outlined" />
          <TextField error={error?.password ? true: false} helperText={error?.password} color='secondary' id="password" name="password" type='password' margin={'dense'} fullWidth label="Senha" onChange={changeInputPassword} variant="outlined" />
          <br />
          <Button type="submit" variant="contained" color="secondary">Entrar</Button>
          <span className={classes.span}>Ainda não tem uma conta? <Link to="/register">Registrar</Link></span>
        </form>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Erro ao fazer login
        </Alert>
      </Snackbar>
    </Container>
  );
}