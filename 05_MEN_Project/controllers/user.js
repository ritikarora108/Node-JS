import User from "../models/user.js"

async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await User.find({});
        return res.status(200).json(allDbUsers);
    } catch (error) {
        console.log(`Error: ${error}`)
        return res.status(500).json({msg: error})
    }
}

async function handleGetUserById(req, res) {
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
}

async function handleUpdateUserById(req, res) {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({status:"User details updated successfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ msg: "User deleted successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: error})
    }
}

async function handleCreateNewUser(req, res) {
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


        return res.status(201).json({ id: result.id, msg: "User succesfully created!" });
    } catch (error) {
        console.log(`Mongo Error: ${error}`)
        return res.status(400).json({msg: "Email-id already exist"})
    }
}

export default { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser };