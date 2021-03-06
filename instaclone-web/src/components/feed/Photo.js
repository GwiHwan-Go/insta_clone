import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import PropTypes from 'prop-types';
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 60px;
  max-width : 615px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`

const PhotoData = styled.div`
    
    padding: 12px 15px;
`

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
    font-size: 20px;
    }
`
const PhotoAction = styled.div`
    cursor:pointer;
    margin-right:10px;
`

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id:Int!){
        toggleLike(id: $id){
            ok
            error
        }
    }
`

function Photo({id, user, file, isLiked, likesNumber, caption, commentNumber, comments}){
    const updateToggleLike = (cache, result) => {
        const {data : {toggleLike : {ok}}} = result;
        if(ok){
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev){
                        return !prev
                    },
                    likesNumber(prev){
                        if(isLiked){
                            return prev-1;
                        }else {
                            return prev+1;
                        }
                    }
                }
            })
      }
    };
    const [toggleLikeMutation]=useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike,
    });
    return(
    <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.username}`}>
                    <Avatar lg={true} url={user.avatar}/>
                </ Link>
                <Link to={`/users/${user.username}`}>
                    <span>{user.username}</span>
                </ Link>
            </PhotoHeader>
                <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                                <FontAwesomeIcon
                                    style= {{color: isLiked? "tomato": "inherit"}}
                                    icon={isLiked? SolidHeart : faHeart} 
                                />
                        </PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faComment} /></PhotoAction>
                        <PhotoAction><FontAwesomeIcon icon={faPaperPlane} /></PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likesNumber ===1 ? "1 like" : `${likesNumber} likes`}</Likes>
                <Comments
                    photoId={id}
                    author={user.username}
                    caption={caption}
                    commentNumber={commentNumber}
                    comments={comments}
                />
            </PhotoData>
        </PhotoContainer>
    )
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
     user: PropTypes.shape({
         avatar:PropTypes.string,
         username:PropTypes.string.isRequired,
     }),
     caption: PropTypes.string,
     file: PropTypes.string.isRequired,
     isLiked: PropTypes.bool.isRequired,
     likesNumber: PropTypes.number.isRequired,
     commentNumber: PropTypes.number.isRequired,
}
export default Photo;