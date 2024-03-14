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
  if (!catalog)
    res.status(404).json({
      message: "Catalog not found",
    });
  res.status(200).send(catalog);
});

// get subCatalog by id
app.get("/subCatalogs/:id", async (req, res) => {
  const subCatalogs = await prisma.subCatalog.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!subCatalogs) res.status(404).send("subProduct not found");
  res.status(200).send(subCatalogs);
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
