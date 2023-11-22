import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const resp = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&cuisine=${name}&number=9`)
        const data = await resp.json();
        
        return data.results;
    };

    useEffect(() => {
        let isMounted = true;
        getCuisine(params.type).then((data) => {
          if (isMounted) setCuisine(data);
        });
        return () => {
          isMounted = false;
        };
    }, [params.type])


    return (
        <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
            {cuisine.map(({id,title,image}) => (
                    <Card key={id}>
                        <Link to={`/recipe/${id}`}>
                        <img src={image} alt={title} />
                        <h4>{title}</h4>
                        </Link>
                    </Card>
                )
            )}
        </Grid>
    )
}

const Grid = styled(motion.div)`
display: grid; 
grid-template-columns: 1fr 1fr 1fr; 
grid-template-rows: 1fr 1fr 1fr; 
gap: 3rem;
    
`;

const Card = styled.div`
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
    }
`;

export default Cuisine
