require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { prisma } = require("./config/prisma");
const app = express();
const PORT = process.env.PORT || 3000;

// Callback <> biar Req App express kepake
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create response for success route
app.get("/", async (req, res) => {
  res.send("Routes success");
});

// catalog

// get all catalog routes
app.get("/catalogs", async (req, res) => {
  const catalog = await prisma.catalog.findMany();
  res.status(200).send(catalog);
});

// get catalog by id
app.get("/catalogs/:id", async (req, res) => {
  const catalogs = await prisma.catalog.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!catalogs) res.status(404).send("Catalog not found");
  res.status(200).send(catalogs);
});

// get product by id
app.get("/products/:id", async (req, res) => {
  const products = await prisma.product.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!products) res.status(404).send("Product not found");
  res.status(200).send(products);
});

app.all("*", async (req, res) => {
  res.json({
    message: "Routes you're looking is not found",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is already running at ${PORT}`);
});
