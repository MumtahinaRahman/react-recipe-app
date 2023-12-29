import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const params = useParams();

    const getSearched = async (name) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <Grid>
        {searchedRecipes.map((item) => {
            return(
                <Link to={'/recipe/'+item.id}>
                <Card key={item.id}> 
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Card>
                </Link>
            )
        })}
    </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration: none;
    }

    h5{
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched