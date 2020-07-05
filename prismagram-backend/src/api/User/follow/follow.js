import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        follow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;
            try {
                console.log(id);
                console.log(user);
                await prisma.updateUser({
                    where: { id: user.id }, 
                    data: {
                        followings: {
                            connect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch {
                return false;
            }
        }
    }
}