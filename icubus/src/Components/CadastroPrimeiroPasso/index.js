import { useState } from 'react'

import useStyles from './styles';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Backdrop,
    CircularProgress,
    Link,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




function CadastroPrimeiroPasso() {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        showRepeatPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values)
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowRepeatPassword = () => {
        setValues({ ...values, showRepeatPassword: !values.showRepeatPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <div className={classes.cardCadastro}>
                <form action="" className={classes.formsCadastro}>
                    <Typography className={classes.cadastroTitle}>Cadastro</Typography>
                    <Typography className={classes.credentialsStyle}>Nome de usuário</Typography>
                    <OutlinedInput id="input-nome-usuario" type='text' value={""} onChange={""} />

                    <Typography className={classes.credentialsStyle}>Email</Typography>
                    <OutlinedInput id="input-email" type='email' value={""} onChange={""} />

                    <Typography className={classes.credentialsStyle}>Senha</Typography>
                    <OutlinedInput
                        id="input-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <Typography className={classes.credentialsStyle}>Repita sua senha</Typography>
                    <OutlinedInput
                        id="input-password"
                        type={values.showRepeatPassword ? 'text' : 'password'}
                        value={values.repeatPasswordpassword}
                        onChange={handleChange('repeatPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowRepeatPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <div className={classes.containerButtonCadastro}>
                        <Button className={classes.buttonCadastro}>
                            Anterior
                        </Button>
                        <Button className={classes.buttonCadastro} variant="contained" >
                            Próximo
                        </Button>
                    </div>
                </form>
                <div className={classes.linkLogin}>
                    <Typography>Já tem uma conta? <Link href="/cadastro" >Login </Link> </Typography>

                </div>
            </div>
        </div>
    )
}

export default CadastroPrimeiroPasso
