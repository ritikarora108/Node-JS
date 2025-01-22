import express from "express"
import dotenv from "dotenv"
import { createRequire } from "module"
import fs from "fs"

dotenv.config();

const require = createRequire(import.meta.url)
const users = require("./users.json")


const app = express();
// middleware - plugin
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
    const date = new Date();
    const data = `${date.getHours()}: ${date.getMinutes()}:${date.getSeconds()} - ${req.method} : ${req.path}\n`
    fs.appendFile('./log.txt', data, (err, res) => {
        if (err) console.log(`Error: ${err}`);
    })
    next()
})

let prefix_id = Number(process.env.PREFIX_ID);

function updateUsersData(users) {
    fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
        if (err) console.log(`Error: ${err}`);
    })
}

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
        return res.json(user??{status: "User not found"});
    }).patch((req, res) => {
        // Update users with id
        const id = Number(req.params.id);
        const body = req.body;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex===-1) {
            return res.json({ status: "User does not exist" });
        }
        let idFieldExist = false;
        for (const property in body) {
            if (property === 'id') {
                idFieldExist = true;
                continue;
            }
            users[userIndex][property] = body[property];
        }
        updateUsersData(users);
        let msg = "Users details updated successfully";
        if (idFieldExist) {
            if (Object.keys(body).length === 1) {
                msg="id can't be updated"
            } else {
                msg="id can't be updated, but other user details have been updated!"
            }
        }
        return res.json({...users[userIndex], status: msg });
    }).delete((req, res) => {
        // Delete users with id
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);

        users.splice(userIndex, 1);
        updateUsersData(users)
        return res.json({ status: "User deleted successfully" });
    });

app.post('/api/users', (req, res) => {
    // Create a user in db with the available form data
    const body = req.body;
    users.push({ id: prefix_id + 1, ...body });
    prefix_id++;
    process.env.PREFIX_ID = prefix_id;
    
    updateUsersData(users);
    return res.json({ id:prefix_id, ...body , status: "User added successfully" });
})

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))


