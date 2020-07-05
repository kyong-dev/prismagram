import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        updateNotificationToken: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { notificationToken } = args;
            const { user } = request;
            return prisma.updateUser({
                where: { id: user.id },
                data: { notificationToken }
            });
        }
    }
};
