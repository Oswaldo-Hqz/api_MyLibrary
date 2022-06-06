import Users from "../models/user";
import Roles from "../models/roles";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

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

    return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
    });

  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
    const users = await Users.find();
    return res.json(users);
};

export const getUserById = async (req, res) => {
    const { userId } = req.params;
    
    const user = await Users.findById(userId);
    res.status(200).json(user);  
};

export const getUserByEmail = async (req, res) => {
    const { Email } = req.body;
    
    const user = await Users.find({ email: { $in: Email } });
    res.status(200).json(user);  
};