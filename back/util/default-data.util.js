const User = require('../dataBase/User');
const {ADMIN} = require('../../fullStackProject/back/configs/user-roles.enum');

module.exports = async ()=>{
    const user = await User.findOne({role:ADMIN});

    if(!user){
        await User.createUserWithHashPassword({
            name:'Alona',
            email:'alona.adimn@gmail.com',
            password:'Vasilik6103*',
            role:ADMIN
        });
    };
};
