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

        try {
            res.writeHead(302, { 'Location': '/sign-up.html' }); 
            res.end();
        } catch (err) {
            console.error('Error in process the form:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal erro to process the form.');
        }
    });
}

module.exports = processForm;