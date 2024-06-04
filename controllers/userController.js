import UserModel from '../models/userModel.js';
import LinkModel from '../models/linkModel.js';
const UserController = {

    getLinkClicksByTarget: async (req, res) => {
        const { userId, linkId } = req.params;

        try {
            const user = await UserModel.findById(userId).populate('links');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const link = await LinkModel.findById(linkId);
            if (!link) {
                return res.status(404).json({ message: "Link not found" });
            }

            // פילוח הקליקים לפי targetParamValue
            const clicksByTarget = link.clicks.reduce((acc, click) => {
                const targetValue = link.targetValues.find(target => target.value === click.targetParamValue)?.name || "unknown";
                if (!acc[targetValue]) {
                    acc[targetValue] = 0;
                }
                acc[targetValue]++;
                return acc;
            }, {});

            res.status(200).json(clicksByTarget);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    getList: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    getById: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const newUser = await UserModel.create({ name, email, password });
            res.status(201).json(newUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(deletedUser);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default UserController;
