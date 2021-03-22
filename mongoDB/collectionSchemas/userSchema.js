db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['usuario','nombreUsuario','apellidosUsuario','correo','password','puntuacionUsuario', 'n_recetas', 'plan', 'despensa', 'perfiles', 'listas', 'recetas'],
                properties: {
                    usuario: {
                        bsonType: 'string',
                        description: 'nickname del usuario'
                    },
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
                            required: ['nombrePerfil','apellidosPerfil','fechaNacimientoPerfil'],
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
                                }
                            }
                        }
                    },
                    listas: {
                        bsonType: 'array',
                        description: 'todas las listas que tiene el usuario',
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
                    },
                    recetas: {
                        bsonType: 'array',
                        description: 'todas las recetas que ha subido el usuario',
                        items: {
                            bsonType: 'objectId',
                            description: 'referencia a cada una de las recetas del usuario'
                        }
                    }
                }
            }
        }
    }
)

/*
{
    "usuario": "pacoElCocinas53",
    "nombreUsuario": "Paco",
    "apellidosUsuario": "Peris Escrig",
    "correo": "ppescrig@gmail.com",
    "password": "35GD567d8rG6V",
    "puntuacionUsuario": 0,
    "n_recetas": 0,
    "plan": ObjectId("6051ea8fb591fc0a91eaf1a7"),
    "despensa": [
        {
            "alimento": ObjectId("6051f4dfb591fc0a91eaf1ac"),
            "cantidad": 800
        },
        {
            "alimento": ObjectId("6051f4dfb591fc0a91eaf1ad"),
            "cantidad": 12
        }
    ],
    "perfiles": [
        {
            "nombrePerfil": "Paco",
            "apellidosPerfil": "Peris Escrig",
            "fechaNacimientoPerfil": ISODate("1968-02-22"),
            "intolerancias": [
                "Gluten"
            ]
        },
        {
            "nombrePerfil": "Maria",
            "apellidosPerfil": "Mas Gil",
            "fechaNacimientoPerfil": ISODate("1978-09-30"),
        }
    ],
    listas: [
        {
            "nombreLista": "CompraHabitual",
            "alimentos": [
                {
                    "alimento": ObjectId("6051f4dfb591fc0a91eaf1a8"),
                    "cantidad": 3
                },
                {
                    "alimento": ObjectId("6051f4dfb591fc0a91eaf1aa"),
                    "cantidad": 200
                }
            ]
        },
        {
            "nombreLista": "CompraTrabajo",
            "alimentos": [
                {
                    "alimento": ObjectId("6051f4dfb591fc0a91eaf1ae"),
                    "cantidad": 20
                }
            ]
        }
    ],
    recetas: [
        ObjectId("6051f5f4b591fc0a91eaf1af")
    ]
}

*/