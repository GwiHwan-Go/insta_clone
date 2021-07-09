import { gql, useQuery } from "@apollo/client";
import {logUserOut } from "../apollo";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            user {
                username
                avatar
            }
            ...PhotoFragment
            comments {
                ...CommentFragment  
            }
            createdAt
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

function Home(){
    const {data} = useQuery(FEED_QUERY);
    return (
    <div>
        <PageTitle titleName="Feed"/>
        {data?.seeFeed?.map(photo =>
            <Photo 
                key={photo.id}
                id={photo.id} 
                user={photo.user} 
                file={photo.file} 
                isLiked={photo.isLiked} 
                likesNumber={photo.likesNumber}
                caption={photo.caption}
                commentNumber={photo.commentNumber}
                comments={photo.comments}
            />
            )}
        <h1>Welcome we did it!</h1>
        <button onClick={()=>logUserOut()}>Log out now!</button>
    </div>
    )
}

export default Home;