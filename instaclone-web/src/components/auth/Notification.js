import styled from "styled-components";

const SNotification = styled.span`
    color: #2ecc71;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 0px;

`

function Notification({message}){
    return message === "" || !message ? null : <SNotification>{message}</SNotification>
};

export default Notification;