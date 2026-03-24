// ===== BOLSA DE EMPLEO - INDUSALCA =====
// Almacenamiento en localStorage

const STORAGE_KEY = 'indusalca_vacantes';
const ADMIN_PASS = 'rrhh2026';  // Contraseña para el panel de RRHH

// Vacantes de ejemplo iniciales
const VACANTES_DEMO = [
    {
        id: 1,
        titulo: 'Operador de Planta',
        area: 'produccion',
        modalidad: 'Presencial',
        ubicacion: 'Edo. Zulia',
        descripcion: 'Responsable de operar y supervisar los equipos de la planta recristalizadora, garantizando el cumplimiento de los estándares de calidad y seguridad industrial.',
        requisitos: 'TSU o Técnico en Química Industrial / Procesos Industriales. Experiencia mínima 1 año en plantas de producción.',
        fecha: '2026-03-01'
    },
    {
        id: 2,
        titulo: 'Analista de Calidad',
        area: 'calidad',
        modalidad: 'Presencial',
        ubicacion: 'Edo. Zulia',
        descripcion: 'Ejecutar análisis físico-químicos de los productos terminados y materias primas, asegurando el cumplimiento de las normas ISO 9001, HACCP y BPF.',
        requisitos: 'Licenciado en Química o Ingeniería Química. Conocimiento de normas ISO. Experiencia mínima 2 años.',
        fecha: '2026-03-05'
    },
    {
        id: 3,
        titulo: 'Ejecutivo de Ventas Industrial',
        area: 'ventas',
        modalidad: 'Híbrido',
        ubicacion: 'Caracas / Nacional',
        descripcion: 'Gestionar y desarrollar la cartera de clientes del sector industrial, petrolero y agroindustrial. Cumplimiento de metas comerciales y seguimiento postventa.',
        requisitos: 'Licenciado en Administración, Mercadeo o carrera afín. Experiencia mínima 2 años en ventas B2B. Vehículo propio.',
        fecha: '2026-03-10'
    }
];

// ===== INICIALIZACIÓN =====
function initVacantes() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(VACANTES_DEMO));
    }
    renderVacantes();
    initFiltros();
}

// ===== RENDER VACANTES =====
function getVacantes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveVacantes(vacantes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vacantes));
}

const AREA_LABELS = {
    produccion: 'Producción',
    administracion: 'Administración',
    ventas: 'Ventas',
    logistica: 'Logística',
    rrhh: 'Recursos Humanos',
    calidad: 'Calidad',
    mantenimiento: 'Mantenimiento',
    otro: 'Otro'
};

function formatFecha(fechaStr) {
    const d = new Date(fechaStr + 'T00:00:00');
    return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' });
}

function renderVacantes(filtroTexto = '', filtroArea = '') {
    const lista = document.getElementById('vacantes-lista');
    const sinVacantes = document.getElementById('sin-vacantes');
    if (!lista) return;

    let vacantes = getVacantes();

    if (filtroTexto) {
        const q = filtroTexto.toLowerCase();
        vacantes = vacantes.filter(v =>
            v.titulo.toLowerCase().includes(q) ||
            v.descripcion.toLowerCase().includes(q)
        );
    }
    if (filtroArea) {
        vacantes = vacantes.filter(v => v.area === filtroArea);
    }

    if (vacantes.length === 0) {
        lista.innerHTML = '';
        sinVacantes.classList.remove('hidden');
        return;
    }

    sinVacantes.classList.add('hidden');
    lista.innerHTML = vacantes.map(v => `
        <div class="vacante-card" data-id="${v.id}">
            <div class="vacante-card-header">
                <div class="vacante-titulo">${v.titulo}</div>
                <span class="vacante-area-tag">${AREA_LABELS[v.area] || v.area}</span>
            </div>
            <p class="vacante-descripcion">${v.descripcion}</p>
            <div class="vacante-meta">
                <div class="vacante-meta-item"><i class="fas fa-map-marker-alt"></i> ${v.ubicacion}</div>
                <div class="vacante-meta-item"><i class="fas fa-laptop-house"></i> ${v.modalidad}</div>
            </div>
            <div class="vacante-card-footer">
                <span class="vacante-fecha"><i class="fas fa-calendar-alt"></i> Publicado: ${formatFecha(v.fecha)}</span>
                <button class="btn-aplicar" onclick="abrirFormulario(${v.id})">
                    <i class="fas fa-paper-plane"></i> Aplicar
                </button>
            </div>
        </div>
    `).join('');
}

function initFiltros() {
    const inputBuscar = document.getElementById('buscar-vacante');
    const selectArea = document.getElementById('filtro-area');
    if (!inputBuscar) return;

    inputBuscar.addEventListener('input', () => {
        renderVacantes(inputBuscar.value, selectArea.value);
    });
    selectArea.addEventListener('change', () => {
        renderVacantes(inputBuscar.value, selectArea.value);
    });
}

// ===== FORMULARIO APLICAR =====
function abrirFormulario(vacanteId) {
    const modal = document.getElementById('modal-aplicar');
    const titulo = document.getElementById('modal-cargo-titulo');
    const areaTag = document.getElementById('modal-cargo-area');
    const campoId = document.getElementById('campo-cargo-id');

    if (vacanteId) {
        const v = getVacantes().find(x => x.id === vacanteId);
        if (v) {
            titulo.textContent = `Aplicar: ${v.titulo}`;
            areaTag.textContent = AREA_LABELS[v.area] || v.area;
            campoId.value = v.id;
        }
    } else {
        titulo.textContent = 'Enviar CV Espontáneo';
        areaTag.textContent = 'Candidatura espontánea';
        campoId.value = '';
    }

    document.getElementById('form-aplicar').reset();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarFormulario() {
    document.getElementById('modal-aplicar').classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-aplicar');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('ap-nombre').value.trim();
        const cedula = document.getElementById('ap-cedula').value.trim();
        const email = document.getElementById('ap-email').value.trim();
        const telefono = document.getElementById('ap-telefono').value.trim();
        const educacion = document.getElementById('ap-educacion').value;
        const experiencia = document.getElementById('ap-experiencia').value.trim();

        if (!nombre || !cedula || !email || !telefono || !educacion || !experiencia) {
            mostrarNotif('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }

        // Aquí se podría enviar a un backend. Por ahora simulamos éxito.
        cerrarFormulario();
        mostrarNotif('¡Aplicación enviada con éxito! Nos pondremos en contacto contigo pronto.', 'success');
    });
});

// ===== PANEL ADMIN =====
let adminAutenticado = false;

function abrirAdmin() {
    document.getElementById('modal-admin').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderAdminBody();
}

function cerrarAdmin() {
    document.getElementById('modal-admin').classList.add('hidden');
    document.body.style.overflow = '';
}

function renderAdminBody() {
    const body = document.getElementById('admin-body');
    if (!adminAutenticado) {
        body.innerHTML = `
            <div class="admin-login">
                <h4><i class="fas fa-lock"></i> Acceso restringido - RRHH</h4>
                <div class="form-group" style="max-width:280px;margin:0 auto 1rem;">
                    <label>Contraseña</label>
                    <input type="password" id="admin-pass-input" placeholder="Ingresa la contraseña"
                        onkeydown="if(event.key==='Enter') verificarAdmin()">
                </div>
                <button class="btn btn-primary" onclick="verificarAdmin()">
                    <i class="fas fa-sign-in-alt"></i> Ingresar
                </button>
                <p id="admin-error" style="color:#c0392b;font-size:0.85rem;margin-top:0.8rem;display:none;">
                    Contraseña incorrecta.
                </p>
            </div>`;
        setTimeout(() => document.getElementById('admin-pass-input')?.focus(), 100);
    } else {
        renderAdminPanel();
    }
}

function verificarAdmin() {
    const input = document.getElementById('admin-pass-input');
    if (input.value === ADMIN_PASS) {
        adminAutenticado = true;
        renderAdminPanel();
    } else {
        document.getElementById('admin-error').style.display = 'block';
        input.value = '';
        input.focus();
    }
}

function renderAdminPanel(editandoId = null) {
    const body = document.getElementById('admin-body');
    const vacantes = getVacantes();

    let listaHTML = vacantes.length === 0
        ? '<p style="color:#888;text-align:center;padding:1rem;">No hay vacantes registradas.</p>'
        : vacantes.map(v => `
            <div class="admin-vacante-item">
                <div class="admin-vacante-info">
                    <strong>${v.titulo}</strong>
                    <span>${AREA_LABELS[v.area] || v.area} · ${v.ubicacion} · ${formatFecha(v.fecha)}</span>
                </div>
                <div class="admin-vacante-actions">
                    <button class="btn-admin-edit" onclick="renderAdminPanel(${v.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-admin-del" onclick="eliminarVacante(${v.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`).join('');

    const editando = editandoId ? vacantes.find(v => v.id === editandoId) : null;
    const formHTML = renderFormAdmin(editando);

    body.innerHTML = `
        <div class="admin-panel-header">
            <h4><i class="fas fa-list"></i> Vacantes activas (${vacantes.length})</h4>
            <button class="btn-nueva-vacante" onclick="renderAdminPanel(0)">
                <i class="fas fa-plus"></i> Nueva Vacante
            </button>
        </div>
        <div style="max-height:220px;overflow-y:auto;margin-bottom:1.5rem;">${listaHTML}</div>
        ${editandoId !== null ? formHTML : ''}
        <div style="text-align:right;margin-top:1rem;">
            <button class="btn btn-secondary" onclick="cerrarAdmin()" style="font-size:0.85rem;">
                <i class="fas fa-sign-out-alt"></i> Cerrar sesión
            </button>
        </div>`;
}

function renderFormAdmin(vacante = null) {
    const isEdit = vacante && vacante.id;
    const v = vacante || { titulo: '', area: '', modalidad: 'Presencial', ubicacion: '', descripcion: '', requisitos: '', fecha: new Date().toISOString().split('T')[0] };
    const areas = ['produccion', 'administracion', 'ventas', 'logistica', 'rrhh', 'calidad', 'mantenimiento', 'otro'];

    return `
        <div class="admin-form-vacante">
            <h5><i class="fas fa-${isEdit ? 'edit' : 'plus-circle'}"></i> ${isEdit ? 'Editar vacante' : 'Nueva vacante'}</h5>
            <div class="form-row">
                <div class="form-group">
                    <label>Cargo / Título *</label>
                    <input type="text" id="adm-titulo" value="${v.titulo}" placeholder="Ej: Analista de Calidad">
                </div>
                <div class="form-group">
                    <label>Área *</label>
                    <select id="adm-area">
                        ${areas.map(a => `<option value="${a}" ${v.area === a ? 'selected' : ''}>${AREA_LABELS[a]}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Modalidad</label>
                    <select id="adm-modalidad">
                        ${['Presencial','Remoto','Híbrido'].map(m => `<option ${v.modalidad === m ? 'selected' : ''}>${m}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Ubicación</label>
                    <input type="text" id="adm-ubicacion" value="${v.ubicacion}" placeholder="Ej: Edo. Zulia">
                </div>
            </div>
            <div class="form-group">
                <label>Descripción del cargo *</label>
                <textarea id="adm-descripcion" rows="3" placeholder="Describe las responsabilidades del cargo...">${v.descripcion}</textarea>
            </div>
            <div class="form-group">
                <label>Requisitos</label>
                <textarea id="adm-requisitos" rows="2" placeholder="Formación, experiencia, habilidades...">${v.requisitos}</textarea>
            </div>
            <div class="form-group">
                <label>Fecha de publicación</label>
                <input type="date" id="adm-fecha" value="${v.fecha}">
            </div>
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="renderAdminPanel()">Cancelar</button>
                <button class="btn btn-primary" onclick="guardarVacante(${isEdit ? v.id : 'null'})">
                    <i class="fas fa-save"></i> ${isEdit ? 'Guardar cambios' : 'Publicar vacante'}
                </button>
            </div>
        </div>`;
}

function guardarVacante(id) {
    const titulo = document.getElementById('adm-titulo').value.trim();
    const area = document.getElementById('adm-area').value;
    const modalidad = document.getElementById('adm-modalidad').value;
    const ubicacion = document.getElementById('adm-ubicacion').value.trim();
    const descripcion = document.getElementById('adm-descripcion').value.trim();
    const requisitos = document.getElementById('adm-requisitos').value.trim();
    const fecha = document.getElementById('adm-fecha').value;

    if (!titulo || !descripcion) {
        mostrarNotif('El título y la descripción son obligatorios.', 'error');
        return;
    }

    const vacantes = getVacantes();

    if (id) {
        const idx = vacantes.findIndex(v => v.id === id);
        if (idx !== -1) {
            vacantes[idx] = { ...vacantes[idx], titulo, area, modalidad, ubicacion, descripcion, requisitos, fecha };
        }
    } else {
        const newId = vacantes.length > 0 ? Math.max(...vacantes.map(v => v.id)) + 1 : 1;
        vacantes.push({ id: newId, titulo, area, modalidad, ubicacion, descripcion, requisitos, fecha });
    }

    saveVacantes(vacantes);
    renderVacantes();
    renderAdminPanel();
    mostrarNotif(id ? 'Vacante actualizada correctamente.' : 'Vacante publicada correctamente.', 'success');
}

function eliminarVacante(id) {
    if (!confirm('¿Eliminar esta vacante?')) return;
    const vacantes = getVacantes().filter(v => v.id !== id);
    saveVacantes(vacantes);
    renderVacantes();
    renderAdminPanel();
    mostrarNotif('Vacante eliminada.', 'info');
}

// ===== NOTIFICACIONES =====
function mostrarNotif(msg, tipo = 'info') {
    const colores = { success: '#27ae60', error: '#c0392b', info: '#2c5aa0' };
    const iconos = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    const notif = document.createElement('div');
    notif.style.cssText = `
        position:fixed;top:100px;right:20px;background:${colores[tipo]};color:#fff;
        padding:1rem 1.5rem;border-radius:12px;box-shadow:0 8px 25px rgba(0,0,0,0.2);
        z-index:99999;transform:translateX(420px);transition:transform 0.3s ease;
        max-width:360px;font-family:'Poppins',sans-serif;font-size:0.9rem;
        display:flex;align-items:center;gap:0.8rem;`;
    notif.innerHTML = `<i class="fas fa-${iconos[tipo]}"></i><span>${msg}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.style.transform = 'translateX(0)', 50);
    setTimeout(() => {
        notif.style.transform = 'translateX(420px)';
        setTimeout(() => notif.remove(), 350);
    }, 4500);
}

// Cerrar modales con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        cerrarFormulario();
        cerrarAdmin();
    }
});

// Cerrar al click fuera del modal
document.addEventListener('click', e => {
    if (e.target.id === 'modal-aplicar') cerrarFormulario();
    if (e.target.id === 'modal-admin') cerrarAdmin();
});

// Init
document.addEventListener('DOMContentLoaded', initVacantes);
