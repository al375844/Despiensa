db.users.aggregate([
    {
        $match: {
            nombreUsuario: "Paco"
        }
    },
    {
        $lookup: {
            from: "food",
            localField: "despensa.alimento",
            foreignField: "_id",
            as: "productos"
        }
    },
    {
        $project: {
            nombreUsuario: 1,
            apellidosUsuario: 1,
            correo: 1,
            password: 1,
            fechaNacimientoUsuario: 1,
            puntuacionesUsuario: 1,
            n_recetas: 1,
            plan: 1,
            despensa: {
                $map: {
                    input: "$despensa",
                    as: "item",
                    in: {
                        alimento: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: "$productos",
                                        as: "prod",
                                        cond: {
                                            $eq: [
                                                "$$prod._id",
                                                "$$item.alimento"
                                            ]
                                        }
                                    }
                                },
                                0
                            ]
                        },
                        quantity: "$$item.cantidad"
                    }
                }
            },
            perfiles: 1,
            listas: 1,
            recetas: 1
        }
    },
    {
        $lookup: {
            from: "food",
            localField: "listas.alimentos.alimento",
            foreignField: "_id",
            as: "productos"
        }
    },
    {
        $project: {
            nombreUsuario: 1,
            apellidosUsuario: 1,
            correo: 1,
            password: 1,
            fechaNacimientoUsuario: 1,
            puntuacionesUsuario: 1,
            n_recetas: 1,
            plan: 1,
            despensa: 1,
            perfiles: 1,
            listas: {
                $map: {
                    input: "$listas",
                    as: "listaDeListas",
                    in: {
                        nombreLista: "$$listaDeListas.nombreLista",
                        alimentos: {
                            $map: {
                                input: "$$listaDeListas.alimentos",
                                as: "listaDeAlimentos",
                                in: {
                                    alimento: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$productos",
                                                    as: "prodd",
                                                    cond: {
                                                        $eq: [
                                                            "$$prodd._id",
                                                            "$$listaDeAlimentos.alimento"
                                                        ]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    },
                                    cantidad: "$$listaDeAlimentos.cantidad"
                                }
                            }
                        }
                    }
                }
            },
            recetas: 1
        }
    },
    {
        $lookup: {
            from: "plans",
            localField: "plan",
            foreignField: "_id",
            as: "planes"
        }
    },
    {
        $project: {
            nombreUsuario: 1,
            apellidosUsuario: 1,
            correo: 1,
            password: 1,
            fechaNacimientoUsuario: 1,
            puntuacionesUsuario: 1,
            n_recetas: 1,
            plan: {
                $arrayElemAt: [
                    "$planes",
                    0
                ]
            },
            despensa: 1,
            perfiles: 1,
            listas: 1,
            recetas: 1
        }
    },
    {
        $lookup: {
            from: "recipes",
            localField: "recetas",
            foreignField: "_id",
            as: "recetas"
        }
    }
]).pretty()