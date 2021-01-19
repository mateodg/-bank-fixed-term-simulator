//Clases 
class PlazoFijo{
    constructor(monedaSeleccionada, cantidad, plazoSeleccionado){
        this.moneda = monedaSeleccionada;
        this.cantidad = cantidad;
        this.plazoSeleccionado = plazoSeleccionado;
    }
    cotizarplazo(){
        let cantidadPlazo;
        switch (this.moneda) {
            case "1":
                cantidadPlazo = this.cantidad*1;                
                break;
            case "2":
                cantidadPlazo = this.cantidad*74;
                break;
            case "3":
                cantidadPlazo = this.cantidad*80;
                break;
            case "4":
                cantidadPlazo = this.cantidad*0.65;
                break;
        }
        // Leer Plazo
        let plazo
        switch (this.plazoSeleccionado) {
            case "1" :
                cantidadPlazo  =  cantidadPlazo + cantidadPlazo *  0.0252;
                
                break;
            case "2":
                cantidadPlazo = cantidadPlazo + cantidadPlazo *0.075;
                
                break;
            case "3":
                cantidadPlazo = cantidadPlazo + cantidadPlazo* 0.15;
                
                break;
            case "4":
                cantidadPlazo = cantidadPlazo + cantidadPlazo* 0.3;
               
                break; 
        }
        return cantidadPlazo
        
        
    }
}
class Interfaz{
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('#form-group'));
        setTimeout(function () {
            document.querySelector('.mensaje').remove();
        },3000);
    }
    mostrarResultado(plazoFijo, total){
        const resultado = document.querySelector('resultado div');
        let moneda;
        switch (plazoFijo.moneda) {
            case '1' :
                    moneda = "Pesos";
                break;
            case '2' :
                    moneda = "Dolares";
                break;
            case '3' :
                    moneda ="Euros";
                break;
            case '4' :
                    moneda ="Yenes";
                break;
        }
        let plazoSeleccionado;
        switch (plazoFijo.plazoSeleccionado) {
            case '1' :
                plazoSeleccionado = "1 Mes";
                break;
            case '2' :
                plazoSeleccionado = "3 Meses";
                break;
            case '3' :
                plazoSeleccionado ="6 Meses";
                break;
            case '4' :
                plazoSeleccionado ="1 Año";
                break;
        }
        
        
        //Creamos el div
        const div = document.createElement('div');
        //Insertar la info
        div.innerHTML = 
        `   <h2 class="headerPlazo">Resumen de tu Plazo Fijo:</h2>
            <p class="resultado-parrafo">Moneda : ${moneda}</p>
            <p class="resultado-parrafo">Cantidad : $${plazoFijo.cantidad}</p>
            <p class="resultado-parrafo">Plazo : ${plazoSeleccionado}</p>
            <p class="resultado-parrafo">Total a recibir: $${total}</p>
            <p class="resultado-parrafo lead">Valor Final expresado en pesos argentinos 01/07/2020</p>`;
            setTimeout(function() {
                formulario.insertBefore(div, document.querySelector('#resultado div'));
           }, 3000);
    }
}

//Variables
const formulario = document.getElementById('cotizar-plazo-fijo');
//EventListeners
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //Leer los datos
    const moneda = document.getElementById('moneda');
    const monedaSeleccionada = moneda.options[moneda.selectedIndex].value;
    const cantidad = document.getElementById('cantidad').value;
    const plazo = document.getElementById('plazo');
    const plazoSeleccionado = plazo.options[plazo.selectedIndex].value
    // instancia de clase
    const interfaz = new Interfaz();
    // Condicionamos para mostrar el mensaje
    if (monedaSeleccionada === '' || cantidad === '' || plazoSeleccionado === '') {
        interfaz.mostrarMensaje('Faltan datos, revisa tu formulario', 'error')
    } else {
        const resultados = document.getElementById('resultado');
        if (resultados != null) {
            resultados.remove();
        }
        const plazofijo = new PlazoFijo(monedaSeleccionada, cantidad, plazoSeleccionado);
        const cantidades = plazofijo.cotizarplazo();
        interfaz.mostrarResultado(plazofijo, cantidades);
        interfaz.mostrarMensaje('Cotizando...', 'Exito');
    }
});