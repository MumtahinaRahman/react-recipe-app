import React from 'react'
import { PiHamburgerLight } from "react-icons/pi";
import { CiBowlNoodles } from "react-icons/ci";
import { GiSushis } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <List>
        <SLink to={'/cuisine/american'}>
            <PiHamburgerLight />
            <h5>American</h5>
        </SLink>
        <SLink to={'/cuisine/italian'}>
            <CiPizza />
            <h5>Italian</h5>
        </SLink>
        <SLink to={'/cuisine/japanese'}>
            <GiSushis />
            <h5>Japanese</h5>
        </SLink>
        <SLink to={'/cuisine/thai'}>
            <CiBowlNoodles />
            <h5>Thai</h5>
        </SLink>
    </List>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0rem 1rem;
    text-decoration: none;

    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h5{
        color: white;
        font-size: 0.8rem;
    }

    svg{
        color: white;
        font-size: 2rem;
    }

    &.active{
        background: linear-gradient(to bottom, #f27121, #e94057);

        h5{
            color: white;
        }
    
        svg{
            color: white;
        }
    }
`;

export default Category