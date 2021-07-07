import styled from "styled-components";

const SFormError = styled.span`
    color: tomato;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 11px;

`

function FormError({message}){
    return message === "" || !message ? null : <SFormError>{message}</SFormError>
};

export default FormError;