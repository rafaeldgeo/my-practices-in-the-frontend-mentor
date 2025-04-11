function processForm(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    }); 

    req.on("end", () => {
        const data = new URLSearchParams(body);
        const name = data.get("name");
        const email = data.get("email");
        const plan = data.get("plan");
        const phone = data.get("phone");
        const company = data.get("company");

        console.log(`Received: Name: ${name} | Email = ${email} | Plan: ${plan} | Phone: ${phone} | Company: ${company}`);

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("The data was sent successfully");
    });
}

module.exports = processForm;