import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, PersonEmpty } from "./Icons";
import { ME } from "../SharedQueires";

const Header = styled.header`
    width: 100%;
    border: 0;
    background-color: white;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 5px;
    z-index: 2;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
    vertical-align: middle;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 30px;
    }
`;

const Image = styled.img`
`;

export default withRouter(({ history }) => {
    const search = useInput("");
    const { loading, data } = useQuery(ME);
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    }
    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Image
                            src={require('../assets/logo.png')}
                            width="95"
                            alt="Logo Image" />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput
                            value={search.value}
                            onChange={search.onChange}
                            placeholder="Search" />
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                    </HeaderLink>
                    {loading &&
                        <HeaderLink to="/#">
                            <PersonEmpty />
                        </HeaderLink>}
                    {data &&
                        <HeaderLink to={`/p/${data.me.username}`}>
                            <PersonEmpty />
                        </HeaderLink>}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});