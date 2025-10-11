 	const express = require('express');
 	const cors = require('cors'); 
 	const app = express();
 	const PORT = 3001;
  	const bookRoutes = require('./routes/books.js');
	const path = require('path');

	const bookRoutes = require(path.join(__dirname, 'routes', 'books.js'));
 	
 	// Middleware
 	app.use(cors()); 
 	app.use(express.json()); 
 	app.use((req, res, next) => {
 	  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
 	  next();
 	});

  	app.use('/api/books', bookRoutes);
 	
 	app.get('/', (req, res) => {
 	  res.send('Home Page for API');
 	});
 	
 	app.listen(PORT, () => {
 	  console.log(`Express server running at http://localhost:${PORT}/`);
 	});

