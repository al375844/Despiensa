db.createCollection('recipes', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['titulo', 'procedimiento', 'tiempo', 'ingredientes', 'puntuaciones'],
                properties: {
                    titulo: {
                        bsonType: 'string',
                        description: 'titulo descriptivo de la receta'
                    },
                    procedimiento: {
                        bsonType: 'string',
                        description: 'descripción detallada del proceso de realización de la receta'
                    },
                    tiempo: {
                        bsonType: 'double',
                        description: 'tiempo en minutos que se tarda en cocinar la receta entera'
                    },
                    ingredientes: {
                        bsonType: 'array',
                        description: 'lista de los ingredientes necesarios',
                        items: {
                            bsonType: 'object',
                            required: ['ingrediente', 'cantidad'],
                            properties: {
                                ingrediente: {
                                    bsonType: 'objectId',
                                    description: 'id del ingrediente necesario'
                                },
                                cantidad: {
                                    bsonType: 'double',
                                    description: 'cantidad necesaria de cada ingrediente'
                                }
                            }
                        }
                    },
                    puntuaciones: {
                        bsonType: 'array',
                        description: 'lista de todas las puntuaciones que ha recibido la receta',
                        items: {
                            bsonType: 'object',
                            required: ['usuario', 'puntuacion', 'comentario'],
                            properties: {
                                usuario: {
                                    bsonType: 'objectId',
                                    description: 'id del usuario que ha realizado el comentario'
                                },
                                puntuacion: {
                                    bsonType: 'double',
                                    description: 'puntuación otorgada a la receta por el usuario que realiza el comentario'
                                },
                                comentario: {
                                    bsonType: 'string',
                                    description: 'comentario realizado por el usuario a la receta'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
)



/*
{
    titulo: "Pollo rebozado a la cocacola",
    procedimiento: "Se reboza el pollo, se fríe y después se mezcla con salsa de cocacola para caramelizar",
    tiempo: 85,
    ingredientes: [
        {
            ingrediente: ObjectId(),
            cantidad: 2
        },
        {
            ingrediente: ObjectId(),
            cantidad: 2
        },
        {
            ingrediente: ObjectId(),
            cantidad: 200
        },
        {
            ingrediente: ObjectId(),
            cantidad: 3
        },
        {
            ingrediente: ObjectId(),
            cantidad: 200
        }
    ],
    puntuaciones: {
        {
            usuario: ObjectId(),
            puntuacion: 5,
            comentario: "Esta receta es perfecta, me encanta el resultado."
        },
        {
            usuario: ObjectId(),
            puntuacion: 1,
            comentario: "No entiendo el procedimiento, está muy mal redactado."
        }
    },

}
*/