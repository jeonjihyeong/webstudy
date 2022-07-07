const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser')
const service = require('./service')
const db = require('./lib/db');
app.use(bodyParser.json())
app.use(cors());



app.post('/signup',async(req,res)=>{
  const data = req.body
  const result = await service.saveUser(data.id,data.pw,data.age,data.name)
  console.log(result)
})

app.post('/login', async (req, res) => {
  const data=req.body;
  const idData=await service.getUserId(data.id);
  if (idData===null){
    res.send ({data: 'not exist'})
  }else {
      const pwData=idData.dataValues.pw
      if(data.pw!==pwData){
          res.send({data: 'wrong password'})
      }else {
          res.send({data: 1});
      }
  }
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  await db.initialize()
})