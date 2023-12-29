import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


function Recipe() {
  let params = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;

  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('Ingredients');

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
    const detailedData = await data.json();
    setDetails(detailedData);
    console.log(detailedData);
  }

  useEffect(() => {
    fetchDetails();
  },[params.name]);
  
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'Ingredients' ? 'active' : ''} onClick={() => setActiveTab('Ingredients')}>Ingredients</Button>
        <Button className={activeTab === 'Instructions' ? 'active' : ''} onClick={() => setActiveTab('Instructions')}>Instructions</Button>
        {activeTab === "Instructions" && (
          <div>
            {/* <h5 dangerouslySetInnerHTML={{__html: details.summary}}></h5> */}
            <h5 dangerouslySetInnerHTML={{__html: details.instructions}}></h5>
          </div>
        )}

        {activeTab === "Ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredients) => {
              return(<li key={ingredients.id}>{ingredients.original}</li>)
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}



const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2{
    margin-bottom: 2rem;
  }

  h5{
    margin-top: 2rem;
  }
   
  li{
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  ul{
    margin-top: 2rem;
  }

  img{
    max-height: 20rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid #313131;
  margin-right: 2rem;
`;

const Info = styled.div`
  margin-left: 2rem;
`;

export default Recipe