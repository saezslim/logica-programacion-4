const http = require('node:http')
const fs = require('node:fs')

let text = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>logica-programacion-4</title>
</head>
<body>
  <script>
    function calculo(){
      let num
      let a = 0
      let b = 1
      let c = 0
      let arr = []
      let text = "La secuencia de Fibonacci de "
      let element = document.createElement("p")
      try{
        num = parseInt(document.getElementById("fibo").value)
        text = text + num + " digitos:  "
        for(let i = 0; i < num-1; i++){
          arr.push(c)
          if(c === 1) arr.push(c)
          c = b + a
          a = b
          b = c
          
        }
        text = text + arr.join(",")
        
        element.appendChild(document.createTextNode(text))
        const respuesta = document.body.appendChild(element)

      }
      catch(e){
        element.appendChild(document.createTextNode('Debe ingresar un número entero.'))
        const respuesta = document.body.appendChild(element)
      }
      
    }
  </script>
  <label for="fibo">Ingrese el número para mostrar Fibonacci:</label>
  <input type="text" id="fibo" name="fibo">
  <button onclick="calculo()">Calcular</button>
</body>
</html>`

  const createIndexHTML = () => {
    fs.appendFile('./index.html', text, (err) => {
      if (err) throw err
      console.log('Creado')
    })
  } 

  const readIndex = (req, res) => {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        createIndexHTML()
        return readIndex(req, res)
      }
      res.writeHead(200, {"Content-Type": "text/html"})
      res.write(data)
      return res.end()
    })
  }

const server = http.createServer((req, res) => {
  readIndex(req, res)  
})

server.listen(0, () => {
  console.log(`El servidor está escuchando en el puerto http://localhost:${server.address().port}`)
})