import styled from "styled-components"

const SAvatar = styled.div`
    width:18px;
    height:18px;
    border-radius: 50%;
    background-color: black;
    overflow: hidden;
`;

const Img = styled.img`
    max-width: 100%;
`;

function Avatar({url = ""}){
    return (
    <SAvatar>
        {url !==""? <Img src={url}/> : null}
    </SAvatar>
    );
}

export default Avatar;