import { useState } from 'react';

function App() {
  
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState(0);

  const [activo, setActivo] = useState("Primero");
  const [historial, setHistorial] = useState([]);

  const ponerNumero = (lugar) => {
    if (activo === "Primero") setNumero1(numero1 + lugar);
    else setNumero2(numero2 + lugar);
  };

  const calcular = (operacion) => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);

    if (isNaN(num1) || isNaN(num2)) return alert("Error, escribe dos numeritos");

    let resultadoTemporal = 0;
    let signo = "";

    if (operacion === "sumar") { resultadoTemporal = num1 + num2; signo = "+"; }
    if (operacion === "restar") { resultadoTemporal = num1 - num2; signo = "-"; }
    if (operacion === "multiplicar") { resultadoTemporal = num1 * num2; signo = "×"; }
    if (operacion === "dividir") {
      if (num2 === 0) return alert("No se puede dividir por cero");
      resultadoTemporal = num1 / num2; 
      signo = "÷";
    }

    setResultado(resultadoTemporal);
    setHistorial([...historial, `${num1} ${signo} ${num2} = ${resultadoTemporal}`]);
  };

  const borrarTodo = () => {
    setNumero1("");
    setNumero2("");
    setResultado(0);
  };

  const borrarUltimo = () => {
    if (activo === "Primero") setNumero1(numero1.slice(0, -1));
    else setNumero2(numero2.slice(0, -1));
  };

  return (
    <div className="container">
      <div className="calculadora">
        <h1 className="titulo">Calculadora Modular</h1>

        <div id="resultado" className="display">{resultado}</div>
        <div id="mensaje" className="notificacion"></div>

        <div className="inputs">
          <input 
            id="num1" 
            type="text" 
            placeholder="Número 1" 
            value={numero1} 
            readOnly 
            onClick={() => setActivo("Primero")} 
          />
          <input 
            id="num2" 
            type="text" 
            placeholder="Número 2" 
            value={numero2} 
            readOnly 
            onClick={() => setActivo("Segundo")} 
          />
        </div>

        <div className="teclado">
          <button className="op" onClick={() => calcular("sumar")}>+</button>
          <button className="op" onClick={() => calcular("restar")}>−</button>
          <button className="op" onClick={() => calcular("multiplicar")}>×</button>
          <button className="op" onClick={() => calcular("dividir")}>÷</button>

          <button onClick={() => ponerNumero("7")}>7</button>
          <button onClick={() => ponerNumero("8")}>8</button>
          <button onClick={() => ponerNumero("9")}>9</button>
          <button onClick={borrarUltimo}>C</button>

          <button onClick={() => ponerNumero("4")}>4</button>
          <button onClick={() => ponerNumero("5")}>5</button>
          <button onClick={() => ponerNumero("6")}>6</button>
          <button onClick={borrarTodo}>AC</button>

          <button onClick={() => ponerNumero("1")}>1</button>
          <button onClick={() => ponerNumero("2")}>2</button>
          <button onClick={() => ponerNumero("3")}>3</button>
          <button onClick={() => ponerNumero(".")}>.</button>

          <button className="igual" onClick={() => calcular("sumar")}>=</button>
          <button onClick={() => ponerNumero("0")} style={{ gridColumn: "span 2" }}>0</button>
        </div>
      </div>

      <div className="historial">
        <h2>Historial</h2>
        <ul id="lista-historial">
          {historial.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;