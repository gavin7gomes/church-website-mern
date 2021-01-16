const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(
  express.json({
    extended: false,
  })
);

app.use(cors())

app.get('/', (req, res) => res.send('API running'));


//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/upcoming-activities', require('./routes/api/upcomingActivities'));
app.use('/api/upload', require('./routes/api/uploadRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));