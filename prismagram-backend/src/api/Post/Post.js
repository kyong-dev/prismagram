import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        user: parent => prisma.post({ id: parent.id }).user(),
        comments: parent => prisma.post({ id: parent.id }).comments(),
        files: parent => prisma.post({ id: parent.id }).files(),
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: parentId
                        }
                    }
                ]
            });
        },
        likeCount: parent =>
            prisma
                .likesConnection({
                    where:
                        { post: { id: parent.id } }
                })
                .aggregate()
                .count(),
        commentCount: parent =>
            prisma
                .commentsConnection({
                    where:
                        { post: { id: parent.id } }
                })
                .aggregate()
                .count()
    }
};