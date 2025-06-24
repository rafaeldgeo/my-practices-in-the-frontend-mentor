// execute the actions that the routes need

exports.index = (req, res) => {
    res.render("index"); // show the home
}

// sanitize inputs back-end side
const validInputs = (amount, term, rate, type) => {

    const isInvalid =
        typeof amount !== "string" || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 ||
        typeof term !== "string" || isNaN(parseFloat(term)) || parseFloat(term) <= 0 ||
        typeof rate !== "string" || isNaN(parseFloat(rate)) || parseFloat(rate) <= 0 ||
        !["repayment", "interest"].includes(type)

    if (isInvalid) {
        return false;
    }

    return true;

}
    // it makes calcule Mortage
    exports.calculate = (req, res) => {

        const { amount, term, rate, type } = req.body;

        validInputs(amount, term, rate, type);
        
        const principal = parseFloat(amount) * 1000;
        const annualInterest = parseFloat(rate) / 100;
        const months = parseInt(term) * 12;
        const monthlyRate = annualInterest / 12;

        let monthlyPayment = 0;
        let totalRepayment = 0;

        if (type === "repayment") {
            // Amortization Formula (PMT)
            monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, - months));
            totalRepayment = monthlyPayment * months;
        } else if (type === "interest") {
            // Monthly interest only
            monthlyPayment = principal * monthlyRate;
            totalRepayment = monthlyPayment * months;
        } else {
            return res.status(400).send("Type of mortage invalid.");
        }

        // format currency
        const formatter = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        res.render("result", {
            results: {
                monthlyPayment: formatter.format(monthlyPayment),
                totalRepayment: formatter.format(totalRepayment),
            }
        });
    }

