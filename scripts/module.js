document.addEventListener('DOMContentLoaded', () => {
    const addStudentButton = document.getElementById('addStudentButton');
    const studentsList = document.getElementById('students');
    const moduleTitle = document.getElementById('moduleTitle');
    const dateSelect = document.getElementById('dateSelect');
    const checkClassButton = document.getElementById('checkClassButton');
    const classMessage = document.getElementById('classMessage');
    const generateReportButton = document.getElementById('generateReportButton');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    const closeSpan = document.querySelector('.close');
    let deleteStudentId = null;

    // Function to add a new student
    function addStudent() {
        const studentName = document.getElementById('studentName').value.trim();

        // Validate field
        if (!studentName) {
            alert('Por favor, preencha o nome do aluno.');
            return;
        }

        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);

        const newStudent = {
            id: Date.now(),
            name: studentName,
            attendance: {}
        };

        module.students.push(newStudent);
        localStorage.setItem('superModules', JSON.stringify(superModules));
        displayStudents(module.students);

        // Clear form field
        document.getElementById('studentName').value = '';
    }

    // Function to display students
    function displayStudents(students) {
        studentsList.innerHTML = '';
        students.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${student.name}
                <div class="button-group">
                    <button class="attendance-btn" id="present-${student.id}" disabled>Presença</button>
                    <button class="attendance-btn" id="absent-${student.id}" disabled>Falta</button>
                    <button class="delete-btn" onclick="openDeleteModal(${student.id})"></button>
                </div>
            `;
            studentsList.appendChild(li);
        });
    }

    // Function to open delete modal
    window.openDeleteModal = function(studentId) {
        deleteStudentId = studentId;
        deleteModal.style.display = 'block';
    }

    // Function to close delete modal
    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        deleteStudentId = null;
    }

    // Function to delete a student
    function deleteStudent() {
        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);

        // Remove student from module
        module.students = module.students.filter(student => student.id !== deleteStudentId);
        localStorage.setItem('superModules', JSON.stringify(superModules));
        displayStudents(module.students);

        // Close modal
        closeDeleteModal();
    }

    // Function to load dates for the last 7 days
    function loadLast7Days() {
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const option = document.createElement('option');
            option.value = date.toISOString().split('T')[0];
            option.textContent = date.toLocaleDateString('pt-BR');
            dateSelect.appendChild(option);
        }
    }

    // Function to check if there is a class on the selected date
    function checkClass() {
        const selectedDate = new Date(dateSelect.value);
        const dayOfWeek = selectedDate.getUTCDay(); // Use getUTCDay() to avoid timezone issues

        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if (module.classDays.includes(dayNames[dayOfWeek])) {
            classMessage.textContent = `Há aula no dia ${selectedDate.toLocaleDateString('pt-BR')}.`;
            toggleAttendanceButtons(true);
        } else {
            classMessage.textContent = `Não há aula no dia ${selectedDate.toLocaleDateString('pt-BR')}.`;
            toggleAttendanceButtons(false);
        }
    }

    // Function to toggle attendance buttons
    function toggleAttendanceButtons(active) {
        const buttons = document.querySelectorAll('.attendance-btn');
        buttons.forEach(button => {
            if (active) {
                button.classList.add('active');
                button.disabled = false;
                button.addEventListener('click', markAttendance);
            } else {
                button.classList.remove('active');
                button.disabled = true;
                button.removeEventListener('click', markAttendance);
            }
        });
    }

    // Function to mark attendance
    function markAttendance(event) {
        const button = event.target;
        const [type, studentId] = button.id.split('-');
        const selectedDate = dateSelect.value;

        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);
        const student = module.students.find(stu => stu.id === parseInt(studentId));

        if (!student.attendance[selectedDate]) {
            student.attendance[selectedDate] = {};
        }
        student.attendance[selectedDate] = type === 'present';

        localStorage.setItem('superModules', JSON.stringify(superModules));
        updateAttendanceButtons();
    }

    // Function to update attendance buttons based on attendance data
    function updateAttendanceButtons() {
        const selectedDate = dateSelect.value;

        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);

        module.students.forEach(student => {
            const presentButton = document.getElementById(`present-${student.id}`);
            const absentButton = document.getElementById(`absent-${student.id}`);

            if (student.attendance[selectedDate] === true) {
                presentButton.classList.add('present');
                absentButton.classList.remove('absent');
            } else if (student.attendance[selectedDate] === false) {
                presentButton.classList.remove('present');
                absentButton.classList.add('absent');
            } else {
                presentButton.classList.remove('present');
                absentButton.classList.remove('absent');
            }
        });
    }

    // Function to generate report
    function generateReport() {
        const selectedDate = dateSelect.value;

        // Retrieve the module ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleId = parseInt(urlParams.get('id'), 10);

        // Load data from LocalStorage
        let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
        const module = superModules.find(mod => mod.id === moduleId);

        let reportWindow = window.open('', '_blank');
        reportWindow.document.write('<html><head><title>Relatório de Presença</title>');
        reportWindow.document.write('<style>');
        reportWindow.document.write('body { font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333; padding: 20px; }');
        reportWindow.document.write('h1 { color: #3498db; }');
        reportWindow.document.write('p { font-size: 1.2em; }');
        reportWindow.document.write('table { width: 100%; border-collapse: collapse; }');
        reportWindow.document.write('table, th, td { border: 1px solid #ddd; }');
        reportWindow.document.write('th, td { padding: 10px; text-align: left; }');
        reportWindow.document.write('th { background-color: #3498db; color: white; }');
        reportWindow.document.write('</style>');
        reportWindow.document.write('</head><body>');
        reportWindow.document.write(`<h1>Relatório de Presença - ${module.name}</h1>`);
        reportWindow.document.write(`<p>Data: ${new Date(selectedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>`);
        reportWindow.document.write('<table>');
        reportWindow.document.write('<tr><th>Nome do Aluno</th><th>Presença</th></tr>');
        module.students.forEach(student => {
            const presence = student.attendance[selectedDate] === true ? 'Presente' : 'Ausente';
            reportWindow.document.write(`<tr><td>${student.name}</td><td>${presence}</td></tr>`);
        });
        reportWindow.document.write('</table>');
        reportWindow.document.write('</body></html>');
        reportWindow.document.close();
    }

    // Load and display students on page load
    const urlParams = new URLSearchParams(window.location.search);
    const moduleId = parseInt(urlParams.get('id'), 10);
    let superModules = JSON.parse(localStorage.getItem('superModules')) || [];
    const module = superModules.find(mod => mod.id === moduleId);

    if (module) {
        moduleTitle.textContent = `Gerenciamento do Super Módulo: ${module.name}`;
        displayStudents(module.students);
        loadLast7Days();
        dateSelect.addEventListener('change', updateAttendanceButtons);
    }

    addStudentButton.addEventListener('click', addStudent);
    checkClassButton.addEventListener('click', checkClass);
    generateReportButton.addEventListener('click', generateReport);

    // Modal event listeners
    confirmDeleteButton.addEventListener('click', deleteStudent);
    cancelDeleteButton.addEventListener('click', closeDeleteModal);
    closeSpan.addEventListener('click', closeDeleteModal);

    window.addEventListener('click', (event) => {
        if (event.target == deleteModal) {
            closeDeleteModal();
        }
    });
});
