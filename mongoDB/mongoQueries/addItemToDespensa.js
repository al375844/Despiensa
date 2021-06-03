db.users.updateOne(
    {nombreUsuario: "Paco"}, 
    {
        $addToSet: {
            despensa: {
                "alimento": ObjectId("6051e111b591fc0a91eaf1a6"),
                "cantidad": 4
            }
        }
    }
)