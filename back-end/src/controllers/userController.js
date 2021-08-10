const { User } = require("../models/user");

module.exports = {
    async listUserAsync(req, res, next) {
        try {
            const users = await User.find({});
            res.send(users);
        } catch (err) {
            res.send({
                error: err.message,
                message: "Could not load all the users",
            });
        }
    },
    async getUserAsync(req, res, next) {
        const { username, name, surname } = req.body;
        const userId = req.params.id;

        const query = {
            $or: [{ _id: userId }, username, name, surname],
        };
        User.find(query, (err, foundUsers) => {
            if (err) {
                res.send({
                    error: err.message,
                    message: "Error fetching users",
                });
            }
            if (foundUsers) {
                res.status(200).send(foundUsers);
            } else {
                res.send({ error: "no products found" });
            }
        }).sort({ createdAt: -1 });
    },

    async editUserAsync(req, res, next) {
        const userId = req.params.id;
        const itemsToEdit = Object.keys(req.body);

        try {
            const user = await User.findById(userId);
            itemsToEdit.forEach((prop) => {
                user[prop] = req.body[prop];
            });

            await updateUser.save();
            res.send({ message: "Successfully updated user" });
        } catch (error) {
            res.send({
                error: error.message,
                message: "Failed to update user",
            });
        }
    },
};
