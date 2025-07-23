"use strict";

exports.index = (req, res) => {
    res.render("index");
}

// check if the inputs are valid
const hasInvalidInputs = (cardholder, cardnumber, expmonth, expyear, cardcvc) => {
   
    const isInvalid =
        /\d/.test(cardholder) || cardholder.length > 28 ||
         /[^0-9\s]/.test(cardnumber) || cardnumber.length !== 19 || !/^(0[1-9]|1[0-2])$/.test(expmonth) || !/^\d{2}$/.test(expyear) || !/^\d{3}$/.test(cardcvc);

    if (isInvalid) {
        return true;
    }

    return false;
}

// receive the datas, check and render confirm if them are ok!
exports.customerdata = (req, res) => {

    const { cardholder, cardnumber, expmonth, expyear, cardcvc} = req.body;

    let hasError = hasInvalidInputs(cardholder, cardnumber, expmonth, expyear, cardcvc);

    if (hasError) {
        return res.status(422).json({ error: "Invalid form input. Please check the data." });
    }

    res.render("confirm");
}

