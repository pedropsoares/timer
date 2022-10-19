import styled, {css} from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariant = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`

  width: 100px;
  height: 40px;
  border-radius: 5px;
  border: 0;
  margin: 5px;

  background-color: ${props => props.theme['green-500']};
  color: ${props => props.theme.white};

  /* ${props => css`background-color: ${buttonVariant[props.variant]}`} */

`