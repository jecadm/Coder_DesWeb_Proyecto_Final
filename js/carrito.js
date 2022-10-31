
document.addEventListener('DOMContentLoaded', () => {

    // Variables


    
    const baseDeDatos = [
        {
            id: 1,
            aos: 'fade-right',
            nombre: 'Escalera deco Bali',
            precio: 456.00,
            imagen: './img/deco/decoV1.jpg',
            des: 'decolor rojo'
        },
        {
            id: 2,
            aos: 'flip-left',
            nombre: 'Jarrón Marruecos',
            precio: 7686.00,
            imagen: './img/deco/decoV2.jpg',
            des: 'decolor rojo'
        },
        {
            id: 3,
            aos: 'flip-right',
            nombre: 'Cuenco Medicci',
            precio: 4588.00,
            imagen: './img/deco/decoV3.jpg',
            des: 'decolor rojo'
        },
        {
            id: 4,
            aos: 'fade-left',
            nombre: 'Mandalas',
            precio: 4687.52,
            imagen: './img/deco/decoV7.jpg',
            des: 'decolor rojo'
        },
        {
            id: 5,
            aos: 'fade-right',
            nombre: 'Banqueta Indú',
            precio: 4558.00,
            imagen: './img/deco/decoV5.jpg',
            des: 'decolor rojo'
        },
        {
            id: 6,
            aos: 'fade-right',
            nombre: 'Vasija Terracota',
            precio: 456.50,
            imagen: './img/deco/decoV9.jpg',
            des: 'decolor rojo'
        },
        {
            id: 7,
            aos: 'fade-right',
            nombre: 'Jarrón Chipre',
            precio: 45158.00,
            imagen: './img/deco/decoV9.jpg',
            des: 'decolor rojo'
        },
        {
            id: 8,
            aos: 'fade-right',
            nombre: 'Vasija Terracota',
            precio: 456.50,
            imagen: './img/deco/decoV10.jpg',
            des: 'decolor rojo'
        }



    ];

    let carrito = [];
    const divisa = ' Pesos Arg';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    // funcion de evento
    

        function avisocarrito() {
         alert ("Se agrego el producto al carrito");
                }
    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('article');
            miNodo.classList.add('card', 'col' );
            miNodo.setAttribute('data-aos', info.aos);
            miNodo.setAttribute('style', 'width: 20rem;')
            // Body
            const miNodoCardBody = document.createElement('article');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h4');
            miNodoTitle.classList.add('card-title', 'text-center');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            //Descripcion
          /*   const miNodoDescript = document.createElement('p');
            miNodoDescript.classList.add('card-text');
            miNodoDescript.textContent = info.des; */
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark', 'textC1');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoBoton.addEventListener("click", avisocarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            /* miNodoCardBody.appendChild(miNodoDescript); */
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);            
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'textC1', 'mx-5', 'btn-dark');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});
