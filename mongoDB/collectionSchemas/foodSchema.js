db.createCollection( 'food', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nombre', 'unidades'],
                properties: {
                    nombre: {
                        bsonType: 'string',
                        description: 'Nombre del alimento'
                    },
                    unidades: {
                        bsonType: 'string',
                        description: 'Unidades del alimento'
                    }
                }
            }
        }
    }
)




/*
{
    "nombre": "Leche",
    "unidades": "bricks"
    "alergenos": [
        "betalactoglobulina",
        "alfalactoalbúmina"
    ],
    "intolerancias": [
        "Lactosa"
    ]
}
*/