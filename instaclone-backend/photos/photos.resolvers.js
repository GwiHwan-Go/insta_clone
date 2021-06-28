import client from "../client"

export default{
    Photo: {
        user: ({userId}) => {
            return client.user.findUnique({
                where: {id: userId}
            })
        },
        hashtags : ({id}) => client.hashtag.findMany({
            where: {
                photos: {
                    some: {
                        id,
                    }
                }
            }
        }),
        likesNumber : ({id}) => client.like.count({
            where : {photoId : id}
        }),
        comments : ({id}) => client.comment.count({
            where : {photoId: id}
        }),
        isMine : ({userId},_,{loggedInUser}) => (loggedInUser? userId === loggedInUser.id : false)
    },
    Hashtag: {
        photos: ({id}, {page}) => {
            return client.hashtag.findUnique({
                where: {
                    id,
                }
            })
            .photos();},
        totalPhotos : ({id}) => client.photo.count({
            where: { 
                hashtags : {
                    some :
                    { id}

            }},
        })
    }}

