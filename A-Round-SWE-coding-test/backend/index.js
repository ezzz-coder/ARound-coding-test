const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({origin: "*", methods: ["GET", "DELETE"]}));


//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//implement the get api for getting products
app.get('/api/products', (req, res) => {
    const productsWithImg = products.map((product)=> ({...product, imageUrl: product.imageUrl || fetchImageUrl()}))
    res.json(productsWithImg);
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter(product => product.id !== productId);
    res.status(200).json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
