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

  imprimir() {
    const container = $("<div></div>").append(
      `<h2>SERVICIOS CANINOS: ${this.tipo.toUpperCase()}</h2>
      <p>El precio con IVA (si no está exento) es: ${this.precio}</p>
      <p>El turno en que se prestará el servicio: ${this.turno}</p>`
    );

    $("#itemsCarrito").append(container);
  }
}

//Declaramos un array de productos para almacenar objetos
const agregar = (e) => {
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

  for (const ServicioCanino of ServiciosCaninos) {
    ServicioCanino.sumarIva();
    ServicioCanino.imprimir();
  }

  alert(`Se ha impreso la información ingresada`);

  $("#cantidadCarrito").text(ServiciosCaninos.length);
};

$("#agregarItems").on("click", agregar);

$("#cliente").on("change", (e) => {
  $("#nombreCliente").text(e.target.value);
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

$("#mostrarServicios").on("click", (e) => {
  servicios.forEach((value, indice) => {
    const contenedor = $("<div></div>").append(`
      <h3>${value.nombre}</h3>
      <p>Precio: ${value.precio}</p>
      `);

    $("#servicios").append(contenedor);
  });

  e.target.innerText = "Ocultar";
  $("#servicios")
    .slideDown("fast")
    .delay(2000)
    .slideUp("fast", () => {
      e.target.innerText = "Mostrar";
      $("#servicios").html("");
    });
});
