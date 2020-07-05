import React from "react";
import Button from "../Button";

export default ({ isFollowing, onClick, isFollower }) => (
    <>
        {isFollower ?
            <Button text={isFollowing ? "Unfollow" : "Follow Back"} onClick={onClick} />
            :
            <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
            }
    </>
);