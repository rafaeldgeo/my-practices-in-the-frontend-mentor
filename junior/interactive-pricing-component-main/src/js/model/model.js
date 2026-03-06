export function createModel() {

    let state = {
        tierIndex: 2,
        billingPeriod: "Monthly"
    }
    const ANNUAL_DISCOUNT = 0.25;

    const tiers = [
        { pageviews: "10k", monthlyPrice: 8 },
        { pageviews: "50k", monthlyPrice: 12 },
        { pageviews: "100k", monthlyPrice: 16 },
        { pageviews: "500k", monthlyPrice: 24 },
        { pageviews: "1M", monthlyPrice: 36 }
    ];

    let observers = [];

    function subscribe(observerFn) {
        observers.push(observerFn);
    }

    function notify() {
        const snapshot = getSnapshot();
        observers.forEach((observer) => observer(snapshot));
    }

    function setCurrentTier(tier) {
        if (!Number.isInteger(tier) || (tier < 0 || tier > tiers.length - 1)) {
            return;
        }
        state.tierIndex = tier;
        notify();
    }

    function setBillingPeriod(period) {
        if (period != "Monthly" && period != "Yearly") return;
        state.billingPeriod = period;
        notify();
    }

    function getTier() {
        return tiers.at(state.tierIndex);
    }

    function calculatePrice() {
        const tierSelected = getTier();
        const monthPrice = tierSelected.monthlyPrice;
        const totalYearPrice = monthPrice * 12;
        const yearPrice = totalYearPrice - (totalYearPrice * ANNUAL_DISCOUNT);

        return {
            monthly: monthPrice,
            yearly: yearPrice
        }
    }

    function definePrice() {
        const price = calculatePrice();
        const billingPeriod = state.billingPeriod;
        if (billingPeriod === "Monthly") {
            return price.monthly;
        } else if (billingPeriod === "Yearly") {
            return price.yearly;
        }
    }

    function getSnapshot() {
        const tierSelected = getTier();
        return {
            pageviews: tierSelected.pageviews,
            price: definePrice(),
            billingPeriod: state.billingPeriod
        }
    }

    return {
        subscribe,
        setCurrentTier,
        setBillingPeriod
    }
}