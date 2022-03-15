require('dotenv').config()
const app = require('./api/server')

app.listen(process.env.PORT || 8080, () => console.log(`Notion Integration Server running...`));