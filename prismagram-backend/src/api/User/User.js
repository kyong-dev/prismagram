import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts({ orderBy: "createdAt_DESC" }),
        followings: ({ id }) => prisma.user({ id }).followings(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        { id: user.id },
                        { followings_some: { id: parentId } }
                    ]
                });
            } catch (error) {
                console.log(error);
                return false
            }
        },
        isFollower: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        { id: user.id },
                        { followers_some: { id: parentId } }
                    ]
                });
            } catch {
                return false
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
        followerCount: ({ id }) =>
            prisma.usersConnection({
                where:
                    { followings_some: { id } }
            })
                .aggregate()
                .count(),
        followingCount: ({ id }) =>
            prisma.usersConnection({
                where:
                    { followers_some: { id } }
            })
                .aggregate()
                .count(),
        postCount: ({ id }) =>
            prisma.postsConnection({
                where:
                    { user: { id } }
            })
                .aggregate()
                .count(),
    }
}