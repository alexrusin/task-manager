require('../src/db/..')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5eade1ca1c8de42d70fec213")
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed: false })
//     }).then((result) => {
//         console.log(result);
//     }).catch(e => console.log(e));

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('5eade1f71c8de42d70fec214')
    .then(count => console.log(count))
    .catch(e => console.log(e))