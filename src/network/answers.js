// Estandarización de respuestas de la API

//Formatos de respuesta

// Respuestas de éxito

exports.success = function (req, res, mensaje = " ", status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    });
}

// Respuestas de error

exports.error = function (req, res, mensaje = "Internal Error", status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    });
}