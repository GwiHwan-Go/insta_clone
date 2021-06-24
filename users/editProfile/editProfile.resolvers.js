import client from "../../client";

export default {
    Mutation: {
        editProfile: (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            client.user.update({
                where: {
                    id: 1,
                },
            })
        }
    }
}//4:39