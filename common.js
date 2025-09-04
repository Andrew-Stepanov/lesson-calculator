let currentCurrency = 'rub'; // 'rub', 'usd', 'eur'
let currentLanguage = 'ru'; // 'ru' or 'en'
let currentDiscountLevel = 'base'; // 'base', 'level1', 'level2', 'oneLesson'

let lessonPackages = {}; // Явное объявление, чтобы избежать неявной глобальной переменной
let noBonusesMode = false; // быстрый фильтр "без бонусов"

function loadLessonPackages() {
    return window.Data.loadLessonPackages(currentCurrency, currentLanguage, currentDiscountLevel);
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    // восстановить выбор noBonuses из localStorage
    const savedNoBonus = localStorage.getItem('noBonusesMode');
    if (savedNoBonus === 'true') {
        noBonusesMode = true;
        const on = document.getElementById('nobonus-on');
        const off = document.getElementById('nobonus-off');
        if (on && off) { on.classList.add('active'); off.classList.remove('active'); }
        document.documentElement.classList.add('no-bonuses');
    }
    lessonPackages = loadLessonPackages();
    populateTable();
    attachTableHandlers();
    updateCosts();
    generateMessage(); // Генерация сообщения при загрузке страницы
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
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
function attachTableHandlers() {
    const tbody = document.getElementById('lessonPackagesTable');
    if (!tbody) return;
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('copy-button')) {
            const pkg = Number(target.dataset.package);
            if (lessonPackages[pkg] && lessonPackages[pkg].link) copyLink(pkg);
        }
        if (target.classList.contains('lessonPackageCheckbox')) {
            generateMessage();
        }
    });
    tbody.addEventListener('input', (e) => {
        const target = e.target;
        if (target.classList.contains('bonusLessonsInput')) {
            updateCosts();
            generateMessage();
        }
    });
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = next === 'light' ? '🌙' : '☀️';
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

function setNoBonuses(flag) {
    noBonusesMode = Boolean(flag);
    // переключаем визуальное состояние кнопок фильтра
    const on = document.getElementById('nobonus-on');
    const off = document.getElementById('nobonus-off');
    if (on && off) {
        if (noBonusesMode) {
            on.classList.add('active');
            off.classList.remove('active');
            document.documentElement.classList.add('no-bonuses');
        } else {
            off.classList.add('active');
            on.classList.remove('active');
            document.documentElement.classList.remove('no-bonuses');
        }
    }
    localStorage.setItem('noBonusesMode', String(noBonusesMode));
    updateCosts();
    generateMessage();
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
        const pkgCount = Number(key);
        const packageData = lessonPackages[key];

        const tr = document.createElement('tr');

        const tdSelect = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'lessonPackageCheckbox';
        checkbox.dataset.package = String(pkgCount);
        checkbox.checked = Boolean(packageData.selected);
        tdSelect.appendChild(checkbox);

        const tdName = document.createElement('td');
        tdName.appendChild(document.createTextNode(`${pkgCount} ${window.Format.getLessonWord(pkgCount)} `));
        const linkBtn = document.createElement('button');
        linkBtn.className = 'copy-button';
        linkBtn.textContent = '🔗';
        linkBtn.dataset.package = String(pkgCount);
        tdName.appendChild(linkBtn);

        const tdTotal = document.createElement('td');
        tdTotal.textContent = packageData.cost ? window.Format.formatSpaced(packageData.cost) : '—';

        const tdPerLesson = document.createElement('td');
        const per = (packageData.cost && pkgCount) ? Math.ceil(Number(packageData.cost) / pkgCount) : null;
        tdPerLesson.textContent = per !== null ? window.Format.formatSpaced(per) : '—';

        const tdBonus = document.createElement('td');
        const bonusInput = document.createElement('input');
        bonusInput.type = 'number';
        bonusInput.min = '0';
        bonusInput.className = 'bonusLessonsInput';
        bonusInput.dataset.package = String(pkgCount);
        bonusInput.value = String(Number(packageData.bonusLessons || 0));
        tdBonus.appendChild(bonusInput);

        const tdCostWithBonus = document.createElement('td');
        tdCostWithBonus.className = 'costWithBonuses';
        tdCostWithBonus.dataset.package = String(pkgCount);

        tr.appendChild(tdSelect);
        tr.appendChild(tdName);
        tr.appendChild(tdTotal);
        tr.appendChild(tdPerLesson);
        tr.appendChild(tdBonus);
        tr.appendChild(tdCostWithBonus);

        tableBody.appendChild(tr);
    });
    updateCosts(); // Обновляем стоимость после заполнения таблицы
}

function updateCosts() {
    const rows = document.querySelectorAll('#lessonPackagesTable tr');
    const minCost = window.Data.getMinCost(currentCurrency, currentLanguage); // Минимальная стоимость для текущей валюты и языка

    rows.forEach(row => {
        const pkgEl = row.querySelector('.lessonPackageCheckbox');
        const bonusEl = row.querySelector('.bonusLessonsInput');
        if (!pkgEl || !bonusEl) return;
        const packageCount = Number(pkgEl.dataset.package);
        let bonusLessons = noBonusesMode ? 0 : Number(bonusEl.value);
        if (!Number.isFinite(bonusLessons) || bonusLessons < 0) bonusLessons = 0;
        const totalCost = lessonPackages[packageCount] ? Number(lessonPackages[packageCount].cost) : NaN;
        const totalLessons = packageCount + bonusLessons;
        const costCell = row.querySelector('.costWithBonuses');
        if (!Number.isFinite(totalCost) || !Number.isFinite(totalLessons) || totalLessons <= 0) {
            costCell.textContent = '—';
            costCell.classList.remove('warning');
            costCell.title = '';
            return;
        }
        const costWithBonuses = Math.ceil(totalCost / totalLessons);
        costCell.textContent = window.Format.formatSpaced(costWithBonuses);
        if (Number.isFinite(minCost) && costWithBonuses < minCost) {
            costCell.classList.add('warning');
            costCell.title = `Стоимость за урок ниже минимальной (${window.Format.formatSpaced(minCost)})!`;
        } else {
            costCell.classList.remove('warning');
            costCell.title = '';
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
    return window.Format.formatSpaced(value);
}

// Склонения и форматирование перенесены в Format

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
    const meta = window.Data.getCurrencyMeta(currentCurrency) || { label: '' };
    const currencyLabel = meta.label; // Получаем валюту для вывода

    rows.forEach(row => {
        const checkbox = row.querySelector('.lessonPackageCheckbox');
        const packageCount = parseInt(checkbox.dataset.package, 10); // Количество уроков в пакете
        const isChecked = checkbox.checked;
        const bonusLessons = noBonusesMode ? 0 : parseInt(row.querySelector('.bonusLessonsInput').value, 10); // Количество бонусных уроков
        const totalLessons = packageCount + (noBonusesMode ? 0 : bonusLessons); // Общее количество уроков с бонусами
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
        const lessonWord = window.Format.getLessonWord(pkg.package);
        const bonusWord = window.Format.getBonusWord(pkg.bonus);
        const currencyWord = window.Format.getCurrencyWord(pkg.cost, currencyLabel);
        const months = Math.floor(pkg.lessons / 4); // Рассчитываем количество месяцев (округляем в меньшую сторону)
        const monthWord = window.Format.getMonthWord(months);

        if (!noBonusesMode && pkg.bonus > 0) {
            message += `📚 ${pkg.package} ${lessonWord} + ${pkg.bonus} ${bonusWord} ${window.Format.getLessonWord(pkg.bonus)} - ${formatCurrency(pkg.cost)} ${currencyWord}\n${months} ${monthWord} обучения, при 1 уроке в неделю.\n${pkg.link}\n\n`;
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
