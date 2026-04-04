export const ui = {
    getData: () => {
        return {
            age: document.getElementById('age').value,
            weight: parseFloat(document.getElementById('weight').value),
            condition: document.getElementById('physical-condition').value,
            activityLevel: document.getElementById('life-style').value,
            name: document.getElementById('pet-name').value.trim()
        };
    },

    changeStep: (currentId, nextId) => {
        const current = document.getElementById(currentId);
        const next = document.getElementById(nextId);

        current.style.opacity = '0';
        
        setTimeout(() => {
            current.classList.add('hidden');
            next.classList.remove('hidden');
            next.style.opacity = '0';
            
            setTimeout(() => {
                next.style.opacity = '1';
                next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }, 500);
    },

    showResult: (result, name, isCat) => {
        const resDogName = document.getElementById('res-dog-name');
        const resDailyGrams = document.getElementById('res-daily-grams');
        const resMonthlyKgs = document.getElementById('res-monthly-kgs');
        const animalIcon = isCat ? '😸' : '🐶';

        if (!result || typeof result.total === 'undefined') {
            ui.showAlert('Ocurrió un error calculando el resultado. Revisá los datos e intentá de nuevo.');
            return;
        }

        resDogName.innerText = `${animalIcon} ${name} debe comer por día`;
        resDailyGrams.innerText = `${result.total}g`;

        const monthlyStr = (typeof result.monthly === 'string') ? result.monthly.replace('.', ',') : String(result.monthly).replace('.', ',');
        resMonthlyKgs.innerText = `${monthlyStr} Kgs mensuales`;
        
        ui.changeStep('step-5', 'step-result');
    },

    scrollA: (id) => {
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 500); 
        }
    },

    showAlert: (message) => {
        const overlay = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        alertMessage.innerText = message;
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('show-alert'), 10);
    },

    closeAlert: () => {
        const overlay = document.getElementById('custom-alert');
        overlay.classList.remove('show-alert');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    },

    showInitialPopUp: () => {
        const overlay = document.getElementById('initial-disclaimer');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('show-alert'), 100);
    },

    closeInitialPopUp: () => {
        const overlay = document.getElementById('initial-disclaimer');
        overlay.classList.remove('show-alert');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    },

    changeToCat: (type) => {
        ui.changePhysicalConditionImages(type);
        ui.changeLifeStyleImages(type);
        ui.deleteLifeStyleSelected();
    },

    //Cambio imágenes de Condición Física
    changePhysicalConditionImages: (type) => {
        const step3 = document.getElementById('step-3');
        const options = step3.querySelectorAll('.condition-option');

        const imagesDog = [
            "assets/very-low-condition-dog.png",
            "assets/low-condition-dog.png",
            "assets/normal-condition-dog.png",
            "assets/overweight-condition-dog.png",
            "assets/marked-overweight-condition-dog.png"
        ];

        const imagesCat = [
            "assets/very-low-condition-cat.png",
            "assets/low-condition-cat.png",
            "assets/normal-condition-cat.png",
            "assets/overweight-condition-cat.png",
            "assets/marked-overweight-condition-cat.png"
        ];

        const images = type === 'cat' ? imagesCat : imagesDog;

        options.forEach((option, index) => {
            const img = option.querySelector('img');
            if (img && images[index]) {
                img.src = images[index];
            }
        });
    },

    //Cambio imágenes de Estilo de Vida
    changeLifeStyleImages: (type) => {
        const step4 = document.getElementById('step-4');
        const options = step4.querySelectorAll('.activity-option');
        const grid = step4.querySelector('.activity-grid');

        if (type === 'cat') {
            grid.classList.add('cat-mode');
        } else {
            grid.classList.remove('cat-mode');
        }

        const imagesDog = {
            lowActivity: "assets/low-activity-dog.png",
            normal: "assets/normal-activity-dog.png",
            high: "assets/high-activity-dog.png",
            veryHigh: "assets/very-high-activity-dog.png"
        };

        const imagesCat = {
            lowActivity: "assets/low-activity-cat.png",
            normal: "assets/normal-activity-cat.png",
            high: "assets/high-activity-cat.png"
        };

        const images = type === 'cat' ? imagesCat : imagesDog;

        options.forEach(option => {
            const value = option.dataset.value;
            const img = option.querySelector('img');

            if (type === 'cat' && value === 'veryHigh') {
                option.style.display = 'none';

                option.classList.remove('selected');
                document.getElementById('life-style').value = '';

                return;
            }

            option.style.display = 'flex';

            if (img && images[value]) {
                img.src = images[value];
            }
        });
    },

    deleteLifeStyleSelected: () => {
        document.getElementById('life-style').value = "";

        const options = document.querySelectorAll('.activity-option');
        options.forEach(option => {
            option.classList.remove('selected');
        });

        const infoBox = document.getElementById('activity-info');
        if (infoBox) {
            infoBox.classList.remove('show-info');
        }
    }

};

document.getElementById('btn-alert-close').addEventListener('click', ui.closeAlert);