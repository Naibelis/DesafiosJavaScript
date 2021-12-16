class ServicioCanino {
  constructor(turno, precio, esExtento, tipo) {
    this.turno = turno;
    this.precio = parseFloat(precio);
    this.esExtento = esExtento;
    this.tipo = tipo;
  }

  sumarIva() {
    if (this.esExtento.toLowerCase() == "si") {
      this.precio = this.precio * 1.21;
    }
  }

  imprimir(carrito) {
    const titulo = document.createElement("h2");
    const datosIva = document.createElement("p");
    const datosTurno = document.createElement("p");
    titulo.innerHTML = ` SERVICIOS CANINOS: ${this.tipo.toUpperCase()} `;
    datosIva.innerHTML = `El precio con IVA (si no está exento) es: ${this.precio}`;
    datosTurno.innerHTML = `El turno en que se prestará el servicio: ${this.turno}`;
    carrito.appendChild(titulo);
    carrito.appendChild(datosIva);
    carrito.appendChild(datosTurno);
  }
}

//Declaramos un array de productos para almacenar objetos
const agregar = () => {
  const llenarArreglo = (cosa) => {
    const cant = prompt("Indique cuantos servicios va a registrar: ");

    for (let i = 0; i < cant; i++) {
      const tipoServicio = prompt(
        "Indique el tipo de servicio: (Curso/Paseo/Adiestramiento)"
      );
      const turno = prompt(
        "Indique el turno en que se prestará el servicio: (Mañana/Tarde/Noche)"
      );
      const precio = parseInt(prompt("Indique el precio del sercicio: "));
      const esExento = prompt(
        "¿El servicio lleva IVA? (indique escribiendo 'si' o 'no')"
      );

      cosa.push(new ServicioCanino(turno, precio, esExento, tipoServicio));
    }
  };

  let ServiciosCaninos = [];
  alert(
    `Carrito de compras(beta):
            Inicialmente este programa solo recibe items y calcula el IVA de los mismos.
            En las proximas pantallas podrá ingresar la cantidad de productos
            que tiene el carrito y poder calcular el precio final de cada uno con el IVA`
  );
  llenarArreglo(ServiciosCaninos);

  ServiciosCaninos = ServiciosCaninos.sort((a, b) => {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }
    return 0;
  });

  const carrito = document.createElement("div");
  for (const ServicioCanino of ServiciosCaninos) {
    ServicioCanino.sumarIva();
    ServicioCanino.imprimir(carrito);
  }

  alert(`Se ha impreso la información ingresada`);

  document.body.appendChild(carrito);
  const cantidadCarrito = document.getElementById("cantidadCarrito");
  cantidadCarrito.innerHTML = ServiciosCaninos.length;
};

const botonAgregarItems = document.getElementById("agregarItems");
botonAgregarItems.addEventListener("click", agregar);

const nombreCliente = document.getElementById("nombreCliente");
const clienteInput = document.getElementById("cliente");

clienteInput.addEventListener("change", (e) => {
  nombreCliente.innerHTML = e.target.value;
});

const servicios = [
  {
    nombre: "Curso",
    precio: 1500,
  },
  {
    nombre: "Paseo",
    precio: 2000,
  },
  {
    nombre: "Adiestramiento",
    precio: 3500,
  },
];

const serviciosDisponibles = document.getElementById("serviciosDisponibles");
const mostrarSercicios = document.getElementById("mostrarServicios");
mostrarSercicios.addEventListener("click", () => {
  servicios.forEach((value, indice) => {
    const contenedor = document.createElement("div");

    const nombre = document.createElement("h3");
    nombre.innerHTML = value.nombre;

    const precio = document.createElement("p");
    precio.innerHTML = `Precio: ${value.precio}`;

    contenedor.appendChild(nombre);
    contenedor.appendChild(precio);

    serviciosDisponibles.appendChild(contenedor);
  });
});
