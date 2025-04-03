//Agregamos una mensaje de alerta personalizado usando overlay
function mostrarAlerta(mensaje, tipo = 'error') {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    let alertaContainer = document.createElement("div");
    alertaContainer.id = "mensaje-alerta";
    alertaContainer.className = `mensaje-alerta ${tipo}`;
        alertaContainer.innerHTML = `
            <p>${mensaje}</p>
            <button onclick="cerrarAlerta()">Aceptar</button>
        `;

        document.body.appendChild(alertaContainer);
        overlay.style.display = 'block';
        alertaContainer.classList.add('mostrar');
}

function cerrarAlerta() {
    const alertaContainer = document.getElementById('mensaje-alerta');
    const overlay = document.getElementById('overlay');

    // Primero removemos las clases visuales
    if (alertaContainer) {
        alertaContainer.classList.remove('mostrar');
        alertaContainer.style.opacity = '0';
    }
    
    if (overlay) {
        overlay.style.opacity = '0';
    }

    // Eliminamos los elementos después de la transición
    setTimeout(() => {
        if (alertaContainer && alertaContainer.parentNode) {
            alertaContainer.parentNode.removeChild(alertaContainer);
        }
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

//Obtenemos los elementos que seran validados
let formulario = document.getElementById("formulario");
//Datos:
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let telefono = document.getElementById("telefono");
let email = document.getElementById("correo");
let condiciones = document.getElementById("condiciones");
//Producto:
let producto = document.getElementById("producto");
let plazo = document.getElementById("plazo");
let extras = document.querySelectorAll(".extra");
let total = document.getElementById("total");

formulario.addEventListener("submit", function(e){
    e.preventDefault(); 
    if (validarFormulario()){
        formulario.submit();
    }
});

//Validamos los datos ingresados en el formulario
function validarFormulario(){
    let validNombre = /^[a-zA-Z\s]{1,15}$/;
    let validApellido = /^[a-zA-Z\s]{1,40}$/;
    let validTelefono = /^\d{9}$/;
    let validEmail = /^(.+\@.+\..+)$/;

    if(!validNombre.test(nombre.value)){
        mostrarAlerta("Nombre inválido. Solo debe contener un máximo de 15 caraceres.");
        return false;
    }
    if (!validApellido.test(apellido.value)){
        mostrarAlerta("Apellido inválido. Solo debe contener un máximo de 40 caracteres.");
        return false;
    }
    if (!validTelefono.test(telefono.value)){
        mostrarAlerta("Teléfono inválido. Debe contener 9 dígitos.");
        return false;
    }
    if (!validEmail.test(email.value)){
        mostrarAlerta("Correo inválido.");
        return false;
    }
    if(!condiciones.checked){
        mostrarAlerta("Debe aceptar las condiciones para continuar.");
        return false;
    }
    return true;

    function mostrarAlerta(mensaje, tipo = 'error') {
    // Eliminar alertas previas si existen
    cerrarAlerta();

    let overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    let alertaContainer = document.createElement("div");
    alertaContainer.id = "mensaje-alerta";
    alertaContainer.className = `mensaje-alerta ${tipo}`;
    alertaContainer.innerHTML = `
        <p>${mensaje}</p>
        <button onclick="cerrarAlerta()">Aceptar</button>
    `;

    document.body.appendChild(alertaContainer);
    overlay.style.display = 'block';
    alertaContainer.classList.add('mostrar');
}

function cerrarAlerta() {
    const alertaContainer = document.getElementById('mensaje-alerta');
    const overlay = document.getElementById('overlay');

    // Eliminar elementos inmediatamente si existen
    if (alertaContainer) {
        alertaContainer.remove();
    }
    if (overlay) {
        overlay.remove();
    }

}
}

//Calculamos el presupuesto del producto
function calcularPresupuesto(){
    let precioProducto = parseFloat(producto.value);
    let costoExtra = 0;
    
    //Recorremos cada checkbox de los extras y sumamos los valores seleccionados
    extras.forEach(extra => {
        if (extra.checked){
            costoExtra += parseFloat(extra.value);
        }
    });

    //Aplicamos un descuento según el plazo escogido (por cada 6 meses aplicado se hará un descuento del 20%)
    let descuento = (plazo.value >= 6) ? precioProducto * 0.25 * Math.floor(plazo.value / 6) : 0;

    //Calculamos el total para luego mostramos en pantalla
    let presupuestoTotal = precioProducto + costoExtra - descuento;
    total.textContent = presupuestoTotal.toFixed(2);
}

//Añadimos la función para resetear el formulario
function resetearFormulario () {
    document.getElementById("formulario").reset();
}

//Añadimos eventos para dinamizar el total del presupuesto ante de que el usuario envíe el formulario
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);
extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));
window.addEventListener("load", calcularPresupuesto);

document.querySelector(".enviar").addEventListener("click", calcularPresupuesto);
document.querySelector(".reset").addEventListener("click", resetearFormulario);