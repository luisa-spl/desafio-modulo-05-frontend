import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
        maxWidth:  400,
        minHeight: 'min-content',
        padding: '0.5rem',
        boxShadow: '0px 4px 6px rgba(50, 50, 50, 0.24)',
        borderRadius: '24px'
      },
    
      divContent: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: '0.5rem',
          width: '10rem',
          height: '8.7rem',
      },
    
      cardContent: {
          display: 'flex',
          gap: '2rem',
          height: '9rem',
          position: 'relative'
      },
    
      cardImg: {
        borderRadius: '16px',
      },
    
      priceDiv: {
          background: 'linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), #FFFFFF',
          borderRadius: '4px',
          width: 'min-content',
          color: '#006335',
          fontWeight: 'bold'
      },
    
      h2: {
          margin: 0,
          color: 'rgba(82, 84, 89, 1)'
      },
    
      spanDesc: {
          flexGrow: 1,
          marginTop: '0.3rem',
          color: 'rgba(34, 34, 34, 0,87)'
      },
    
      modalAberto: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          position: 'absolute',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(6px)',
          borderRadius: '24px',
          width: '24rem',
          height: '10.8rem',
          zIndex: 2,
          marginTop: '-10.8rem',
      },
    
      modalFechado: {
          display: 'none'
      }

      
}));