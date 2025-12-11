const app = require('./myApp.js');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Render server running on port ${port}`);
});
