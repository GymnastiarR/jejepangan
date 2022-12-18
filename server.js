import app from './index.js'

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running now . . .");
})