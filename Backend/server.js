const app = require('./src/app')
const connectdb = require('./src/db/db')

async function start() {
  await connectdb()
  app.listen(3000, () => {
    console.log('Server is listening in 3000')
  })
}

start()
