import Users from '../models/user';
import Roles from "../models/roles";
import jwt from "jsonwebtoken";
import config from '../config'

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const newUser = new Users({
        firstName,
        lastName,
        email,
        password: await Users.encryptPassword(password),
        });

        if (req.body.role) {
            const foundRole = await Roles.find({ name: { $in: role } });
            newUser.role = foundRole.map((xRole) => xRole._id);
        } else {
            const role = await Role.findOne({ name: "Student" });
            newUser.role = [role._id];
        }

        const savedUser = await newUser.save();

        // Create a token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const logIn = async (req, res) => {
    try {

        const userFound = await Users.findOne({ email: req.body.email }).populate("role");

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await Users.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword){
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.json({ token });
    } catch (error) {
        console.log(error);
    }
};