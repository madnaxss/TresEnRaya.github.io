
var tablero = [null, null, null, null, null, null, null, null, null]; //Iniciamos el array que representara al tablero
var TurnoJugador = 1; //Empezaremos con los circulos
var NombreJugadorCruzes = prompt("Quien jugara con las cruzes?:"); //preguntamos nombres
var NombreJugadorCirculos = prompt("Quien jugara con los circulos?:");
var UltimoGanador = localStorage.getItem("ganador"); //Pillamos el ultimo ganador
var UltimoGanador1 = document.getElementById("UltimoGanador"); 
UltimoGanador1.textContent = "El ultimo ganador ha sido " + UltimoGanador; //Mostramos el ultimo jugador



function CambiarTurno(turno)
{
    if(turno == 1) //Si el turno es 1
    {
        console.log("turno" + turno);
        var MostrarTurno = document.getElementById("turno");
        MostrarTurno.textContent = "Turno de " + NombreJugadorCruzes + "(Cruzes)"; //mostramos que es su turno

        return 2;  //Y cambiamos el turno
        
    }
    if(turno == 2) //si es 2
    {
        var MostrarTurno = document.getElementById("turno");
        MostrarTurno.textContent = "Turno de " + NombreJugadorCirculos + "(Circulos)"; //Mostramos su turno
        console.log("turno" + turno);
        
        return 1; //Y cambiamos turno a 1
    }
}


function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    var datos = e.dataTransfer.getData("img");
    var Arrastadro = document.getElementById(datos);
    var casilla = e.target;
    var posicion = casilla.dataset.posicion; //Pillamos la posicion de la casilla en la que se ha hecho el drop
    
    //Primero tenemos que comprovar que no haya una imagen ya en esa casilla
    if (!casilla.querySelector('img')) {
        var ClonarImagen = Arrastadro.cloneNode(true); //Clonamos la imagen para que se quede en su posicion original
        casilla.appendChild(ClonarImagen); //Ponemos la imagen clonada dentro de la casilla

        if (datos === 'cruz') { //Si es una cruz vamos a guardar un 1 en la posicion (Los 1 seran para las cruzes)
            tablero[posicion] = 1; 
        } else if (datos === 'circulo') {
            tablero[posicion] = 2; //Si es un circulo vamos a guardar un 2 en la posicion (Los 2 seran para los circulos)
        }
        if(ComprovarTablero()) //Cada vez que se dropea la imagen comprovamos que haya ganado y si ha ganado miramos el nombre del ganador con otra funcion
        {
            EncontrarGanardor();
        }
       TurnoJugador = CambiarTurno(TurnoJugador); //Cambiamos de turno una vez hecho el drop
    }

}

function drag(e) {
    var ImagenArrastrada = e.target; //Guardamos la info de la imagen arrastrada
    var CruzoCirculo = ImagenArrastrada.id; //Pillamos la id para comprovar si es un circulo o una cruz

    //Comprovamos si es un circulo o una cruz y el turno del jugador que toca
    if (CruzoCirculo === 'circulo' && TurnoJugador === 1) {
        e.dataTransfer.setData("img", CruzoCirculo); //Insertamos la imagen arrastrada
    } else if (CruzoCirculo === 'cruz' && TurnoJugador === 2) {
        e.dataTransfer.setData("img", CruzoCirculo);//Insertamos la imagen arrastrada
    } else {
        //Solo se podra arrastrar si es su turno
        e.preventDefault();
    }


}

function ComprovarTablero()
{
    if(tablero[0] ==tablero[1] && tablero[0] == tablero[2] && tablero[0])
    {
        return true;
    }else if(tablero[3] == tablero[4] && tablero[3] == tablero[5] && tablero[3])
    {
        return true;
    }else if(tablero[6] == tablero[7] && tablero[6] == tablero[8] && tablero[6])
    {
        return true;
    }
    //Comprovamos las Verticales
    else if(tablero[0] == tablero[3] && tablero[0] == tablero[6] && tablero[0])
    {
        return true;
    }
    else if(tablero[1] == tablero[4] && tablero[1] == tablero[7] && tablero[1])
    {
        return true;
    }
    else if(tablero[2] == tablero[5] && tablero[2] == tablero[8] && tablero[2])
    {
        return true;
    }
    //Comprovamos las Diagonales
    else if(tablero[0] == tablero[4] && tablero[0] == tablero[8] && tablero[0])
    {
        return true;
    }
    else if(tablero[2] == tablero[4] && tablero[2] == tablero[6] && tablero[2])
    {
        return true;
    }
    
}

function EncontrarGanardor()
{
    if(ComprovarTablero) //Si hay un ganador
    {
        if(TurnoJugador == 1) //comprovamos su turno
        {
            var NombreGanador = NombreJugadorCirculos;
            alert("Ha ganado " + NombreJugadorCirculos); //Y si es 1 habran ganado los circulos
        }
        if(TurnoJugador == 2)
        {
            var NombreGanador = NombreJugadorCruzes;
            alert("Ha ganado " + NombreJugadorCruzes);//Y si es 1 habran ganado los circulos
        }
        localStorage.setItem("ganador", NombreGanador); //guardamos el nombre del ganador
        location.reload(); //recargamos para volver a jugar
    }
}