class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.initializeEventListeners();
    }

    loadUsers() {
        const defaultUsers = {
            admin: [
                {
                    id: 'admin001',
                    email: 'admin@ramco.edu',
                    password: 'admin123',
                    name: 'Administrator',
                    role: 'admin'
                }
            ],
            staff: [
                {
                    id: 'staff001',
                    email: 'principal@ramco.edu',
                    password: 'staff123',
                    name: 'Dr. Principal',
                    role: 'staff'
                },
                {
                    id: 'staff002',
                    email: 'cse.hod@ramco.edu',
                    password: 'staff123',
                    name: 'HOD CSE',
                    role: 'staff'
                }
            ],
            student: [
                {
                    id: 'A1L03001',
                    email: 'student1@ramco.edu',
                    password: 'student123',
                    name: 'John Doe',
                    role: 'student',
                    classroom: 'A1L03'
                },
                {
                    id: 'A1L04001',
                    email: 'student2@ramco.edu',
                    password: 'student123',
                    name: 'Jane Smith',
                    role: 'student',
                    classroom: 'A1L04'
                }
            ]
        };

        return JSON.parse(localStorage.getItem('users')) || defaultUsers;
    }

    loadCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('loginForm').dataset.userType || 'student';
        const remember = document.getElementById('remember')?.checked || false;

        const user = this.authenticateUser(email, password, userType);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            if (remember) {
                localStorage.setItem('lastLogin', email);
                localStorage.setItem('lastUserType', userType);
            }

            this.showToast('Login successful!', 'success');
            setTimeout(() => {
                this.redirectToDashboard(userType);
            }, 800);
        } else {
            this.showToast('Invalid credentials!', 'error');
        }
    }

    authenticateUser(email, password, userType) {
        const users = this.users[userType] || [];
        return users.find(u => 
            (u.email === email || u.id === email) && u.password === password
        );
    }

    redirectToDashboard(userType) {
        switch(userType) {
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'staff':
                window.location.href = 'dashboard.html';
                break;
            case 'student':
                window.location.href = 'dashboard.html';
                break;
            default:
                window.location.href = 'dashboard.html';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser?.role === 'admin';
    }

    isStaff() {
        return this.currentUser?.role === 'staff';
    }

    isStudent() {
        return this.currentUser?.role === 'student';
    }
}

const authSystem = new AuthSystem();
