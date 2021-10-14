const ErrorHandeler = require("../../utils/errorHandeler");
const catchAssyncErrors = require("../../middleware/catchAssyncErrors");
const User = require("../models/userModel");

// register a user
exports.registerUser = catchAssyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "this is a sample url",
        },
    });

    res.status(201).json({
        success: true,
        user,
    });
});