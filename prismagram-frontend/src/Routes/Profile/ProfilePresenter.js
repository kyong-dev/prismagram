import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import { Helmet } from "rl-react-helmet";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";


const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  margin-right: 10px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
  margin-top: 100px;
`;

const ProfilePresenter = ({ loading, data, logout, followerCountState, initFollowerCount, updateFollowerCount }) => {
    
    useEffect(()=>{
        initFollowerCount();
    }, [loading])

    if (loading === true) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.seeUser) {
        const { seeUser: {
            id,
            avatar,
            username,
            fullName,
            isFollowing,
            isFollower,
            isSelf,
            bio,
            postCount,
            followerCount,
            followingCount,
            posts
        } } = data;

        return (
            <>
                <Wrapper>
                    <Helmet>
                        <title>{username} | Prismagram</title>
                    </Helmet>
                    <Header>
                        <HeaderColumn>
                            <Avatar size="lg" url={avatar} />
                        </HeaderColumn>
                        <HeaderColumn>
                            <UsernameRow>
                                <Username>{username}</Username>{" "}
                                {isSelf ? <Button onClick={logout} text="Log Out" /> : <FollowButton isFollowing={isFollowing} isFollower={isFollower} id={id} updateFollowerCount={updateFollowerCount} />}
                            </UsernameRow>
                            <Counts>
                                <Count>
                                    <FatText text={String(postCount)} /> posts
                                </Count>
                                <Count>
                                    <FatText text={String(followerCountState)} /> followers
                                </Count>
                                <Count>
                                    <FatText text={String(followingCount)} /> following
                                </Count>
                            </Counts>
                            <FullName text={fullName} />
                            <Bio>{bio}</Bio>
                        </HeaderColumn>
                    </Header>
                    <Posts>
                        {posts &&
                            posts.map(post => (
                                <SquarePost
                                    key={post.id}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                    file={post.files[0]}
                                />
                            ))}
                    </Posts>
                </Wrapper>
            </>
        );
    }
};

ProfilePresenter.prototype = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    initFollowerCount: PropTypes.func,
    updateFollowerCount: PropTypes.func
}

export default ProfilePresenter;