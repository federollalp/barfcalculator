import { ui } from './ui.js';
import { calculateBarf } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.showInitialPopUp();
    document.getElementById('btn-accept-disclaimer').addEventListener('click', () => ui.closeInitialPopUp());

    const select = document.getElementById("age");
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i; 
        select.appendChild(option);
    }
    
    select.addEventListener("change", () => {
        const age = parseInt(select.value);
        if (age >= 8) {
            document.getElementById("caldoHuesos").classList.add("show-caldo");
            ui.scrollA('caldoHuesos');
        } else {
            document.getElementById("caldoHuesos").classList.remove("show-caldo");
        }
    });
    
    document.getElementById('btn-step-1').addEventListener('click', () => {
        if (select.value !== "") ui.changeStep('step-1', 'step-2');
        else ui.showAlert("Por favor, seleccioná la edad del perro.");
    });

    document.getElementById('btn-step-2').addEventListener('click', () => {
        if (document.getElementById('weight').value > 0) ui.changeStep('step-2', 'step-3');
        else ui.showAlert("Por favor, ingresá un peso válido.");
    });

    document.getElementById('btn-step-3').addEventListener('click', () => {
        if (document.getElementById('physical-condition').value !== "") ui.changeStep('step-3', 'step-4');
        else ui.showAlert("Por favor, seleccioná la condición física.");
    });

    document.getElementById('btn-step-4').addEventListener('click', () => {
        if (document.getElementById('life-style').value !== "") ui.changeStep('step-4', 'step-5');
        else ui.showAlert("Por favor, seleccioná el estilo de vida.");
    });

    document.getElementById('btn-calculate').addEventListener('click', () => {
        const data = ui.getData();
        if (data.name !== "") {
            const result = calculateBarf(data);
            ui.showResult(result, data.name);
        } else {
            ui.showAlert("Por favor, ingresar un nombre válido.");
        }
    });

    document.getElementById('btn-back-2').addEventListener('click', () => ui.changeStep('step-2', 'step-1'));
    document.getElementById('btn-back-3').addEventListener('click', () => ui.changeStep('step-3', 'step-2'));
    document.getElementById('btn-back-4').addEventListener('click', () => ui.changeStep('step-4', 'step-3'));
    document.getElementById('btn-back-5').addEventListener('click', () => ui.changeStep('step-5', 'step-4'));
    document.getElementById('btn-back-result').addEventListener('click', () => ui.changeStep('step-result', 'step-5'));

    document.getElementById('btn-reset').addEventListener('click', () => {
        window.location.href = 'https://federollalp.github.io/barfcalculator/';
    });

    const setupSelection = (selector, hiddenInputId, infoBoxId, infoContentId, texts, btnToDisableId = null) => {
        const options = document.querySelectorAll(selector);
        const nextBtn = btnToDisableId ? document.getElementById(btnToDisableId) : null;

        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                const val = option.getAttribute('data-value');
                document.getElementById(hiddenInputId).value = val;

                if (val === 'verySlow') {
                    document.getElementById(infoContentId).innerHTML = `<p>⚠️ Se sugiere realizar consulta con veterinario.</p>`;
                    document.getElementById(infoBoxId).classList.add('show-info');
                    if (nextBtn) nextBtn.disabled = true;
                    ui.scrollA(infoBoxId);
                } else {
                    if (nextBtn) nextBtn.disabled = false;
                    if(texts && texts[val]) {
                        document.getElementById(infoContentId).innerHTML = texts[val];
                        document.getElementById(infoBoxId).classList.add('show-info');
                        ui.scrollA(infoBoxId);
                    } else {
                        document.getElementById(infoBoxId).classList.remove('show-info');
                    }
                }
            });
        });
    };
    setupSelection('.condition-option', 'physical-condition', 'condition-info', 'condition-info-content', null, 'btn-step-3');
    
    setupSelection('.activity-option', 'life-style', 'activity-info', 'info-content', {
        lowActivity: `<h3>Baja</h3><ul><li>Perro senior.</li><li>Hace poco ejercicio.</li><li>Sedentarismo.</li></ul>`,
        normal: `<h3>Normal</h3><ul><li>Paseos regulares.</li><li>Juego moderado.</li></ul>`,
        high: `<h3>Alta</h3><ul><li>Paseos de más de 1 hora.</li><li>Deporte leve.</li></ul>`,
        veryHigh: `<h3>Muy Alta</h3><ul><li>Perros competidores.</li><li>Consulta nutricional sugerida.</li></ul>`
    }, 'btn-step-4');

});
