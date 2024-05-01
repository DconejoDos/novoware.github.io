import datos from "../../data/data.json" with { type: "json" };
import {Actividades} from "./clases.js";
console.log(datos);

const cuerpoTabla = document.querySelector("#cuerpo-tabla")

const cargarTabla=()=>{
  
  datos.map((item)=>{
    const fila = document.createElement("tr")

    const celdas=`<th>${item.servicio}</th>
    <td>${item.estado}</td>
    <td>${item.usuario}</td>
    <td>
    <div>
    <button class="see">
    <i class="fa fa-eye" aria-hidden="true"></i>
    </button>
    <button class="edit">
    <i class="fa fa-pencil" aria-hidden="true"></i>
    </button>
    <button class="delete">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    </div>
    </td>
    `;

  fila.innerHTML=celdas;
  cuerpoTabla.append(fila);
  }

  )
}

const agregarActividad=(event)=>{
  event.preventDefault()
  console.log("submit")
}
cargarTabla();

document.querySelector("#formActividad").addEventListener("submit", agregarActividad)