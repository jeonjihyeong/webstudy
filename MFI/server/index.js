const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser')
const db= require('./db')
const service=require('./service')



app.use(bodyParser.json())
app.use(cors());

// app.get('/ping',async(req,res)=>{
//   const ress = await service.getUserId();
  
//   console.log(ress.id)

// })

app.post('/signup',async(req,res)=>{
  const result = await service.saveUser('bv','bv')
  console.log(result)
})

// 중복체크, 회원가입시 id 중복체크, db pkfk로 관계 확실히 알기, js 문법, 
// 
// app.get('/id/:id',(req,res)=>{
//   console.log(req.params)
//   res.send(db)
  
// })



app.post('/login', async(req, res) => {
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