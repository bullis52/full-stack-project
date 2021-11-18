const {Schema, model} = require('mongoose');

const usersRoles = require('../configs/user-roles.enum');
const passwordService = require("../service/passwoed.service");

const userSchema = new Schema({
    userName: {
        type: String,
        required: false,
        trim: true,
        unique:true
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    },
    userType: {
        type: String,
        default: usersRoles.DRIVER,
        enum: Object.values(usersRoles)
    }
}, {timestamps: true, toObject:{virtuals:true},toJSON:{virtuals:true} });

userSchema.virtual('full name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = { // just for single record
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};
userSchema.statics = {
    async createUserWithHashPassword(userObject = {}) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model('user', userSchema);
