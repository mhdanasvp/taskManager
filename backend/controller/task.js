const asyncHandler = require("../helpers/asyncHandler");
const Task = require("../model/task");
const createError=require("http-errors")







exports.taskById = async (req, res, next, id) => {
    try {
        const task = await Task.findById(id)
        if (!task) {
            return next(createError.NotFound("Task not found"))
        }
        req.task = task
        next()

    } catch (error) {
        next(createError.NotFound("invalid task id"))

    }
};


exports.create = asyncHandler(async (req, res) => {
    console.log(req.profile);
    let user = await req.profile
    const result=await req.body
    

    const { workingProject,taskTitle,description,Comments,status }=result

    
    if (!workingProject || !taskTitle || !description || !Comments ) {
        throw createError.BadRequest("All Fields Required")
    }

    
    const task = await new Task({ workingProject,taskTitle,description,Comments,status,user })
    savedTask = await task.save()

    
   

    res.json({ savedTask })



})
exports.listTaskByUser=asyncHandler(async(req,res)=>{
    let user = await req.profile

    let task=await Task.find({user:user._id})
    res.json({task})
})

exports.listTask = asyncHandler(async (req, res) => {
    let task = await Task.find()
        .populate('user', '_id name phone')
        .sort('-created')
    res.json({ task })
})
exports.getStatusValues = (req, res) => {



    res.json(Task.schema.path('status').enumValues);
};

exports.updateTaskStatus = (req, res) => {
    Task.update({ _id: req.body.taskId }, { $set: { status: req.body.status } }, (err, task) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(task);
    });
};