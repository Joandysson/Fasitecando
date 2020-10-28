import { makeStyles, Theme, createStyles } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      background: '#FFFFFF',
      borderRadius: '5px'
    },
    container: {
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    form: {
        width: '90%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
    },
    h3: {
        marginBottom: '35px'
    },
    span: {
      marginTop: '20px',
      fontSize: '1rem'
    }
  }),
);

export default useStyles;