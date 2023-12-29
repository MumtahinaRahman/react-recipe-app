import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    const params = useParams();

    const getCuisine = async (name) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`);
        const recipes = await data.json();
        setCuisine(recipes.results);
    }

    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    },[params.type]);

  return (
    <Grid animate={{opacity:1}} initial={{opacity:0}} exit={{opacity: 0}} transition={{duration: 0.8}}>
        {cuisine.map((item) => {
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

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 2rem;
`;

const Card = styled(motion.div)`
text-decoration: none;
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration: none;
    }

    h4{
        text-align: center;
        padding: 1rem;
        text-decoration: none;
    }
`;


export default Cuisine