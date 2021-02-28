const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.get('/test', (req, res) => {
   res.send('It works');
});