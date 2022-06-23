const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')
// fs = file system ----------> leads to reading data and writing data ----------> fs is module

// --------------------------------------------FILES-------------------------------------------

// Blocking, synchronous way -----------------------------


// const textIn = fs.readFileSync('./txt/input.txt');
{/* <Buffer 54 68 65 20 61 76 6f 63 61 64 6f 20 f0 9f a5 91 20 69 73 20 70 6f 70 75 6c 61 72 20 69 6e 20 76 65 67 65 74 61 72 69 61 6e 20 63 75 69 73 69 6e 65 20 ... 87 more bytes> */}
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// this time it will return string since we have provided an encoding option.
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);

// const hello = 'hello world';
// console.log(hello);


// Non-Blocking, asynchronous way --------------------------------

// fs.readFile('./txt/start.txt', 'utf-8' , (error,data1) => {
//     console.log("done")
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8' , (error,data2) => {
//         console.log(data2)
//         fs.readFile('./txt/append.txt', 'utf-8' , (error,data3) => {
//             console.log(data3)

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log(err)
//             })
//         })
//     })
// })


// since it is wrong toh it will read error msg, now in this case: first line 57 then 52,24 and then remaining
// fs.readFile('./txt/stat.txt','utf-8',(error,data) => {
//     if(error){
//         console.log("CHUTIYA")
//     }else{
//         console.log("or bdaa chutiya")
//     }
// })
     
// console.log("already done !!")    

// since it is right so now in this case: first line 57 then 24,54 and then remaining
// fs.readFile('./txt/stat.txt','utf-8',(error,data) => {
//     if(error){
//         console.log("CHUTIYA")
//     }else{
//         console.log("or bdaa chutiya")
//         }
//     })
// console.log("already done !!")


// ---------------------------------------------SERVER---------------------------------------

// const server = http.createServer((req,res) => {
//     // console.log(req)
//     res.end("hello from the server !")
// })

// server.listen(5500,'127.0.0.1',()=>{
//     console.log("Listening to requests on port 8000")
// })

// --------------------------------------------ROUTING-------------------------------------------

// const server = http.createServer((req,res) => {
//     console.log(req.url)

//     const pathName = req.url

//     if(pathName==='/overview' || pathName==='/'){
//         res.end('this is overview')
//     }else if (pathName === '/product'){
//         res.end('this is the product')
//     }else{
//         res.writeHead(404,{
//             'Content-type':'text/html',
//             'my-own-header':'hello-world'
//         })
//         res.end('<h1>page not found</h1>')
//     }

//     res.end("hello from the server !")
// })

// server.listen(5500,'127.0.0.1',()=>{
//     console.log("Listening to requests on port 8000")
// })


//  ----------------------------------------------SIMPLE API--------------------------------------------------



// const data = fs.readFileSync('./dev-data/data.json','utf-8')
// const dataobject = JSON.parse(data)

// const server = http.createServer((req,res) => {
//     const pathName = req.url

//     if(pathName ==='/api'){

//         res.writeHead(200,{'Content-type':'application/json'})
//         res.end(data)

//     }
//     else{
//         res.end("hello this is my server !")
//     }
// })

// server.listen(5500,'127.0.0.1',() => {
//     console.log("Listening to requests on port 8000")
// })



//  ------------------------------------------------------PROJECT DATA------------------------------------------------------


const tempOverview = fs.readFileSync('./templates/template-overview.html','utf-8')
const tempCard = fs.readFileSync('./templates/template-card.html','utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html','utf-8')
const data = fs.readFileSync('./dev-data/data.json','utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req,res) => {
    const { query,pathname } = url.parse(req.url,true)

    if(pathname === "/" || pathname === "/overview"){
        res.writeHead(200,{
            'Content-type':'text/html'
        })

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard,element)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output)
    }
    else if(pathname === "/product"){
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct,product)
        res.end(output)
    }
    else if(pathname === "/api"){
        res.writeHead(200,{
            'Content-type':'application/json'
        })
        res.end(dataObj)
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html'
        })
        res.end('<h1>Page Not Found !</h1>')
    }
})

server.listen(5500,'127.0.0.1',() => {
    console.log("listening to server of 5500 port !!")
})
