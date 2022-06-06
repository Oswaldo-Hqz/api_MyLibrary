import Roles from "../models/roles";

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