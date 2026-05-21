let habits = [];

function loadHabits() {
    const saved = localStorage.getItem('habits');
    if (saved) {
        habits = JSON.parse(saved);
    } else {
        habits = [
            { id: 1, name: 'Привычка 1', completed: false },
            { id: 2, name: 'Привычка 2', completed: false },
            { id: 3, name: 'Привычка 3', completed: false }
        ];
    }
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabitsList() {
    const container = document.getElementById('habits-list');
    if (!container) return;

    if (habits.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">Нет привычек. Добавьте первую!</p>';
        return;
    }

    container.innerHTML = '';
    habits.forEach(habit => {
        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'habit-checkbox';
        checkbox.checked = habit.completed;
        checkbox.onchange = () => toggleHabit(habit.id);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'habit-name';
        nameSpan.textContent = habit.name;
        if (habit.completed) nameSpan.classList.add('completed');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteHabit(habit.id);

        habitDiv.appendChild(checkbox);
        habitDiv.appendChild(nameSpan);
        habitDiv.appendChild(deleteBtn);
        container.appendChild(habitDiv);
    });
}

function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completed = !habit.completed;
        saveHabits();
        renderHabitsList();
        updateCurrentDate();
    }
}

function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveHabits();
    renderHabitsList();
    updateCurrentDate();
}

function updateCurrentDate() {
    const dateDiv = document.getElementById('current-date');
    if (dateDiv) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDiv.innerHTML = `<p style="margin-bottom: 15px; color: #666;">📅 ${today.toLocaleDateString('ru-RU', options)}</p>`;
    }
}

function setupAddHabitForm() {
    const addBtn = document.getElementById('add-btn');
    if (!addBtn) return;
    
    addBtn.addEventListener('click', function() {
        const nameInput = document.getElementById('habit-name');
        const name = nameInput.value.trim();
        
        if (name === '') {
            alert('Введите название привычки');
            return;
        }
        
        const newId = Date.now();
        habits.push({
            id: newId,
            name: name,
            completed: false
        });
        saveHabits();
        
        nameInput.value = '';
        alert('Привычка добавлена!');
        
        window.location.href = 'index.html';
    });
}

function renderStats() {
    const progressFill = document.getElementById('progress-fill');
    const statsText = document.getElementById('stats-text');

    if (!progressFill) return;

    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';

    statsText.textContent = `Выполнено ${completed} из ${total} привычек`;
}

function init() {
    loadHabits();

    const path = window.location.pathname;

    if (path.includes('index.html') || path.endsWith('/habit-tracker/') || path.endsWith('/')) {
        updateCurrentDate();
        renderHabitsList();
    } else if (path.includes('add-habit.html')) {
        setupAddHabitForm();
    } else if (path.includes('stats.html')) {
        renderStats();
    }
}

document.addEventListener('DOMContentLoaded', init)
