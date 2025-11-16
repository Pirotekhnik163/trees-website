document.addEventListener('DOMContentLoaded', function() {
    const gblocks = document.querySelectorAll('.gblock');
    const seedBlock = document.getElementById('seed-block');
    const seedInput = document.getElementById('seed-input');
    const costBlock = document.getElementById('cost-block');
    const costValue = document.getElementById('cost-value');

    // Установка по-умолчанию: первый блок — selected, остальные — black
    gblocks.forEach((gb, index) => {
        if (index === 0) {
            gb.classList.add('selected');
        } else {
            gb.classList.remove('selected');
        }
    });

    // Gblock выбор
    gblocks.forEach(gb => {
        gb.addEventListener('click', function() {
            // Снимаем selected у всех
            gblocks.forEach(gbb => {
                gbb.classList.remove('selected');
            });

            // Добавляем selected к выбранному
            this.classList.add('selected');

            // Если выбран не первый блок (не selected без black)
            if (this.classList.contains('black')) {
                seedBlock.classList.add('hide');
                costBlock.classList.remove('hide');
                costValue.textContent = '5000 ₽';
            } else {
                seedBlock.classList.remove('hide');
                costBlock.classList.remove('hide');
                let value = parseInt(seedInput.value, 10);
                if (isNaN(value) || value < 1) value = 0;
                if (value > 100) value = 100;
                seedInput.value = value; // Ограничиваем значение в input
                costValue.textContent = (value * 1000) + ' ₽';
            }
        });
    });

    // Расчет стоимости для первого блока
    seedInput.addEventListener('input', function() {
        if (gblocks[0].classList.contains('selected')) {
            let value = parseInt(this.value, 10);
            if (isNaN(value) || value < 1) value = 0;
            if (value > 100) value = 100;
            this.value = value; // Ограничиваем значение в input
            costValue.textContent = (value * 1000) + ' ₽';
        }
    });
});