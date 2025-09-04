let currentCurrency = 'rub'; // 'usd' or 'rub'
let currentLanguage = 'ru'; // 'ru' or 'en'
let currentDiscountLevel = 'base'; // 'base', 'level1', 'level2', 'oneLesson'

let lessonPackages = {}; // Явное объявление, чтобы избежать неявной глобальной переменной

// Минимальные значения стоимости для разных валют и языков
const minCosts = {
    rub: {
        ru: 1300,
        en: 1900
    },
    usd: {
        ru: 20,
        en: 25
    },
    eur: {
        ru: 18,
        en: 22
    }
};

// Символы валют для отображения
const currencySymbols = {
    rub: 'рублей',
    usd: 'долларов',
    eur: 'евро'
};

function loadLessonPackages() {
    if (!lessonPackagesConfig[currentCurrency] || !lessonPackagesConfig[currentCurrency][currentLanguage]) {
        console.error(`Данные для валюты "${currentCurrency}" и языка "${currentLanguage}" не найдены.`);
        return {}; // Возвращаем пустой объект, чтобы избежать ошибок
    }
    return lessonPackagesConfig[currentCurrency][currentLanguage][currentDiscountLevel];
}

document.addEventListener('DOMContentLoaded', function() {
    lessonPackages = loadLessonPackages();
    populateTable();
    updateCosts();
    generateMessage(); // Генерация сообщения при загрузке страницы
});

function changeCurrency(currency) {
    currentCurrency = currency;
    updateButtonGroup('currency', currency);
    lessonPackages = loadLessonPackages();
    populateTable();
    updateCosts();
    generateMessage(); // Генерация сообщения при изменении валюты
}

function changeLanguage(language) {
    currentLanguage = language;
    updateButtonGroup('language', language);
    lessonPackages = loadLessonPackages();
    populateTable();
    updateCosts();
    generateMessage(); // Генерация сообщения при изменении языка
}

function changeDiscountLevel(level) {
    currentDiscountLevel = level;
    updateButtonGroup('discount', level);
    lessonPackages = loadLessonPackages();
    populateTable();
    updateCosts();
    generateMessage(); // Генерация сообщения при изменении уровня скидок
}

function updateButtonGroup(group, selectedValue) {
    const buttons = document.querySelectorAll(`.button-group button[id^='${group}']`);
    buttons.forEach(button => {
        if (button.id === `${group}-${selectedValue}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function populateTable() {
    const tableBody = document.getElementById('lessonPackagesTable');
    tableBody.innerHTML = ''; // Очистка таблицы

    if (!lessonPackages || Object.keys(lessonPackages).length === 0) {
        console.error("Нет данных для отображения.");
        tableBody.innerHTML = '<tr><td colspan="6">Нет данных для отображения</td></tr>';
        return;
    }

    Object.keys(lessonPackages).forEach(key => {
        const packageData = lessonPackages[key];
        const costFormatted = packageData.cost ? formatCurrency(packageData.cost) : '—';
        const costPerLessonFormatted = packageData.cost ? formatCurrency(Math.ceil(packageData.cost / key)) : '—';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="lessonPackageCheckbox" data-package="${key}" ${packageData.selected ? 'checked' : ''} onchange="generateMessage()"></td>
            <td>${key} ${getLessonWord(key)} <button class="copy-button" onclick="copyLink('${key}')">🔗</button></td>
            <td>${costFormatted}</td>
            <td>${costPerLessonFormatted}</td>
            <td><input type="number" class="bonusLessonsInput" data-package="${key}" value="${packageData.bonusLessons || 0}" min="0" onchange="updateCosts(); generateMessage()"></td>
            <td class="costWithBonuses" data-package="${key}"></td>
        `;
        tableBody.appendChild(row);
    });
    updateCosts(); // Обновляем стоимость после заполнения таблицы
}

function updateCosts() {
    const rows = document.querySelectorAll('#lessonPackagesTable tr');
    const minCost = minCosts[currentCurrency][currentLanguage]; // Минимальная стоимость для текущей валюты и языка

    rows.forEach(row => {
        const packageCount = parseInt(row.querySelector('.lessonPackageCheckbox').dataset.package, 10);
        const bonusLessons = parseInt(row.querySelector('.bonusLessonsInput').value, 10);
        const totalLessons = packageCount + bonusLessons;
        const totalCost = lessonPackages[packageCount] ? lessonPackages[packageCount].cost : null;
        const costWithBonuses = totalCost ? Math.ceil(totalCost / totalLessons) : 0;
        const costCell = row.querySelector('.costWithBonuses');
        costCell.textContent = formatCurrency(costWithBonuses);

        // Подсвечиваем, если стоимость за урок ниже минимальной
        if (costWithBonuses < minCost) {
            costCell.classList.add('warning');
            costCell.title = `Стоимость за урок ниже минимальной (${formatCurrency(minCost)})!`;
        } else {
            costCell.classList.remove('warning');
            costCell.title = "";
        }
    });
}

function copyLink(packageCount) {
    const link = lessonPackages[packageCount].link;
    navigator.clipboard.writeText(link)
        .then(() => showToast('Ссылка скопирована в буфер обмена', 'success'))
        .catch(err => showToast('Ошибка при копировании ссылки', 'error'));
}

function formatCurrency(value) {
    if (value === null || value === undefined) return '—';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Функция для склонения слова "урок"
function getLessonWord(number) {
    if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'урок';
    if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'урока';
    return 'уроков';
}

// Функция для склонения слова "бонусный"
function getBonusWord(number) {
    if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'бонусный';
    if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'бонусных';
    return 'бонусных';
}

// Функция для склонения слова "рубль" и "доллар"
function getCurrencyWord(number, currency) {
    if (currency === 'рублей') {
        if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'рубль';
        if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'рубля';
        return 'рублей';
    } else if (currency === 'долларов') {
        if (number === 1 || (number % 10 === 1 && number % 100 !== 11)) return 'доллар';
        if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'доллара';
        return 'долларов';
    } else if (currency === 'евро') {
        return 'евро';
    }
}

// Функция для получения даты +3 дня
function getFutureDate(daysToAdd) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
}



function generateMessage() {
    const selectedPackages = [];
    const rows = document.querySelectorAll('#lessonPackagesTable tr');
    const currencyLabel = currencySymbols[currentCurrency]; // Получаем валюту для вывода

    rows.forEach(row => {
        const checkbox = row.querySelector('.lessonPackageCheckbox');
        const packageCount = parseInt(checkbox.dataset.package, 10); // Количество уроков в пакете
        const isChecked = checkbox.checked;
        const bonusLessons = parseInt(row.querySelector('.bonusLessonsInput').value, 10); // Количество бонусных уроков
        const totalLessons = packageCount + bonusLessons; // Общее количество уроков с бонусами
        const totalCost = lessonPackages[packageCount] ? lessonPackages[packageCount].cost : null; // Общая стоимость пакета
        const costWithBonuses = totalCost ? (totalCost / totalLessons).toFixed(0) : 0; // Стоимость за урок с бонусами
        const link = lessonPackages[packageCount] ? lessonPackages[packageCount].link : '';

        if (isChecked && totalCost) {
            selectedPackages.push({
                lessons: totalLessons,
                cost: totalCost,
                package: packageCount,
                bonus: bonusLessons,
                costPerLesson: costWithBonuses,
                link: link
            });
        }
    });

    if (selectedPackages.length === 0) {
        return;
    }

    let message = 'Цены на индивидуальные уроки с учителем:\n\n';
    selectedPackages.forEach(pkg => {
        const lessonWord = getLessonWord(pkg.package); // Склоняем "урок" в зависимости от количества
        const bonusWord = getBonusWord(pkg.bonus); // Склоняем "бонусный"
        const currencyWord = getCurrencyWord(pkg.cost, currencyLabel); // Склоняем валюту
        const months = Math.floor(pkg.lessons / 4); // Рассчитываем количество месяцев (округляем в меньшую сторону)
        const monthWord = getMonthWord(months); // Склоняем "месяц"

        if (pkg.bonus > 0) {
            message += `📚 ${pkg.package} ${lessonWord} + ${pkg.bonus} ${bonusWord} ${getLessonWord(pkg.bonus)} - ${formatCurrency(pkg.cost)} ${currencyWord}\n${months} ${monthWord} обучения, при 1 уроке в неделю.\n${pkg.link}\n\n`;
        } else {
            message += `📚 ${pkg.package} ${lessonWord} - ${formatCurrency(pkg.cost)} ${currencyWord}\n${months} ${monthWord} обучения, при 1 уроке в неделю.\n${pkg.link}\n\n`;
        }
    });

    message += `🎉 *Предложение действительно до ${getFutureDate(1)}*`;

    const generatedMessageTextarea = document.getElementById('generatedMessage');
    generatedMessageTextarea.value = message;
    autoResize(generatedMessageTextarea); // Автоматически подстраиваем высоту после генерации
}

// Функция для склонения слова "месяц"
function getMonthWord(number) {
    if (number === 1) return 'месяц';
    if (number >= 2 && number <= 4) return 'месяца';
    return 'месяцев';
}





function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function copyMessage() {
    const generatedMessageTextarea = document.getElementById('generatedMessage');
    const text = generatedMessageTextarea.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Сообщение скопировано', 'success'))
            .catch(() => {
                generatedMessageTextarea.select();
                document.execCommand('copy');
                showToast('Сообщение скопировано', 'success');
            });
    } else {
        generatedMessageTextarea.select();
        document.execCommand('copy');
        showToast('Сообщение скопировано', 'success');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    // малое тайминговое окно для анимации появления
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 200);
    }, 2200);
}
