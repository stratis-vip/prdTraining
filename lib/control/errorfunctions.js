"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const functions_1 = require("./functions");
const makeError = (res, url, err, errNumber, titleMsg, detailMsg) => {
    if (res.statusCode !== 404) {
        res.status(422);
    }
    return res.json({
        errors: [
            {
                id: errNumber,
                code: `${errNumber}`,
                status: `${res.statusCode}`,
                links: [
                    {
                        self: `${consts_1.hostAddress}${functions_1.putSlashInFront(url)}`
                    }
                ],
                title: `${titleMsg}${err || ''}`,
                detail: `${detailMsg}`,
                message: err
            }
        ]
    });
};
exports.errorPage = (res, url, err, errNumber) => {
    return makeError(res, url, err, errNumber, 'Λάθος: ', 'Ο σέρβερ επέστρεψε λάθος!');
};
exports.errorDb = (res, url, err, errNumber) => {
    return makeError(res, url, err.code, errNumber, 'Αδυναμία σύνδεσης στη Βάση Δεδομένων ', 'Ο σέρβερ δεν επέτρεψε τη σύνδεση. Συνήθως αυτό το λάθος δημιουργείται όταν ο σέρβερ δεν εκτελείται.');
};
exports.errorNotFoundObject = (res, url, err, errNumber) => {
    return makeError(res, url, err, errNumber, '', 'Ο σέρβερ δεν επέτρεψε αντικείμενο. Αυτό το λάθος δημιουργείται όταν αναζητούμε για ένα αντικείμενο που δεν υπάρχει.');
};
exports.errorFoundDuplicateObject = (res, url, err, errNumber) => {
    return makeError(res, url, err, errNumber, '', 'Ο σέρβερ δεν επέτρεψε αντικείμενο. Αυτό το λάθος δημιουργείται διότι υπάρχει ήδη ένα αντικείμενο με τα ίδια στοιχεία');
};
