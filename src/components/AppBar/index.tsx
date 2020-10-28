import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { removeCookie } from '../../utils/cookies';
import { useHistory } from 'react-router-dom';
import styles from './styles';

export default function ButtonAppBar() {
  const classes = styles();
  const history = useHistory()

  function logout() {
    removeCookie('token');
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
