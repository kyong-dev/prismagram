import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, isFollower, id, updateFollowerCount }) => {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing);
    const [followMutation] = useMutation(FOLLOW, { variables: { id } });
    const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

    const onClick = () => {
        if (isFollowingState === true) {
            try {
                unfollowMutation();
                if (updateFollowerCount) {
                    updateFollowerCount("unfollow");
                }
            } catch {
                throw Error("Can't unfollow the user");
            }
            setIsFollowingState(false);
        } else {
            setIsFollowingState(true);
            try {
                followMutation();
                if (updateFollowerCount) {
                    updateFollowerCount("follow");
                }
            } catch {
                throw Error("Can't follow the user");
            }
        }
    }

    return <FollowButtonPresenter
        onClick={onClick}
        isFollowing={isFollowingState}
        isFollower={isFollower}
    />;
}

FollowButtonContainer.prototype = {
    isFollower: PropTypes.bool.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    updateFollowerCount: PropTypes.func
}

export default FollowButtonContainer;