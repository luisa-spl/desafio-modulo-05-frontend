import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function InputSenha(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleClickShowPassword = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl>
      <OutlinedInput
        id="passwordLogin"
        type={mostrarSenha ? 'text' : 'password'}
        {...props.register()}
        className={props.className}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="trocar visibilidade da senha"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {mostrarSenha ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default InputSenha