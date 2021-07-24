import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    dialogContent: {
      width: 'min-content'
    },

    form: {
      display: 'flex',
      gap: '42px',
    },

    formDiv:{
      display: 'flex',
      flexDirection: 'column',
      width: 300,
      gap: '12px'
    },

    uploadDiv: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    },

    profilePicture: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%)',
      border: '2px solid rgba(251, 59, 0, 0.2)',
      boxSizing: 'border-box',
      borderRadius: '16px',
      width: 250,
      height: 250
    },

    switchBase: {
      color: green[300],
    }
  }));

