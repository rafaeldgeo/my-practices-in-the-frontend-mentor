export function createModel() {

    let billingPeriod = "Monthly";
    let tierIndex = 2;

    const tiers = [
        { pageviews: "10k", monthlyPrice: 8 },
        { pageviews: "50k", monthlyPrice: 12 },
        { pageviews: "100k", monthlyPrice: 16 },
        { pageviews: "500k", monthlyPrice: 24 },
        { pageviews: "1M", monthlyPrice: 36 }
    ]

    let observers = [];

    function subscribe(observerFn) {
        observers.push(observerFn);
    }

    function notifty() {
        const snapshot = getSnapshot();
        observers.forEach((observer) => observer(snapshot));
    }


    function getSnapshot() {

    }

    return {
        subscribe
    }
}