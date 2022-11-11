const { CourierClient } = require('@trycourier/courier');
const { courierAuthToken } = require('../config/auth.config');

const courier = CourierClient({ authorizationToken: courierAuthToken });

// Email to send the password resetLink to user
exports.sendPasswordResetEmail = async (req, res, next) => {
    const { email, firstName, resetLink, expirationDate } = req.body;

    try {
            // Send the reset email using Courier
            const { requestId } = await courier.send({
                message: {
                    to: { email: email },
                    // ID to the design template in the courier dashboard
                    template: '45TJBE02WK4E4JGGS06020JZGRPP', 
                    // The param data to be used within the template
                    data: {
                        firstName: firstName,
                        resetLink: resetLink,
                        expirationDate: new Date(expirationDate).toLocaleString('en-US'),
                    },
                },
            })
            .catch((error) => console.error(error));
            res.status(200).send({ message: `Password reset email sent.`})
            next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: `Unexpected error while trying to send password reset email through Courier.js. - ${error}` });
    }
};

// Email to send a confirmation of password update
exports.sendPasswordUpdateConfirmation = async (req, res, next) => {
    const { email, firstName } = req.body;

    try {
        // Send the confirmation email using Courier
        const { requestId } = await courier.send({
            message: {
                to: {
                    email: email,
                },
                // ID to the design template in the courier dashboard
                template: 'NT0P7TBAWBMG6DQQ4M09GD4MBTET',
                // The param data to be used within the template
                data: {
                    firstName: firstName,
                },
            },
        })
        .catch((error) => console.error(error));
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: `Unexpected error while trying to send password update email through Courier.js. - ${error}` });
    }
};

// Email to send a confirmation of password reset
exports.sendPasswordResetConfirmation = async (req, res, next) => {
    const { email, firstName } = req.body;

    try {
        // Send the confirmation email using Courier
        const { requestId } = await courier.send({
            message: {
                to: {
                    email: email,
                },
                // ID to the design template in the courier dashboard
                template: 'H0J507TDFC4PTXHMG6RBMQ3KH21D',
                // The param data to be used within the template
                data: {
                    firstName: firstName,
                },
            },
        })
        .catch((error) => console.error(error));
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: `Unexpected error while trying to send password reset email through Courier.js. - ${error}` });
    }
};
