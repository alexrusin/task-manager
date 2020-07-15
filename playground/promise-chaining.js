require('../src/db/..')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5eacbadbc99f5224708c40d5', { age: 1 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1})
//     }).then((result) => {
//         console.log(result);
//     }).catch((e) => {
//         console.log(e);
//     })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5eacbadbc99f5224708c40d5', 2)
    .then(count => console.log(count))
    .catch(e => console.log(e))