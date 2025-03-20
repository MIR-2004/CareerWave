import 'dotenv/config'



const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`)
})