import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {logUserOut } from "../apollo";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likesNumber
            comments
            createdAt
            isMine
        }
    }
`;
function Home(){
    const {data} = useQuery(FEED_QUERY);
    // console.log(data);
    const history = useHistory();
    return (
    <div>
        <h1>Welcome we did it!</h1>
        <button onClick={()=>logUserOut(history)}>Log out now!</button>
    </div>
    )
}

export default Home;