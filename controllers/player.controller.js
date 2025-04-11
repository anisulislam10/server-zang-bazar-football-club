import Player from "../models/player.model.js";

// 📌 Create a new player
export const createPlayer = async (req, res) => {
    try {
        const { playerName } = req.body;
        const playerImage = req.file ? req.file.filename : null;

        // Validate required fields
        // if (!playerName || !playerImage) {
        //     return res.status(400).json({ statusCode: 400, message: "Both playerName and playerImage are required" });
        // }

        const existingPlayer = await Player.findOne({ 
            $or: [{ playerName }, { playerImage }]
        });

        if (existingPlayer) {
            return res.status(409).json({ 
                statusCode: 409,
                 message: "Player with this name or image already exists"
                 });
        }

        // Create new player
        const newPlayer = await Player.create({ playerName, playerImage });
        res.status(201).json({ 
            statusCode: 201,
             message: "Player created successfully", 
             player: newPlayer 
            });

    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
             message: "Internal Server Error", 
             error: error.message 
            });
    }
};

// 📌 Get all players
export const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json({ 
            statusCode: 200, 
            players
         });
    } catch (error) {
        res.status(500).json({
             statusCode: 500, 
             message: "Internal Server Error", 
             error: error.message 
            });
    }
};

// 📌 Get player by ID
export const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ 
                statusCode: 404, 
                message: "Player not found" 
            });
        }
        res.status(200).json({ statusCode: 200, player });
    } catch (error) {
        res.status(500).json({
             statusCode: 500,
              message: "Internal Server Error", 
              error: error.message 
            });
    }
};

// 📌 Update player
export const updatePlayer = async (req, res) => {
    try {
        const { playerName } = req.body;
        const playerImage = req.file ? req.file.filename : undefined;

        // Find existing player
        let player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ 
                statusCode: 404,
                 message: "Player not found" 
                });
        }

        // Check if new name or image already exists
        if (playerName || playerImage) {
            const duplicateCheck = await Player.findOne({ 
                $or: [{ playerName }, { playerImage }],
                _id: { $ne: req.params.id } 
            });

            if (duplicateCheck) {
                return res.status(409).json({ 
                    statusCode: 409, 
                    message: "Another player with this name or image already exists" 
                });
            }
        }

        // Update player
        player = await Player.findByIdAndUpdate(
            req.params.id,
            { playerName, ...(playerImage && { playerImage }) },
            { new: true }
        );

        res.status(200).json({ 
            statusCode: 200, 
            message: "Player updated successfully", 
            player
         });

    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Delete player
export const deletePlayer = async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ 
                statusCode: 404,
                 message: "Player not found" 
                });
        }
        res.status(200).json({ 
            statusCode: 200,
             message: "Player deleted successfully"
             });
    } catch (error) {
        res.status(500).json({ statusCode: 500,
             message: "Internal Server Error",
              error: error.message 
            });
    }
};

// 📌 Get total count of players
export const countPlayers = async (req, res) => {
    try {
        const totalPlayers = await Player.countDocuments();
        res.status(200).json({
             statusCode: 200, 
             totalPlayers
             });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};
