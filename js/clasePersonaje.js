export class Ahorcado {
    constructor(p) {
            this.palabra = p;
            this.maximo = 6;
            this.intentos = 0;
            this.vivo = true;
            this.dibujar();

    }
    //---------------------------------------------------------------------------------------------------------------------
    cambiarFondo(){
        let contenedor = document.querySelector("body");
        if(this.vivo != false){
        contenedor.style.backgroundImage = "url(./imgDemon/cabania.gif)";
        }else if(this.vivo == false){
        contenedor.style.backgroundImage = "url(./imgDemon/fire2.gif)";
        }
    }
    //---------------------------------------------------------------------------------------------------------------------

    dibujar() {
    
        document.getElementById("img").src = "./imgDemon/demon-" + this.intentos + ".png";
        this.cambiarFondo();
    }
    //---------------------------------------------------------------------------------------------------------------------

    frame(P) {
        this.intentos++;
        if (this.intentos >= this.maximo) {
            this.vivo = false;
           alert("¡Estás muerto!");
           alert("La palabra era: " + P);
            this.botonReload();
            this.cambiarFondo(this.vivo);
        }
          console.log(this.intentos);
        if(this.intentos == 1){
            this.sonido("piedad1");

        }else if(this.intentos == 2){
            this.sonido("piedad2");
           }
           else if(this.intentos == 3){
            this.sonido("piedad3");
           }
           else if(this.intentos == 4){
            this.sonido("piedad2-1");
           }else if(this.intentos == 5){
            this.sonido("unasPalabras");
              }else if(this.intentos == 6){
            this.sonido("libertad");
            }
        
        this.dibujar();
    }
    //---------------------------------------------------------------------------------------------------------------------

    mostrarPista(pistaInput){
        const pistaPlaceholder = document.getElementById("letra");
        const container = document.querySelector(".container");
        //ponerte un texto como hijo del contenedor
        let marquee = document.createElement("marquee");
        marquee.innerHTML = "Pista: "+pistaInput;
        marquee.style.fontSize = "1rem";
        //
        marquee.setAttribute("behavior", "alternate");
        marquee.setAttribute("direction", "right");
        marquee.setAttribute("scrollamount", "10");

       setTimeout(function(){
        container.appendChild(marquee);
        setTimeout(function(){
            //remover el marquee del contenedor
            container.removeChild(marquee);
        },2000);
        }, 500);                   


    }
    //---------------------------------------------------------------------------------------------------------------------

    filtrarLetra(L, espacioG, palabra){
    let letra = document.getElementById('letra');
    if(L == ""){
        alert("Ingresa una letra");
        letra.focus();
        
    
    }else if(!/[A-Z]/.test(L)){
        alert("Solo se permiten letras mayúsculas, sin acentos");
        letra.value = "";
        letra.focus();
        return false;
        //la letra no sera guardada
    }else{
        this.letraTildada(L, palabra);
        this.mostrarPalabra(L, espacioG, palabra, letra);
        }
    }
    //---------------------------------------------------------------------------------------------------------------------

    palabraConEspacios(espacioGuardado, palabra) {
        let palabraInput = document.getElementById("pista");
        let texto = "";
        let largo = espacioGuardado.length;
        for(let x = 0; x<largo; x++){
            if(espacioGuardado[x] != undefined){
                texto = texto + espacioGuardado[x];
            }else{
                texto += "_ ";
            }
        }
        palabraInput.innerHTML = texto;
        if(texto == palabra ){
            alert("¡Ganaste!");
            document.getElementById("img").src = "./imgDemon/demon-0.png";
            this.botonReload();
            this.vivo = true;
        }

    }
    //---------------------------------------------------------------------------------------------------------------------

    mostrarPalabra(letra, espacioGuardado, palabra, input) {
        
        let encontrado = false;
    let p;
    for (p in palabra){
        if (letra == palabra[p]){

            espacioGuardado[p] = letra;// A
            encontrado = true;
            input.value = "";
            input.focus();
        }
    }
    //---------------------------------------------------------------------------------------------------------------------

    this.palabraConEspacios(espacioGuardado, palabra);
    if(!encontrado){
        this.frame(palabra);
        input.value = "";
        input.focus();
        }

    }
    //---------------------------------------------------------------------------------------------------------------------

    letraTildada(L,palabra){
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        let lista = document.querySelectorAll("li");
        let contenedor = document.querySelector(".lista");
        //RECORRER LA PALABRA PARA VER SI LA LETRA ESTA EN ELLA.
        //--> ES IMPPORTANTE QUE SE EJECUTE PRIMERO ESTA COMPROBACIÓN, DE LO CONTARIO,
        //LA PRIMERA LETRA DE LA PALABRA, AUNQUE CONINCIDA, SERA TILDADA <--
        for(let x = 0; x<palabra.length; x++){
            if(L == palabra[x]){
                return; 
            }else{
                for(let i = 0; i<lista.length; i++){
                    if(lista[i].textContent == L){
                       //SI LA PALABRA SE REPITE NO SE GUARDA
                        alert("Ya has ingresado esta letra");
                        return false;
                    }
                }
            }
        }
        li.innerHTML = L;
        ul.appendChild(li);
        contenedor.append(ul);
    }
    botonReload(){
        let boton = document.querySelector("#botonRules");
        let reload = document.createElement("button");
        reload.innerHTML = "Reiniciar";
        reload.setAttribute("id", "botonRules");
        reload.style.marginTop = "0";
        reload.style.marginLeft = "3rem";
        boton.appendChild(reload);
        reload.addEventListener("click", function(){
            location.reload();
        });
    }
    //---------------------------------------------------------------------------------------------------------------------
      /*sonido(sound){
        let audio = document.getElementById("sound");
        if(sound == "porQueLoHacemos"){
            audio.src = "../sonidos/porQueLoHacemos.wav";
        }else if(sound == "piedad3"){
            audio.src = "../sonidos/piedad3.wav";

        }else if(sound == "piedad2"){
            audio.src = "../sonidos/piedad2.wav";
        }else if(sound == "piedad1"){
            audio.src = "../sonidos/piedad1.wav";
        }
        
        audio.play();
    }
    */
    sonido(cancion){
        let audio = document.getElementById("sound");
       
        if(cancion == "piedad1"){
            audio.src = `./sonidos/${cancion}.mp3`;
        }else if(cancion == "piedad2"){
            audio.src = `./sonidos/${cancion}.mp3`;
        }else if(cancion == "piedad3"){
            audio.src = `./sonidos/piedadBucle.mp3`;
        }else if(cancion == "piedad2-1"){
            audio.src = `./sonidos/piedad2.mp3`;
        }else if(cancion == "unasPalabras"){
            audio.src = `./sonidos/${cancion}.mp3`;
        }else if(cancion == "libertad"){
            audio.src = `./sonidos/${cancion}.mp3`;
            let audioInicioFondo = document.getElementById("fondo");
            audioInicioFondo.currentTime = 0;
        }
        
        audio.play();
      
       

    }
}
