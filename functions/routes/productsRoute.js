const {Router} = require('express');
const admin = require('firebase-admin');
const route = Router();



const db=admin.firestore();

route.post('/api/products',async (req,res)=>{
  try{
    await db.collection('productos')
  .doc('/'+ req.body.id + '/')
  .create({name:req.body.name});
  return res.status(204).json();

  }catch(err){
    return res.status(500).send(err);

  }
  

});

route.get('/api/products/:id',async(req,res)=>{
  try{
    const doc = db.collection('productos').doc(req.params.id)
    const item = await doc.get()
    const response =item.data();
    return res.status(200).json(response);
  }catch(err){
    return res.status(500).send(err);
  }
});

route.get('/api/products', async(req,res)=>{
  try{
    const query = db.collection('productos');
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;
    const response = docs.map((doc)=>({
      id: doc.id,
      name: doc.data().name
    }) )
    console.log(response)
    return res.status(200).json(response);

  }catch(err){
    return res.status(500).send(err);
  }
});

route.delete('/api/products/:id',async(req,res)=>{
  try{
    const document =db.collection('productos').doc(req.params.id)
    await document.delete();
    return res.status(200).json();

  }catch(err){
    return res.status(500).send(err);
  }
});

route.put('/api/products/:id',async(req,res)=>{
  try{
    const document =db.collection('productos').doc(req.params.id)
    await document.update({
      name: req.body.name
    });
    return res.status(200).json();

  }catch(err){
    return res.status(500).send(err);
  }
});

module.exports = route;