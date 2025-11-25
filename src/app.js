import express from "express";
import ProductManager from "./productManager.js";

const app = express();

app.use(express.json());

const productManager = new ProductManager("./src/products.json");

//endpoints
app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

app.get("/api/products", async(req, res) => {
    try{
    const products = await productManager.getProducts();

    res.status(200).json({message: "List of products actualized", products: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




app.delete("/api/products/:pid", async(req, res) => {
    try{
    const pid = req.params.pid;
    const products = await productManager.deleteProductById(pid);

    res.status(200).json({message: "Product deleted", products: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post("/api/products", async(req, res) => {
    try{
    const newProduct = req.body;
    const products = await productManager.addProduct(newProduct);

    res.status(201).json({message: "Product added", products: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}) 

app.put("/api/products/:pid", async(req, res) => {
    try{
    const pid = req.params.pid;
    const updates = req.body;
    const products = await productManager.setProductById(pid, updates);

    res.status(200).json({message: "Product updated", products: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



app.listen(8080, () => {
    console.log("Server running on port 8080");
});