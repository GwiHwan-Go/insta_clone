import client from "../../client";

export default {
    Query: {
        searchPhotos: (_, {keyword, cursor}) => client.photo.findMany({
            take: 5,
            skip: cursor ? 1 : 0,
            ...(cursor && {cursor: {id : cursor}})  ,  
            where: {
                caption: {
                    startsWith: keyword,
                }
            }
        })
    }
}