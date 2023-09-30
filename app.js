

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const userRoutes = require('./routes/user');
const sequelize = require('./config/database');
const tasksRoutes = require('./routes/tasks');
const collaborationsRoutes = require('./routes/collaborations');
const categoriesRoutes = require('./routes/categories'); 
const searchRoutes = require('./routes/search'); 
const notificationsRoutes = require('./routes/notifications'); 
const authRoutes = require('./routes/auth');

app.use('/notifications', notificationsRoutes);

app.use('/search', searchRoutes);  

app.use('/categories', categoriesRoutes);
app.use('/tags', tagsRoutes);
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });



app.use(bodyParser.json()); 
app.use(cors()); 


app.use('/auth', authRoutes);   
app.use('/tasks', tasksRoutes);
app.use('/user', userRoutes);
app.use('/collaborations', collaborationsRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});