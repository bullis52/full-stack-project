module.exports = {
    userNormalizator: (userToNoralize = {}) => {
        const fieldsToRemove = ['password'];
        fieldsToRemove.forEach((field) => {
            delete userToNoralize[field];
        });
        return userToNoralize;
    }
};
