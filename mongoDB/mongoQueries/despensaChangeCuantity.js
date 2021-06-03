db.users.updateOne(
    {nombreUsuario: "Paco"},
    {
        $set: {
            "despensa.$[item].cantidad": 600
        }
    },
    {
        arrayFilters: [
            {"item.alimento": ObjectId("6051f4dfb591fc0a91eaf1ac")}
        ]
    }
)