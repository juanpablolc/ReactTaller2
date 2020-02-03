const elementosCuadros = document.querySelectorAll('.cuadro');
const botonReiniciar = document.querySelector('#botonReiniciar');

const TAMANIO = 3;

const matriz = [];

const inicializar = () => {
    let contador = 0;
    for (let indiceFila = 0; indiceFila < TAMANIO; indiceFila++) {
        matriz[indiceFila] = [];
        for (let indiceColumna = 0; indiceColumna < TAMANIO; indiceColumna++) {
            matriz[indiceFila][indiceColumna] = {
                elemento: elementosCuadros[contador],
                vacio: contador === TAMANIO * TAMANIO - 1
            };
            contador++;
        }
    }
    const clasesCuadros = [
        'imagenSuperiorIzquierda',
        'imagenSuperiorCentral',
        'imagenSuperiorDerecha',
        'imagenCentralIzquierda',
        'imagenCentral',
        'imagenCentralDerecha',
        'imagenInferiorIzquierda',
        'imagenInferiorCentral'
    ];
    matriz.forEach(fila => {
        fila.forEach(celda => {
            celda.elemento.classList = ['cuadro'];
            if (!celda.vacio) {
                const numeroClase = Math.floor(Math.random() * clasesCuadros.length);
                celda.elemento.classList.add(clasesCuadros[numeroClase]);
                clasesCuadros.splice(numeroClase, 1);
            }
        });
    });
};

const alPresionarTecla = evento => {
    if (
        evento.key !== 'ArrowUp' &&
        evento.key !== 'ArrowRight' &&
        evento.key !== 'ArrowDown' &&
        evento.key !== 'ArrowLeft'
    )
        return;
    const informacionCuadroVacio = obtenerInformacionCuadroVacio();
    const esMovimientoValido = validarMovimiento(informacionCuadroVacio, evento.key);
    if (esMovimientoValido) {
        let informacionCuadroContrario;
        switch (evento.key) {
            case 'ArrowUp':
                informacionCuadroContrario = obtenerInformacionCuadro(
                    informacionCuadroVacio.indiceFila + 1,
                    informacionCuadroVacio.indiceColumna
                );
                break;
            case 'ArrowRight':
                informacionCuadroContrario = obtenerInformacionCuadro(
                    informacionCuadroVacio.indiceFila,
                    informacionCuadroVacio.indiceColumna - 1
                );
                break;
            case 'ArrowDown':
                informacionCuadroContrario = obtenerInformacionCuadro(
                    informacionCuadroVacio.indiceFila - 1,
                    informacionCuadroVacio.indiceColumna
                );
                break;
            case 'ArrowLeft':
                informacionCuadroContrario = obtenerInformacionCuadro(
                    informacionCuadroVacio.indiceFila,
                    informacionCuadroVacio.indiceColumna + 1
                );
        }
        const claseCuadroContrario = informacionCuadroContrario.elemento.classList[1];
        const cuadroAnterior = matriz[informacionCuadroContrario.indiceFila][informacionCuadroContrario.indiceColumna];
        const cuadroNuevo = matriz[informacionCuadroVacio.indiceFila][informacionCuadroVacio.indiceColumna];
        cuadroNuevo.elemento.classList.add(claseCuadroContrario);
        cuadroNuevo.vacio = false;
        cuadroAnterior.elemento.classList = ['cuadro'];
        cuadroAnterior.vacio = true;
    }
};

const obtenerInformacionCuadroVacio = () => {
    let informacion;
    matriz.forEach((fila, indiceFila) =>
        fila.forEach((celda, indiceColumna) => {
            if (celda.vacio)
                informacion = {
                    elemento: celda.elemento,
                    indiceFila,
                    indiceColumna
                };
        })
    );
    return informacion;
};

const validarMovimiento = (informacionCuadroVacio, key) => {
    let esMovimientoValido = true;
    switch (key) {
        case 'ArrowUp':
            if (informacionCuadroVacio.indiceFila + 1 > TAMANIO - 1) esMovimientoValido = false;
            break;
        case 'ArrowRight':
            if (informacionCuadroVacio.indiceColumna - 1 < 0) esMovimientoValido = false;
            break;
        case 'ArrowDown':
            if (informacionCuadroVacio.indiceFila - 1 < 0) esMovimientoValido = false;
            break;
        case 'ArrowLeft':
            if (informacionCuadroVacio.indiceColumna + 1 > TAMANIO - 1) esMovimientoValido = false;
    }
    return esMovimientoValido;
};

const obtenerInformacionCuadro = (indiceFila, indiceColumna) => {
    cuadro = matriz[indiceFila][indiceColumna];
    return {
        elemento: cuadro.elemento,
        indiceFila,
        indiceColumna
    };
};

document.addEventListener('keydown', alPresionarTecla);
botonReiniciar.addEventListener('click', inicializar);

inicializar();
