import LinkModel from '../models/linkModel.js'; // ייבוא מודל LinkModel

const LinkController = {
    redirectToOriginalUrl: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);

            if (!link) {
                res.status(404).json({ message: "Link not found" });
                return;
            }

            let targetParamValue = "";
            console.log("link.targetParamName: ", link.targetParamName);
            console.log("req.query: ", req.query);
            if (req.query && req.query[link.targetParamName]) {
                targetParamValue = req.query[link.targetParamName];
            }
            console.log("targetParamValue: ", targetParamValue);

            link.clicks.push({ ipAddress: req.ip, targetParamValue });
            await link.save();

            res.redirect(link.originalUrl);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    getClicksByTarget: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);

            if (!link) {
                res.status(404).json({ message: "Link not found" });
                return;
            }

            // פילוח הקליקים לפי targetParamValue
            const clicksByTarget = link.clicks.reduce((acc, click) => {
                const targetValue = click.targetParamValue || "unknown";
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
            const links = await LinkModel.find();
            res.status(200).json(links);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    getById: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);

            if (!link) {
                res.status(404).json({ message: "Link not found" });
                return;
            }

            res.status(200).json(link);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        const { originalUrl } = req.body;
        try {
            const newLink = await LinkModel.create({ originalUrl });
            res.json(newLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, { new: true });
            res.json(updatedLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await LinkModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
}

export default LinkController;
