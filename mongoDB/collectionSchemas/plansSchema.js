db.createCollection('plans', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nombre','descripcion','precio'],
                properties: {
                    nombre: {
                        bsonType: 'string',
                        description: 'nombre del plan'
                    },
                    descripcion: {
                        bsonType: 'string',
                        description: 'descripcion detallada del plan'
                    },
                    precio: {
                        bsonType: 'double',
                        description: 'precio en euros del plan'
                    }
                }
            }
        }
    }
)


/*
{
    nombre: "Plan gratuito",
    descripcion: "Plan gratuito de forma permanente que incluye anuncios",
    precio: 0
}
*/