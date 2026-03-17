export function createModel() {

    let state = {
        tierIndex: 2,
        billingPeriod: "monthly"
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

    // subscribe observe from controller and init state of view
    function subscribe(observerFn) {
        observers.push(observerFn);
        observerFn(getSnapshot());
    }

    // notify change
    function notify() {
        const snapshot = getSnapshot();
        observers.forEach((observer) => observer(snapshot));
    }

    // set value of the range
    function setCurrentTier(tierIndex) {
        tierIndex = Number(tierIndex);
        if (!Number.isInteger(tierIndex) || (tierIndex < 0 || tierIndex > tiers.length - 1)) return;
        state.tierIndex = tierIndex;
        notify();
    }

    // set type of period
    function setBillingPeriod(period) {
        if (period != "monthly" && period != "yearly") return;
        state.billingPeriod = period;
        notify();
    }

    // set state when click on switch
    function toggleBillingPeriod(){
        const billingPeriodSelected = state.billingPeriod === "monthly" ? "yearly" : "monthly";
        state.billingPeriod = billingPeriodSelected;
        notify();
    }

    // get the tier
    function getTier() {
        return tiers.at(state.tierIndex);
    }

    // calcule the price
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

    // define the price by period
    function definePrice() {
        const price = calculatePrice();
        const billingPeriod = state.billingPeriod;
        if (billingPeriod === "monthly") {
            return price.monthly;
        } else if (billingPeriod === "yearly") {
            return price.yearly;
        }
    }

    // return the dates
    function getSnapshot() {
        const tierSelected = getTier();
        return {
            tierIndex: state.tierIndex,
            pageviews: tierSelected.pageviews,
            price: definePrice(),
            billingPeriod: state.billingPeriod
        }
    }

    return {
        subscribe,
        setCurrentTier,
        setBillingPeriod,
        toggleBillingPeriod
    }
}