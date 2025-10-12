const currencyMeta = {
    rub: {
        label: 'рублей',
        symbol: '₽',
        currencyCode: 'RUB',
        locale: 'ru-RU',
        minCosts: { ru: 1300, en: 1900 }
    },
    usd: {
        label: 'долларов',
        symbol: '$',
        currencyCode: 'USD',
        locale: 'en-US',
        minCosts: { ru: 20, en: 25 }
    },
    eur: {
        label: 'евро',
        symbol: '€',
        currencyCode: 'EUR',
        locale: 'de-DE',
        minCosts: { ru: 18, en: 22 }
    }
};

const lessonPackagesConfig = {
    rub: {
        ru: {
            base: {
                4: { cost: 7600, link: "https://app.progkids.com/i/buy/four-lessons-new", bonusLessons: 0, selected: false },
                8: { cost: 14400, link: "https://app.progkids.com/i/buy/eight-lessons-new", bonusLessons: 1, selected: false },
                16: { cost: 27200, link: "https://app.progkids.com/i/buy/sixteen-lessons-new", bonusLessons: 2, selected: true },
                24: { cost: 39600, link: "https://app.progkids.com/i/buy/twentyfour-lessons-new", bonusLessons: 2, selected: false },
                32: { cost: 51200, link: "https://app.progkids.com/i/buy/thirtytwo-lessons-new", bonusLessons: 3, selected: true },
                40: { cost: 62000, link: "https://app.progkids.com/i/buy/forty-lessons-new", bonusLessons: 3, selected: false },
                48: { cost: 72000, link: "https://app.progkids.com/i/buy/fortyeight-lessons-new", bonusLessons: 3, selected: false },
                56: { cost: 81200, link: "https://app.progkids.com/i/buy/fiftysix-lessons-new", bonusLessons: 4, selected: true }
            },
            recurring: {
                4: { cost: 5700, link: "https://app.progkids.com/i/buy/5700-4", bonusLessons: 0, selected: true, isRecurring: true, description: "Рекуррентный платеж каждые 30 дней" },
                "4-auto": { cost: 6000, link: "https://app.progkids.com/i/buy/auto-4-ru", bonusLessons: 0, selected: true, isRecurring: true, description: "Рекуррентный платеж каждые 30 дней" }
            }
        },
        en: {
            base: {
                8: { cost: 20000, link: "https://app.progkids.com/i/buy/enrub8", bonusLessons: 0, selected: true },
                16: { cost: 38400, link: "https://app.progkids.com/i/buy/enrub16", bonusLessons: 0, selected: true },
                24: { cost: 55200, link: "https://app.progkids.com/i/buy/enrub24", bonusLessons: 0, selected: true },
                48: { cost: 105600, link: "https://app.progkids.com/i/buy/enrub48", bonusLessons: 0, selected: true },
            }
        }
    },
    usd: {
        ru: {
            base: {
                4: { cost: 152, link: "https://app.progkids.com/i/buy/122-4", bonusLessons: 0, selected: false },
                8: { cost: 280, link: "https://app.progkids.com/i/buy/122-8", bonusLessons: 2, selected: false },
                16: { cost: 496, link: "https://app.progkids.com/i/buy/122-16", bonusLessons: 2, selected: true },
                24: { cost: 696, link: "https://app.progkids.com/i/buy/122-24", bonusLessons: 2, selected: false },
                32: { cost: 800, link: "https://app.progkids.com/i/buy/122-32", bonusLessons: 2, selected: true },
                40: { cost: 960, link: "https://app.progkids.com/i/buy/122-40", bonusLessons: 2, selected: false },
                48: { cost: 1104, link: "https://app.progkids.com/i/buy/122-48", bonusLessons: 3, selected: false },
                56: { cost: 1232, link: "https://app.progkids.com/i/buy/122-56", bonusLessons: 4, selected: true }
            },
        },
        en: {
            base: {
                8: { cost: 384, link: "https://app.progkids.com/i/buy/8-usa", bonusLessons: 0, selected: false },
                16: { cost: 720, link: "https://app.progkids.com/i/buy/16-usa", bonusLessons: 2, selected: true },
                24: { cost: 984, link: "https://app.progkids.com/i/buy/24-usa", bonusLessons: 4, selected: true },
                32: { cost: 1120, link: "https://app.progkids.com/i/buy/32-usa", bonusLessons: 4, selected: true }
            },
        }
    }
    ,
    eur: {
        ru: {
            base: {
                4: { cost: 152, link: "https://app.progkids.com/i/buy/eur4", bonusLessons: 0, selected: false },
                8: { cost: 280, link: "https://app.progkids.com/i/buy/eur8", bonusLessons: 1, selected: false },
                16: { cost: 496, link: "https://app.progkids.com/i/buy/eur16", bonusLessons: 2, selected: true },
                24: { cost: 696, link: "https://app.progkids.com/i/buy/eur24", bonusLessons: 2, selected: false },
                32: { cost: 800, link: "https://app.progkids.com/i/buy/eur32", bonusLessons: 3, selected: true },
                40: { cost: 960, link: "https://app.progkids.com/i/buy/eur40", bonusLessons: 4, selected: false }
            }
        },
        en: {
            base: {
            }
        }
    }
};
