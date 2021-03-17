db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nombreUsuario','apellidosUsuario','correo','password','fechaNacimientoUsuario','puntuacionUsuario', 'n_recetas', 'plan', 'despensa', 'perfiles'],
                properties: {
                    nombreUsuario: {
                        bsonType: 'string',
                        description: 'nombre del usuario'
                    },
                    apellidosUsuario: {
                        bsonType: 'string',
                        description: 'apellidos del usuario'
                    },
                    correo: {
                        bsonType: 'string',
                        description: 'correo del usuario'
                    },
                    password: {
                        bsonType: 'string',
                        description: 'contraseña del usuario'
                    },
                    fechaNacimientoUsuario: {
                        bsonType: 'date',
                        description: 'fecha de nacimiento del usuario'
                    },
                    puntuacionUsuario: {
                        bsonType: 'double',
                        description: 'puntuación media de las recetas subidas por el usuario'
                    },
                    n_recetas: {
                        bsonType: 'double',
                        description: 'número total de recetas subidas por el usuario'
                    },
                    plan: {
                        bsonType: 'objectId',
                        description: 'referencia al plan escojido por el usuario'
                    },
                    despensa: {
                        bsonType: 'array',
                        description: 'lista de los alimentos y las cantidades contenidas en la despensa de casa',
                        items: {
                            bsonType: 'object',
                            required: ['alimento', 'cantidad'],
                            properties: {
                                alimento: {
                                    bsonType: 'objectId',
                                    description: 'referencia al alimento'
                                },
                                cantidad: {
                                    bsonType: 'double',
                                    description: 'cantidad en la que tenemos el alimento'
                                }
                            }
                        }
                    },
                    perfiles: {
                        bsonType: 'array',
                        description: 'lista de perfiles de la cuenta',
                        items: {
                            bsonType: 'object',
                            required: ['nombrePerfil','apellidosPerfil','fechaNacimientoPerfil','listas'],
                            properties: {
                                nombrePerfil: {
                                    bsonType: 'string',
                                    description: 'nombre del perfil'
                                },
                                apellidosPerfil: {
                                    bsonType: 'string',
                                    description: 'apellidos del perfil'
                                },
                                fechaNacimientoPerfil: {
                                    bsonType: 'date',
                                    description: 'fecha de nacimiento del perfil'
                                },
                                listas: {
                                    bsonType: 'array',
                                    description: 'todas las listas que tiene cada perfil',
                                    items: {
                                        bsonType: 'object',
                                        required: ['nombreLista', 'alimentos'],
                                        properties: {
                                            nombreLista: {
                                                bsonType: 'string',
                                                description: 'nombre de la lista'
                                            },
                                            alimentos: {
                                                bsonType: 'array',
                                                description: 'lista de alimentos de la lista',
                                                items: {
                                                    bsonType: 'object',
                                                    required: ['alimento', 'cantidad'],
                                                    properties: {
                                                        alimento: {
                                                            bsonType: 'objectId',
                                                            description: 'referencia al alimento'
                                                        },
                                                        cantidad: {
                                                            bsonType: 'double',
                                                            description: 'cantidad en la que tenemos el alimento'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
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
    "nombreUsuario": "Paco",
    "apellidosUsuario": "Peris Escrig",
    "correo": "ppescrig@gmail.com",
    "password": "35GD567d8rG6V",
    "fechaNacimientoUsuario": ISODate("1968-02-22"),
    "puntuacionUsuario": 0,
    "n_recetas": 0,
    "plan": ObjectId("6051ea8fb591fc0a91eaf1a7"),
    "despensa": [
        {
            "alimento": ObjectId("6051c12db591fc0a91eaf191"),
            "cantidad": 2
        }
    ],
    "perfiles": [
        {
            "nombrePerfil": "Juan",
            "apellidosPerfil": "Peris Mas",
            "fechaNacimientoPerfil": ISODate("1999-01-11"),
            "intolerancias": [
                "Gluten"
            ],
            listas: [
                {
                    "nombreLista": "CompraHabitual",
                    "alimentos": [
                        {
                            "alimento": ObjectId("6051d19bb591fc0a91eaf192"),
                            "cantidad": 3
                        },
                        {
                            "alimento": ObjectId("6051d248b591fc0a91eaf193"),
                            "cantidad": 4
                        }
                    ]
                }
            ]
        },
        {
            "nombrePerfil": "Maria",
            "apellidosPerfil": "Mas Gil",
            "fechaNacimientoPerfil": ISODate("1978-09-30"),
            listas: [
                {
                    "nombreLista": "CompraTrabajo",
                    "alimentos": [
                        {
                            "alimento": ObjectId("6051d19bb591fc0a91eaf192"),
                            "cantidad": 2
                        }
                    ]
                }
            ]
        }
    ]
}

*/