const amount = document.getElementById("amount");

amount.addEventListener("input", (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, '');
    e.target.value = value;
});
