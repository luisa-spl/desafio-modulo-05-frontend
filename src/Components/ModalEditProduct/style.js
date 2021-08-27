import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
const font = "'Baloo 2', sans-serif";

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
      alignItems: 'center',
      gap: '32px',
      borderRadius: '16px'
    },

    profilePicture: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%)',
      boxSizing: 'border-box',
      borderRadius: '16px',
      width: 250,
      height: 250,
      position: 'relative'
    },

    switchBase: {
      color: green[300],
    },

    dialogTitle: {
      color: '#D13201',
      fontWeight: 'bold',
      fontFamily: font
    },

    btnClose: {
      textColor:'#D13201', 
    }
  }));
