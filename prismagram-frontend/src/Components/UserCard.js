import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton";

const Card = styled.div`
    ${props => props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const EAvater = styled(Avatar)`
    margin-bottom: 15px;
`;

const ELink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

const UserCard = ({ id, username, url, isSelf, isFollowing, isFollower }) => (
    <Card>
        <ELink to={`/p/${username}`}>
            <EAvater url={url} size={"md"} />
        </ELink>
        <ELink to={`/p/${username}`}>
            <FatText text={username} />
        </ELink>
        {!isSelf && <FollowButton id={id} isFollowing={isFollowing} isFollower={isFollower} />}

    </Card>
);

UserCard.prototype = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isFollower: PropTypes.bool.isRequired
}

export default UserCard;
