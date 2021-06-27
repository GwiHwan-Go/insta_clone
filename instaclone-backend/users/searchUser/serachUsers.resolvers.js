import client from "../../client"

export default{
    Query: {
        searchUsers: async (_, {keyword, cursor}) => {
            const users = await client.user.findMany({
                take: 5,
                skip: cursor ? 1 : 0,
                ...(cursor && {cursor: {id: cursor}}),
                where: {
                username: {
                    startsWith: keyword.toLowerCase(),
                },
            }
            });
            return users
        }
    }
}