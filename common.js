document.addEventListener('DOMContentLoaded', function() {
    populateTable();
    updateCosts();
    setDefaultDate();
});

function populateTable() {
    const tableBody = document.getElementById('lessonPackagesTable');
    Object.keys(lessonPackages).forEach(key => {
        const packageData = lessonPackages[key];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="lessonPackageCheckbox" data-package="${key}" ${packageData.selected ? 'checked' : ''}></td>
            <td>${key} ${getLessonWord(key)} <button class="copy-button" onclick="copyLink(${key})">🔗</button></td>
            <td>${formatCurrency(packageData.cost)}</td>
            <td>${formatCurrency(Math.ceil(packageData.cost / key))}</td>
            <td><input type="number" class="bonusLessonsInput" data-package="${key}" value="${packageData.bonusLessons || 0}" min="0" ${packageData.bonusLessons === undefined ? 'disabled' : ''} onchange="updateCosts()"></td>
            <td class="costWithBonuses" data-package="${key}"></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateCosts() {
    const rows = document.querySelectorAll('#lessonPackagesTable tr');
    rows.forEach(row => {
        const packageCount = parseInt(row.querySelector('.lessonPackageCheckbox').dataset.package);
        const bonusLessons = parseInt(row.querySelector('.bonusLessonsInput').value);
        const totalLessons = packageCount + bonusLessons;
        const totalCost = lessonPackages[packageCount].cost;
        const costWithBonuses = Math.ceil(totalCost / totalLessons);
        const costCell = row.querySelector('.costWithBonuses');
        costCell.textContent = formatCurrency(costWithBonuses);

        if (costWithBonuses < 1050) {
            costCell.classList.add('warning');
            costCell.title = "Стоимость за урок слишком низкая, бонусы недопустимы!";
        } else {
            costCell.classList.remove('warning');
            costCell.title = "";
        }
    });
}

function copyLink(packageCount) {
    const link = lessonPackages[packageCount].link;
    navigator.clipboard.writeText(link)
        .then(() => alert('Ссылка скопирована в буфер обмена'))
        .catch(err => console.error('Ошибка при копировании: ', err));
}

function generateMessage() {
    const rows = document.querySelectorAll('#lessonPackagesTable tr');
    let message = 'Цены на индивидуальные уроки с учителем:\n\n';

    rows.forEach(row => {
        const checkbox = row.querySelector('.lessonPackageCheckbox');
        if (checkbox.checked) {
            const packageCount = parseInt(checkbox.dataset.package);
            const bonusLessons = parseInt(row.querySelector('.bonusLessonsInput').value);
            const totalLessons = packageCount + bonusLessons;
            const totalCost = lessonPackages[packageCount].cost;
            const costPerLessonWithBonuses = Math.ceil(totalCost / totalLessons);
            const link = lessonPackages[packageCount].link;

            message += `${packageCount} ${getLessonWord(packageCount)}`;
            if (bonusLessons > 0) {
                message += ` + ${bonusLessons} ${getBonusLessonWord(bonusLessons)}`;
            }
            message += ` - ${formatCurrency(totalCost)} рублей\n`;
            message += `Стоимость за урок${bonusLessons > 0 ? ' с бонусами' : ''}: ${formatCurrency(costPerLessonWithBonuses)} рублей\n`;
            message += `${link}\n\n`;
        }
    });

    const validityDate = document.getElementById('validityDate').valueAsDate;
    if (validityDate) {
        message += `* Предложение действительно до ${formatDate(validityDate)}`;
    } else {
        message += '* Предложение действительно в течение 1 дня после пробного урока.';
    }
    document.getElementById('generatedMessage').value = message;
}

function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function getLessonWord(number) {
    if (number === 1) {
        return 'урок';
    } else if (number % 10 === 1 && number % 100 !== 11) {
        return 'урок';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return 'урока';
    } else {
        return 'уроков';
    }
}

function getBonusLessonWord(number) {
    if (number === 1) {
        return 'бонусный урок';
    } else if (number % 10 === 1 && number % 100 !== 11) {
        return 'бонусный урок';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return 'бонусных урока';
    } else {
        return 'бонусных уроков';
    }
}

function copyMessage() {
    const messageText = document.getElementById('generatedMessage');
    messageText.select();
    document.execCommand('copy');
    alert('Сообщение скопировано в буфер обмена');
}

function setDefaultDate() {
    const validityDate = document.getElementById('validityDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    validityDate.valueAsDate = tomorrow;
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}
