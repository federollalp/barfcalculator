// Calculation rules
const CONFIG = {
    bodyCondition: {
        verySlow: 20,
        low: 40,
        normal: 30,
        slightOverweight: 25,
        markedOverweight: 20
    },

    activityLevel: {
        lowActivity: 20,
        normal: 30,
        high: 40,
    },

    defaults: {
        bodyCondition: 30,
        activityLevel: 30
    }
};

export function calculateBarf(data) {

    const { weight, condition, activityLevel } = data;

    let conditionValue =
        CONFIG.bodyCondition[condition] ?? CONFIG.defaults.bodyCondition;

    let activityValue =
        CONFIG.activityLevel[activityLevel] ?? CONFIG.defaults.activityLevel;

    const average = (conditionValue + activityValue) / 2;

    const dailyTotalGrams = weight * average;

    const monthlyTotalKg = (dailyTotalGrams * 30) / 1000;

    return {
        total: dailyTotalGrams.toFixed(2),
        monthly: monthlyTotalKg.toFixed(3)
    };
}