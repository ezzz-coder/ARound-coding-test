import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Container, Grid, Typography, IconButton} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  //implement the delete function
  const handleDelete = async (id) => {
    console.log("delete");
    try{
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h1" sx={{textAlign: 'center', margin: 2}}>Simple Card List</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
            <Card sx={{margin:1}}>
              <IconButton color="error" onClick={()=> handleDelete(product.id)} style={{position: 'absolute'}}><DeleteIcon /></IconButton>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h5" sx={{mb: 1, fontWeight:'bold'}}>{product.name}</Typography>
                <Typography variant="subtitle1">${product.price}</Typography>
                <Typography variant="body1" sx={{fontWeight:'light'}}>{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;