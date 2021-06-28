export const processHashtags = (caption) => {
    ///parse caption
    // get or create Hashtags
    const hashtags = caption.match(/#[\w]+/g) || []; //regular expression
    return hashtags.map((hashtag)=>({
        where: {hashtag},
        create: {hashtag},
    }))};