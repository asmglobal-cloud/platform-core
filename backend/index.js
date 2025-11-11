const express = require('express');
const app = express();
app.get('/health', (req, res) => res.json({ok:true, service:'asm-backend'}));
app.get('/', (req,res)=>res.send('ASMglobal backend is running'));
app.listen(3000, ()=>console.log('backend up on 3000'));
