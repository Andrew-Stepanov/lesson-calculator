// Загрузка и валидация данных тарифов и валют

function getCurrencyMeta(currencyCode) {
    return (window.currencyMeta && window.currencyMeta[currencyCode]) || null;
}

function getMinCost(currencyCode, language) {
    const meta = getCurrencyMeta(currencyCode);
    if (!meta) return 0;
    const value = meta.minCosts && meta.minCosts[language];
    return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function loadLessonPackages(currentCurrency, currentLanguage, currentDiscountLevel) {
    const root = window.lessonPackagesConfig || {};
    if (!root[currentCurrency] || !root[currentCurrency][currentLanguage]) {
        console.error(`Данные для валюты "${currentCurrency}" и языка "${currentLanguage}" не найдены.`);
        return {};
    }
    return root[currentCurrency][currentLanguage][currentDiscountLevel] || {};
}

window.Data = {
    getCurrencyMeta,
    getMinCost,
    loadLessonPackages,
};


