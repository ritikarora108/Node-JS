import express from "express"
import dotenv from "dotenv"
import { createRequire } from "module"

dotenv.config();

const require = createRequire(import.meta.url)
const users = require("./users.json")



const app = express();
// console.log(users);

app.get('/', (req, res) => {
    res.end('Home Page');
})

app.get('/users', (req, res) => {
    const html =
        `<ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>`
    return res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
})

// Dynamic path params /:id

app.route('/api/users/:id').
    get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    }).patch((req, res) => {
        // Update users with id
        return res.send({ status: pending });
    }).delete((req, res) => {
        // Delete users with id
        return res.send({ status: pending });
    });

app.post('/api/users', (req, res) => {
    // Create a user in db with the available form data
    return res.send({status:pending})
})

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))


