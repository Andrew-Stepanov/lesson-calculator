// Форматирование валют и склонения

function formatCurrencyIntl(value, currencyCode, locale) {
    if (value === null || value === undefined || !Number.isFinite(Number(value))) return '—';
    try {
        return new Intl.NumberFormat(locale || 'ru-RU', {
            style: 'currency', currency: currencyCode, maximumFractionDigits: 0
        }).format(Number(value));
    } catch (_) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

function formatSpaced(value) {
    if (value === null || value === undefined) return '—';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function getLessonWord(number) {
    if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'урок';
    if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'урока';
    return 'уроков';
}

function getBonusWord(number) {
    if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'бонусный';
    if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'бонусных';
    return 'бонусных';
}

function getCurrencyWord(number, label) {
    if (label === 'рублей') {
        if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'рубль';
        if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'рубля';
        return 'рублей';
    } else if (label === 'долларов') {
        if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'доллар';
        if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'доллара';
        return 'долларов';
    } else if (label === 'евро') {
        return 'евро';
    }
}

function getMonthWord(number) {
    if (number === 1) return 'месяц';
    if (number >= 2 && number <= 4) return 'месяца';
    return 'месяцев';
}

window.Format = {
    formatCurrencyIntl,
    formatSpaced,
    getLessonWord,
    getBonusWord,
    getCurrencyWord,
    getMonthWord,
};


