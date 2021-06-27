import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async(_,{file, caption},{loggedInUser})=>{
            let hashtagObjs=[];
            if (caption) {
                ///parse caption
                // get or create Hashtags
                const hashtags = caption.match(/#[\w]+/g); //regular expression
                hashtagObjs = hashtags.map((hashtag)=>({
                    where: {hashtag},
                    create: {hashtag},
                }))};
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user : {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        ...(hashtagObjs.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObjs,
                            }
                        })
                }})
                            
                        })
                    
                }
            }
            
            //save the photo with the parsed hasgtags
            // add the photo to the hashtags
