import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import { Link } from 'react-router-dom';

// import { json } from 'react-router-dom';

function Popular() {

    const [popular, setPopular] = useState([]);

    // execute function once the popular compnent gets mounted
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem('popular');
        if(check){
            setPopular(JSON.parse(check));
        }
        else{
            const apiKey = process.env.REACT_APP_API_KEY;
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`);
            const data = await api.json();
            console.log(data);
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        } 
    }
    return (
        <div>
            <Wrapper>
                <h1>Popular picks</h1>
                <Splide options={{perPage:4, arrows:false, pagination:false, drag:'free', gap:'2rem'}}>
                    {popular.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                <Link to={'/recipe/'+recipe.id}>
                                <Card key={recipe.id}>
                                   
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                    
                                    <Gradient />
                                </Card>
                                </Link>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
margin: 2rem 0rem;
`;

const Card = styled.div`
min-height : 15rem;
border-radius : 1rem;
overflow : hidden;
position : relative;

img{
    border-radius : 1rem;
    position : absolute;
    left : 0;
    width : 100%;
    height : 100%;
    object-fit : cover;
}

p{
    position : absolute;
    z-index : 10;
    left : 0%;
    bottom : 0%;
    transform : tranlate(-50%, 0%);
    color : white;
    width : 100%;
    text-align : center;
    font-weight : 200;
    font-size : 0.8rem;
    height : 15%;
    display : flex;
    justify-content : center;
    align-item : center;
}
`;

const Gradient = styled.div`
z-index:9;
position:absolute;
width:100%;
height: 100%;
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8));
`;

export default Popular