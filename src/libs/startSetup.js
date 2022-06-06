import Roles from "../models/roles";
import Users from '../models/user'
import bcrypt from "bcryptjs";

export const createRoles = async () => {
    try {
        // Count Documents
        const count = await Roles.estimatedDocumentCount();

        // check for existing roles
        if (count > 0) return;

        // Create default Roles
        const values = await Promise.all([
            new Roles({ name: "admin" }).save(),
            new Roles({ name: "Librarian" }).save(),
            new Roles({ name: "Student" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdmin = async () => {
    const user = await Users.findOne({ email: "admin@admin.com" });
    const roles = await Roles.find({ name: { $in: ["admin"] } });
  
    if (!user) {
      await Users.create({
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("admin123$", 10),
        roles: roles.map((role) => role._id),
      });
      console.log('Admin User Created!')
    }
};