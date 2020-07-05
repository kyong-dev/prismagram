import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HeartFull, BubbleFull } from "./Icons";

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        fill: white;
    }
    opacity: 0;
    transition: opacity 0.3s linear;
`;

const Container = styled.div`
    background-image: url(${props => props.bg});
    background-size: cover;
    margin: 2px;
    cursor: pointer;
    &:hover {
        ${Overlay} {
            opacity: 0.8;
        }
    }
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &:first-child {
        margin-right: 30px;
    }
`;

const NumberText = styled.span`
    margin-left: 10px;
    font-size: 16px;
`;

const SquarePost = ({ id, likeCount, commentCount, file }) => (
    <Container bg={file.url}>
        <Link to={`/p/${id}`}>
            <Overlay>
                <Number>
                    <HeartFull />
                    <NumberText>{likeCount}</NumberText>
                </Number>
                <Number>
                    <BubbleFull />
                    <NumberText>{commentCount}</NumberText>
                </Number>
            </Overlay>
        </Link>
    </Container>
);

SquarePost.prototype = {
    id: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    file: PropTypes.object.isRequired,
};

export default SquarePost;