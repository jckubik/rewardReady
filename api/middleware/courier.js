const { CourierClient } = require('@trycourier/courier');
const { courierAuthToken } = require('../config/auth.config');

const courier = CourierClient({ authorizationToken: courierAuthToken });

// Email to send the password resetLink to user
exports.sendPasswordResetEmail = async (email, firstName, resetLink, expirationDate) => {
    const holder = await courier.send({
        message: {
            to: { email },
            template: '45TJBE02WK4E4JGGS06020JZGRPP',
            data: {
                firstName,
                resetLink,
                expirationDate: new Date(expirationDate).toLocaleString('en-US'),
            },
        },
    });
};

// Email to send a confirmation of password reset
exports.sendPasswordConfirmation = async (email, firstName) => {
    const holder = await courier.send({
        message: {
            to: {
                email,
            },
            template: 'NT0P7TBAWBMG6DQQ4M09GD4MBTET',
            data: {
                firstName,
            },
        },
    });
};
