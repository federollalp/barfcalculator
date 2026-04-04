import { ui } from './ui.js';
import { calculateBarf as calculateDogBarf } from './dog-calculator.js';
import { calculateBarf as calculateCatBarf } from './cat-calculator.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.showInitialPopUp();
    document.getElementById('btn-accept-disclaimer')
        .addEventListener('click', () => ui.closeInitialPopUp());

    // --- Selector de Edad ---
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

    // --- Navegación ---
    document.getElementById('btn-step-0').addEventListener('click', () => {
        if (document.getElementById('pet-type').value !== "") {
            ui.changeStep('step-0','step-1');
        } else {
            ui.showAlert("Por favor, indicá si tu animal es perro o gato.");
        }
    });

    document.getElementById('btn-step-1').addEventListener('click', () => {
        if (select.value !== "") ui.changeStep('step-1', 'step-2');
        else ui.showAlert("Por favor, seleccioná la edad.");
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
            const isCat = document.getElementById('pet-type').value === 'cat';
            const result = isCat ? calculateCatBarf(data) : calculateDogBarf(data);
            ui.showResult(result, data.name, isCat);
        } else {
            ui.showAlert("Por favor, ingresar un nombre válido.");
        }
    });

    // --- Volver ---
    document.getElementById('btn-back-1').addEventListener('click', () => ui.changeStep('step-1', 'step-0'));
    document.getElementById('btn-back-2').addEventListener('click', () => ui.changeStep('step-2', 'step-1'));
    document.getElementById('btn-back-3').addEventListener('click', () => ui.changeStep('step-3', 'step-2'));
    document.getElementById('btn-back-4').addEventListener('click', () => ui.changeStep('step-4', 'step-3'));
    document.getElementById('btn-back-5').addEventListener('click', () => ui.changeStep('step-5', 'step-4'));
    document.getElementById('btn-back-result').addEventListener('click', () => ui.changeStep('step-result', 'step-5'));

    document.getElementById('btn-reset').addEventListener('click', () => {
        window.location.href = 'https://federollalp.github.io/barfcalculator/';
    });

    // --- Función reutilizable ---
    const setupSelection = (
        selector,
        hiddenInputId,
        infoBoxId = null,
        infoContentId = null,
        texts = null,
        btnToDisableId = null,
        onSelect = null
    ) => {
        const options = document.querySelectorAll(selector);
        const nextBtn = btnToDisableId ? document.getElementById(btnToDisableId) : null;

        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                const val = option.getAttribute('data-value');
                document.getElementById(hiddenInputId).value = val;

                if (onSelect) onSelect(val);

                if (val === 'verySlow') {
                    if (infoContentId) {
                        document.getElementById(infoContentId).innerHTML =
                            `<p>⚠️ Se sugiere realizar consulta con veterinario.</p>`;
                    }
                    if (infoBoxId) {
                        document.getElementById(infoBoxId).classList.add('show-info');
                        ui.scrollA(infoBoxId);
                    }
                    if (nextBtn) nextBtn.disabled = true;
                } else {
                    if (nextBtn) nextBtn.disabled = false;

                    // --- CAMBIO AQUÍ: Evaluamos si texts es función u objeto ---
                    const currentTexts = typeof texts === 'function' ? texts() : texts;

                    if (currentTexts && currentTexts[val]) {
                        if (infoContentId) {
                            document.getElementById(infoContentId).innerHTML = currentTexts[val];
                        }
                        if (infoBoxId) {
                            document.getElementById(infoBoxId).classList.add('show-info');
                            ui.scrollA(infoBoxId);
                        }
                    } else {
                        if (infoBoxId) {
                            document.getElementById(infoBoxId).classList.remove('show-info');
                        }
                    }
                    // --- FIN DEL CAMBIO ---
                }
            });
        });
    };

    // --- Inicialización ---

    // Paso 0 (clave)
    setupSelection('.pet-option', 'pet-type', null, null, null, 'btn-step-0',
        (type) => {
            ui.changeToCat(type);
        }
    );

    // Paso 3
    setupSelection('.condition-option', 'physical-condition', 'condition-info', 'condition-info-content', null, 'btn-step-3');

    // Paso 4
    const dogText = {
        lowActivity: `<h3>Baja</h3><ul><li>Perro senior.</li><li>Hace poco ejercicio.</li><li>Sedentarismo.</li></ul>`,
        normal: `<h3>Normal</h3><ul><li>Paseos regulares.</li><li>Juego moderado.</li></ul>`,
        high: `<h3>Alta</h3><ul><li>Paseos de más de 1 hora.</li><li>Deporte leve.</li></ul>`,
        veryHigh: `<h3>Muy Alta</h3><ul><li>Perros competidores.</li><li>Consulta nutricional sugerida.</li></ul>`
    };

    const catText = {
        lowActivity: `<h3>Baja</h3><ul><li>Gatos mayores, o de poco ejercicio (sedentarios).</li><li>Vive dentro del hogar (indoor).</li><li>Pasa la mayor parte del día durmiendo o descansando.</li><li>Juega poco.</li></ul>`,
        normal: `<h3>Normal</h3><ul><li>Vive dentro del hogar (indoor) pero juega diariamente.</li><li>Episodios de actividad y exploración durante el día.</li><li>Utiliza rascadores, trepa muebles o interactúa con juguetes.</li><li>Vida familiar típica.</li></ul>`,
        high: `<h3>Alta</h3><ul><li>Tiene acceso al exterior (outdoor o semi-outdoor).</li><li>Exploración territorial frecuente.</li><li>Corre, salta, trepa o caza con regularidad.</li><li>Pasa varias horas del día en movimiento.</li></ul>`
    };

    setupSelection('.activity-option', 'life-style', 'activity-info', 'info-content',
        () => document.getElementById('pet-type').value === 'cat' ? catText : dogText, 
        'btn-step-4'
    );

});