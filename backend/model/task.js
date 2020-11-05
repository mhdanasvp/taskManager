const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema


const taskSchema = new mongoose.Schema(
    {
        workingProject: {
            type: String,
            required: true,

        },
        taskTitle: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,

        },
        Comments: {
            type: String,
            required: true,

        },

        status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Ongoing", "completed"]
        },
        updated: Date,
        user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
);

const Task=mongoose.model("Task",taskSchema)


module.exports=Task