db.createCollection( 'food', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nombre'],
                properties: {
                    nombre: {
                        bsonType: 'string',
                        description: 'Nombre del alimento'
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