const http = require('node:http')
const fs = require('node:fs')

let text = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>logica-programacion-3</title>
</head>
<body>
  <script>
    function calculo(){
      let num
      let resultado = 1
      let text = "Factorial de "
      let element = document.createElement("p")
      try{
        num = parseInt(document.getElementById("factorial").value)
        text = text + num + ": "
        for(let i = num; 0 < i; i--){
          resultado = resultado * i
          if(i !== 1) text = text + i + "x"
          else{
            text = text + i + " = " + resultado
          }
          
        }
        
        element.appendChild(document.createTextNode(text))
        const respuesta = document.body.appendChild(element)

      }
      catch(e){
        element.appendChild(document.createTextNode('Debe ingresar un número entero.'))
        const respuesta = document.body.appendChild(element)
      }
      
    }
  </script>
  <label for="factorial">Ingrese el número para calcular el factorial:</label>
  <input type="text" id="factorial" name="factorial">
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