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

    showResult: (result, name) => {
        const resDogName = document.getElementById('res-dog-name');
        const resDailyGrams = document.getElementById('res-daily-grams');
        const resMonthlyKgs = document.getElementById('res-monthly-kgs');

        if (!result || typeof result.total === 'undefined') {
            ui.showAlert('Ocurrió un error calculando el resultado. Revisá los datos e intentá de nuevo.');
            return;
        }

        resDogName.innerText = `🐶 ${name} debe comer por día`;
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
    }
};

document.getElementById('btn-alert-close').addEventListener('click', ui.closeAlert);