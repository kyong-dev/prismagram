import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [isLikedState, setIsLikedState] = useState(isLiked);
    const [likeCountState, setLikeCountState] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
            setTimeout(() => setCurrentItem(0), 2500);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 2500);
        }
    }

    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = async () => {
        if (isLikedState === true) {
            setIsLikedState(false);
            setLikeCountState(likeCountState - 1);
        } else {
            setIsLikedState(true);
            setLikeCountState(likeCountState + 1);
        }

        try {
            await toggleLikeMutation()
        } catch {
            toast.error("Can't register like");
            setIsLikedState(isLikedState);
            setLikeCountState(likeCountState);
        }
    }

    const onKeyDown = async (e) => {
        const { keyCode } = e;
        if (keyCode === 13) {
            e.preventDefault();
            try {
                const { data: { addComment } } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
            } catch {
                toast.error("Can't send the comment")
            }
        }
        return;
    };

    const nextLine = e => {
        const { keyCode } = e;
        if (keyCode === 16) {
            e.preventDefault();
            comment.setValue(comment.value + "\n");
        }
        return;
    }

    return <PostPresenter
        user={user}
        files={files}
        comments={comments}
        createdAt={createdAt}
        caption={caption}
        location={location}
        likeCount={likeCountState}
        isLiked={isLikedState}
        setLikeCount={setLikeCountState}
        setIsLiked={setIsLikedState}
        newComment={comment}
        currentItem={currentItem}
        toggleLike={toggleLike}
        onKeyDown={onKeyDown}
        nextLine={nextLine}
        selfComments={selfComments}
    />
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
}

export default PostContainer;