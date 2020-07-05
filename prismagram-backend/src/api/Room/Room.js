import { prisma } from "../../../generated/prisma-client";

export default {
    Room: {
        participants: ({ id }) => prisma.room({ id }).participants(),
        messages: ({ id }) => prisma.room({ id }).messages(),
        opponent: async (parent, __, { request }) => {
            const { user } = request;
            let opponent = null;
            const { id } = parent;
            const participants =  await prisma.room({ id }).participants()

            participants.map(p => p.id !== user.id ? opponent = p : null);
            return opponent

        }
    }
};