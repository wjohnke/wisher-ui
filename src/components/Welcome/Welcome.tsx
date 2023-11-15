import {useRef, useState} from "react";
import './welcome.css';
import {Button, OutlinedInputProps, styled, TextField, TextFieldProps} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {useNavigate} from "react-router-dom";

const Welcome = (props: Iprops) => {
  const {captureUser} = props;
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Next page")
    captureUser(user);
    navigate("/Groups")
  }

  return (
    <div className={'welcome-wrapper'}>
      <div className={'title'}>
        please enter your name
      </div>
      <div className={'input'}>
        <div className={'input-text-box'}>
          <CustomTextField fullWidth id="outlined-basic" label="Name" variant="outlined"
                           value={user}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                             setUser(event.target.value);
                           }}
          />
        </div>
        <CustomButton onClick={() => handleSubmit()} variant="text" endIcon={
          <FontAwesomeIcon icon={icon({name: 'wand-sparkles'})}/>}>
          enter
        </CustomButton>
      </div>
    </div>
  )
}

const CustomTextField = styled(TextField)`
  fieldset {
    border-radius: 50px;
  }
`;

const CustomButton = styled(Button)`
  font-family: 'Lexend Deca';
  text-transform: lowercase;
  color: black;
`;

interface Iprops {
  captureUser: (arg: string) => void;
}

export default Welcome;
