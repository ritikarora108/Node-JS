
import express from "express"
import userControllers from "../controllers/user.js"
const router = express.Router();

const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = userControllers;

// router.get('/', async (req, res) => {
//     try {
//         const allDbUsers = await User.find({});
//         const data = `
//         <ul>
//             ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//         </ul>
//         `

//         return res.status(200).send(data);
//     } catch (error) {
//         console.log(`Error: ${error}`)
//         return res.status(404).json({ msg: error });
//     }
// })

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


export default router;