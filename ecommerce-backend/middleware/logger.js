const logger=((req,re,next)=>{
    console.log(`Request received on ${new Date().toLocaleString('en-US',{dateStyle:'full',timeStyle:'long'})}`)
    next()
});
module.exports=logger;