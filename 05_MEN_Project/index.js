import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Db connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
    .then(() => console.log(`Mongo-Db connection established successfully`))
    .catch((err) => console.log(`Mongo Error: ${err}`));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    }, 
    gender: {
        type:String,
    },
    jobTitle: {
        type:String,
    }
}, {timestamps: true})

// Model
const User = mongoose.model("user", userSchema);

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    return res.end('Home Page')
})

app.get('/users', async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const data = `
        <ul>
            ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>
        `

        return res.status(200).send(data);
    } catch (error) {
        console.log(`Error: ${error}`)
        return res.status(404).json({ msg: error });
    }
})

app.get('/api/users', async (req, res) => {

    try {
        const allDbUsers = await User.find({});
        return res.status(200).json(allDbUsers);
    } catch (error) {
        console.log(`Error: ${error}`)
        return res.status(500).json({msg: error})
    }
    
})

app.route('/api/users/:id')
    .get(async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            // console.log(user);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json({msg: "User not found"})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error });
        }
    })
    .patch(async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({status:"User details updated successfully"})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: error });
        }
    })
    .delete(async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({ msg: "User deleted successfully!" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({msg: error})
        }
    });

app.post('/api/users',async (req, res) => {
    const body = req.body;
    if (!body || !body.firstName || !body.email) {
        return res.status(400).json({ msg: "firstName and email are the required fields" });
    }
    try {
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        });

        console.log(`Result: ${result}`);

        return res.status(201).json({ msg: "User succesfully created!" });
    } catch (error) {
        console.log(`Mongo Error: ${error}`)
        return res.status(400).json({msg: "Email-id already exist"})
    }

    

});

const port = process.env.PORT || 8001;

app.listen(port,()=> console.log(`Server started on port: ${port}`))

