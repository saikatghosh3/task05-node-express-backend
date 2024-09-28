const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { regions } = require("./configs/regions");
const { swaggerSpec, swaggerUi } = require("./configs/swagger");
const path = require ("path");

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use(
  "/api-docs/swagger-ui.css",
  express.static(
    path.join(__dirname, "node_modules/swagger-ui-dist/swagger-ui.css")
  )
);
app.use(
  "/api-docs/index.css",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist/index.css"))
);
app.use(
  "/api-docs/swagger-ui-bundle.js",
  express.static(
    path.join(__dirname, "node_modules/swagger-ui-dist/swagger-ui-bundle.js")
  )
);
app.use(
  "/api-docs/swagger-ui-standalone-preset.js",
  express.static(
    path.join(
      __dirname,
      "node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js"
    )
  )
);
app.use(
  "/api-docs/swagger-ui-standalone-preset.js",
  express.static(
    path.join(
      __dirname,
      "node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js"
    )
  )
);
app.use(
  "/api-docs/favicon-32x32.png",
  express.static(
    path.join(__dirname, "node_modules/swagger-ui-dist/favicon-32x32.png")
  )
);
app.use(
  "/api-docs/favicon-16x16.png",
  express.static(
    path.join(__dirname, "node_modules/swagger-ui-dist/favicon-16x16.png")
  )
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/users", userRoutes);

app.get("/api/regions-locales", (req, res) => {
  try {
    const supportedRegions = Object.keys(regions);
    return res.json({
      regions: supportedRegions,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: e?.message || "Something went wrong" });
  }
});

app.get("/", (_, res) => res.json({ status: 200, message: "server running" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
