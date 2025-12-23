const currencyMeta = {
    rub: {
        label: 'рублей',
        symbol: '₽',
        currencyCode: 'RUB',
        locale: 'ru-RU',
        minCosts: { ru: 1450, en: 1900 }
    },
    usd: {
        label: 'долларов',
        symbol: '$',
        currencyCode: 'USD',
        locale: 'en-US',
        minCosts: { ru: 22, en: 25 }
    },
    eur: {
        label: 'евро',
        symbol: '€',
        currencyCode: 'EUR',
        locale: 'de-DE',
        minCosts: { ru: 21, en: 22 }
    }
};

const lessonPackagesConfig = {
    rub: {
        ru: {
            base: {
                4: { cost: 7600, link: "https://app.progkids.com/i/buy/four-lessons-new", bonusLessons: 0, selected: false },
                8: { cost: 14400, link: "https://app.progkids.com/i/buy/eight-lessons-new", bonusLessons: 0, selected: false },
                16: { cost: 27200, link: "https://app.progkids.com/i/buy/sixteen-lessons-new", bonusLessons: 0, selected: true },
                24: { cost: 39600, link: "https://app.progkids.com/i/buy/twentyfour-lessons-new", bonusLessons: 0, selected: false },
                32: { cost: 51200, link: "https://app.progkids.com/i/buy/thirtytwo-lessons-new", bonusLessons: 0, selected: true },
                40: { cost: 62000, link: "https://app.progkids.com/i/buy/forty-lessons-new", bonusLessons: 0, selected: false },
                48: { cost: 72000, link: "https://app.progkids.com/i/buy/fortyeight-lessons-new", bonusLessons: 0, selected: false }
            },
            discount: {
                16: { cost: 24000, link: "https://app.progkids.com/i/buy/sixteen-lessons-new-year", bonusLessons: 0, selected: false },
                32: { cost: 46400, link: "https://app.progkids.com/i/buy/thirtytwo-new-year", bonusLessons: 0, selected: false },
            },
            recurring: {
                "4-auto": { cost: 6000, link: "https://app.progkids.com/i/buy/auto-4-ru", bonusLessons: 0, selected: true, isRecurring: true, description: "Рекуррентный платеж каждые 30 дней" }
            },
            group: {
                "mod1": { cost: 12000, link: "https://app.progkids.com/i/buy/g-mod1-r", bonusLessons: 0, selected: false, lessons: 8, order: 1 },
                "mod2": { cost: 24000, link: "https://app.progkids.com/i/buy/g-mod2-r", bonusLessons: 0, selected: false, lessons: 20, order: 2 },
                "mod3": { cost: 15600, link: "https://app.progkids.com/i/buy/g-mod3-r", bonusLessons: 0, selected: false, lessons: 13, order: 3 },
                "mod4": { cost: 12000, link: "https://app.progkids.com/i/buy/g-mod4-r", bonusLessons: 0, selected: false, lessons: 10, order: 4 },
                "mod5": { cost: 16800, link: "https://app.progkids.com/i/buy/g-mod5-r", bonusLessons: 0, selected: false, lessons: 14, order: 5 },
                "mod6": { cost: 14400, link: "https://app.progkids.com/i/buy/g-mod6-r", bonusLessons: 0, selected: false, lessons: 12, order: 6 },
                "mod7": { cost: 18000, link: "https://app.progkids.com/i/buy/g-mod7-r", bonusLessons: 0, selected: false, lessons: 15, order: 7 }
            },
            groupDiscount: {
                "mod1": { cost: 10200, link: "https://app.progkids.com/i/buy/g-mod1-u", bonusLessons: 0, selected: false, lessons: 8, order: 1 },
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
                8: { cost: 280, link: "https://app.progkids.com/i/buy/122-8", bonusLessons: 0, selected: false },
                16: { cost: 496, link: "https://app.progkids.com/i/buy/122-16", bonusLessons: 0, selected: true },
                24: { cost: 696, link: "https://app.progkids.com/i/buy/122-24", bonusLessons: 0, selected: false },
                32: { cost: 800, link: "https://app.progkids.com/i/buy/122-32", bonusLessons: 0, selected: true },
                40: { cost: 960, link: "https://app.progkids.com/i/buy/122-40", bonusLessons: 0, selected: false },
                48: { cost: 1104, link: "https://app.progkids.com/i/buy/122-48", bonusLessons: 0, selected: false },
                56: { cost: 1232, link: "https://app.progkids.com/i/buy/122-56", bonusLessons: 0, selected: true }
            },
            discount: {
                16: { cost: 446, link: "https://app.progkids.com/i/buy/sixteen-lessons-new-year2025", bonusLessons: 0, selected: false },
                32: { cost: 730, link: "https://app.progkids.com/i/buy/thirtytwo-new-year2025", bonusLessons: 0, selected: false },
                56: { cost: 1176, link: "https://app.progkids.com/i/buy/fiftysix-new-year2025", bonusLessons: 0, selected: false }
            },
            group: {
                "mod1": { cost: 184, link: "https://app.progkids.com/i/buy/g-mod1-u-usd", bonusLessons: 0, selected: false, lessons: 8, order: 1 },
                "mod2": { cost: 369, link: "https://app.progkids.com/i/buy/g-mod2-u-usd", bonusLessons: 0, selected: false, lessons: 20, order: 2 },
                "mod3": { cost: 240, link: "https://app.progkids.com/i/buy/g-mod3-u-usd", bonusLessons: 0, selected: false, lessons: 13, order: 3 },
                "mod4": { cost: 184, link: "https://app.progkids.com/i/buy/g-mod4-u-usd", bonusLessons: 0, selected: false, lessons: 10, order: 4 },
                "mod5": { cost: 258, link: "https://app.progkids.com/i/buy/g-mod5-u-usd", bonusLessons: 0, selected: false, lessons: 14, order: 5 },
                "mod6": { cost: 221, link: "https://app.progkids.com/i/buy/g-mod6-u-usd", bonusLessons: 0, selected: false, lessons: 12, order: 6 },
                "mod7": { cost: 276, link: "https://app.progkids.com/i/buy/g-mod7-u-usd", bonusLessons: 0, selected: false, lessons: 15, order: 7 }
            },
            groupDiscount: {
                "mod1": { cost: 156, link: "https://app.progkids.com/i/buy/g-mod1-u-discount-usd", bonusLessons: 0, selected: false, lessons: 8, order: 1 }
            }
        },
        en: {
            base: {
                8: { cost: 384, link: "https://app.progkids.com/i/buy/8-usa", bonusLessons: 0, selected: false },
                16: { cost: 720, link: "https://app.progkids.com/i/buy/16-usa", bonusLessons: 0, selected: true },
                24: { cost: 984, link: "https://app.progkids.com/i/buy/24-usa", bonusLessons: 0, selected: true },
                32: { cost: 1120, link: "https://app.progkids.com/i/buy/32-usa", bonusLessons: 0, selected: true }
            },
        }
    }
    ,
    eur: {
        ru: {
            base: {
                4: { cost: 152, link: "https://app.progkids.com/i/buy/eur4", bonusLessons: 0, selected: false },
                8: { cost: 280, link: "https://app.progkids.com/i/buy/eur8", bonusLessons: 0, selected: false },
                16: { cost: 496, link: "https://app.progkids.com/i/buy/eur16", bonusLessons: 0, selected: true },
                24: { cost: 696, link: "https://app.progkids.com/i/buy/eur24", bonusLessons: 0, selected: false },
                32: { cost: 800, link: "https://app.progkids.com/i/buy/eur32", bonusLessons: 0, selected: true },
                40: { cost: 960, link: "https://app.progkids.com/i/buy/eur40", bonusLessons: 0, selected: false }
            }
        },
        en: {
            base: {
            }
        }
    }
};
