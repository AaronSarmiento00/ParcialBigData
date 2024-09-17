// app.js

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los formularios por su ID
    const userForm = document.getElementById('user-form');
    const loginForm = document.getElementById('login-form');

    // Función para obtener usuarios
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://3.208.168.1:5000/usuarios'); // BACKEND DNS
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    // Manejar el envío del formulario de registro
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://3.208.168.1:5000/registro', { // BACKEND DNS
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombres, apellidos, fecha_nacimiento, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Usuario registrado con ID: ${data.id}`);
                fetchUsers(); // Actualizar la lista de usuarios
                userForm.reset(); // Limpiar el formulario
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error en la conexión con el servidor');
        }
    });

    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir la recarga de la página

        const nombres = document.getElementById('login-nombres').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://3.208.168.1:5000/login', { // BACKEND DNS
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombres, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Mostrar mensaje de ingreso exitoso
                // Redirigir después del Login Exitoso
                window.location.href = '/home';
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error en la conexión con el servidor');
        }
    });

    // Función para renderizar usuarios
    const renderUsers = (users) => {
        const userList = document.getElementById('users');
        userList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos usuarios

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.nombres} ${user.apellidos}`;
            userList.appendChild(listItem);
        });
    };

    // Inicializar la lista de usuarios al cargar la página
    fetchUsers();
});
