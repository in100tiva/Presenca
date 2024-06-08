document.addEventListener('DOMContentLoaded', () => {
    const superModuleForm = document.getElementById('superModuleForm');
    const modulesList = document.getElementById('modules');
    const addSuperModuleButton = document.getElementById('addSuperModuleButton');

    // Load data from LocalStorage
    let superModules = JSON.parse(localStorage.getItem('superModules')) || [];

    // Function to display super modules
    function displaySuperModules() {
        modulesList.innerHTML = '';
        superModules.forEach(module => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${module.name} <button onclick="openModule(${module.id})">Gerenciar</button>
            `;
            modulesList.appendChild(li);
        });
    }

    // Function to add a new super module
    function addSuperModule() {
        const moduleName = document.getElementById('moduleName').value.trim();
        const startDate = document.getElementById('startDate').value;
        const classDays = Array.from(document.getElementById('classDays').selectedOptions).map(option => option.value);
        const startTime = document.getElementById('startTime').value;

        // Validate fields
        if (!moduleName || !startDate || classDays.length === 0 || !startTime) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const newModule = {
            id: Date.now(),
            name: moduleName,
            startDate,
            classDays,
            startTime,
            students: []
        };

        superModules.push(newModule);
        localStorage.setItem('superModules', JSON.stringify(superModules));
        displaySuperModules();

        // Clear form fields
        document.getElementById('moduleName').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('classDays').selectedIndex = -1;
        document.getElementById('startTime').value = '';
    }

    // Function to open module management page
    window.openModule = function(moduleId) {
        window.location.href = `modules/module.html?id=${moduleId}`;
    }

    addSuperModuleButton.addEventListener('click', addSuperModule);

    // Display super modules on page load
    displaySuperModules();
});
