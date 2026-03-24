// ===== BOLSA DE EMPLEO - INDUSALCA =====
// Para agregar o modificar vacantes, edita el array VACANTES directamente.
// Estructura de cada vacante:
// {
//   id:          número único
//   titulo:      nombre del cargo
//   area:        clave del área (ver AREA_LABELS abajo)
//   modalidad:   'Presencial' | 'Remoto' | 'Híbrido'
//   ubicacion:   texto libre, ej: 'Edo. Zulia'
//   descripcion: descripción del cargo
//   requisitos:  perfil requerido
//   fecha:       'YYYY-MM-DD'
// }

const VACANTES = [
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
    // Agrega más vacantes aquí siguiendo la misma estructura
];

// Etiquetas de área para mostrar en pantalla
const AREA_LABELS = {
    produccion:     'Producción',
    administracion: 'Administración',
    ventas:         'Ventas',
    logistica:      'Logística',
    rrhh:           'Recursos Humanos',
    calidad:        'Calidad',
    mantenimiento:  'Mantenimiento',
    otro:           'Otro'
};

// ===== RENDER =====
function formatFecha(fechaStr) {
    const d = new Date(fechaStr + 'T00:00:00');
    return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' });
}

function renderVacantes(filtroTexto = '', filtroArea = '') {
    const lista = document.getElementById('vacantes-lista');
    const sinVacantes = document.getElementById('sin-vacantes');
    if (!lista) return;

    let vacantes = [...VACANTES];

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
        <div class="vacante-card">
            <div class="vacante-card-header">
                <div class="vacante-titulo">${v.titulo}</div>
                <span class="vacante-area-tag">${AREA_LABELS[v.area] || v.area}</span>
            </div>
            <p class="vacante-descripcion">${v.descripcion}</p>
            ${v.requisitos ? `<p class="vacante-requisitos"><strong>Requisitos:</strong> ${v.requisitos}</p>` : ''}
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
    const selectArea  = document.getElementById('filtro-area');
    if (!inputBuscar) return;

    inputBuscar.addEventListener('input',  () => renderVacantes(inputBuscar.value, selectArea.value));
    selectArea.addEventListener('change', () => renderVacantes(inputBuscar.value, selectArea.value));
}

// ===== FORMULARIO APLICAR =====
function abrirFormulario(vacanteId) {
    const modal   = document.getElementById('modal-aplicar');
    const titulo  = document.getElementById('modal-cargo-titulo');
    const areaTag = document.getElementById('modal-cargo-area');

    const v = VACANTES.find(x => x.id === vacanteId);
    if (v) {
        titulo.textContent  = `Aplicar: ${v.titulo}`;
        areaTag.textContent = AREA_LABELS[v.area] || v.area;
    } else {
        titulo.textContent  = 'Enviar CV Espontáneo';
        areaTag.textContent = 'Candidatura espontánea';
    }

    document.getElementById('form-aplicar').reset();
    document.getElementById('campo-cargo-id').value = vacanteId || '';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarFormulario() {
    document.getElementById('modal-aplicar').classList.add('hidden');
    document.body.style.overflow = '';
}

// ===== ENVÍO DEL FORMULARIO =====
document.addEventListener('DOMContentLoaded', function () {
    // Init
    renderVacantes();
    initFiltros();

    // Submit
    const form = document.getElementById('form-aplicar');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const campos = ['ap-nombre', 'ap-cedula', 'ap-email', 'ap-telefono', 'ap-educacion', 'ap-experiencia'];
        const vacio  = campos.some(id => !document.getElementById(id).value.trim());

        if (vacio) {
            mostrarNotif('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }

        cerrarFormulario();
        mostrarNotif('¡Aplicación enviada con éxito! Nos pondremos en contacto contigo pronto.', 'success');
    });
});

// ===== NOTIFICACIONES =====
function mostrarNotif(msg, tipo = 'info') {
    const colores = { success: '#27ae60', error: '#c0392b', info: '#2c5aa0' };
    const iconos  = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    const notif   = document.createElement('div');
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

// Cerrar modal con Escape o click fuera
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarFormulario(); });
document.addEventListener('click',   e => { if (e.target.id === 'modal-aplicar') cerrarFormulario(); });
