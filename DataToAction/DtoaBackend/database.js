const {MongoClient} = require("mongodb")

module.exports = {
    selectedDb : {},
    async connect(){
        try{
            const client = await MongoClient.connect(process.env.MONGO_DB_URL)
            this.selectedDb = client.db('DtoA')
            console.log(this.selectedDb)
        }catch(err){
            console.log(err)
        }
    }
}