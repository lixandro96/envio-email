
document.addEventListener('DOMContentLoaded',function(){

  const formulario = document.querySelector('#formulario');
  const emailInput = document.querySelector('#email');
  const asuntoInput = document.querySelector('#asunto');
  const copiaInput = document.querySelector('#copia');
  const mensajeInput = document.querySelector('#mensaje');
  const btnSubmit = document.querySelector('#submit');
  const resetFormBtn =document.querySelector('#formulario button[type="reset"');
 const spinner = document.querySelector('.spinner');
  
  // objeto del mensaje
  const objetoMensaje = {
    email: '',
    asunto: '',
    mensaje: ''
  }

    //eventos
    function eventsHandler(){
      emailInput.addEventListener('input',validarFormulario);
      asuntoInput.addEventListener('input',validarFormulario);
      copiaInput.addEventListener('input',validarFormulario);
      mensajeInput.addEventListener('input',validarFormulario);
      formulario.addEventListener('submit',enviarEmail)
      resetFormBtn.addEventListener('click',(e)=> {
        e.preventDefault()
        resetForm()
      });
    }
    eventsHandler()


  function validarFormulario(e){
    if(e.target.value.trim() === '' && e.target.id !=='copia'){
      mensajeAlerta(e.target.parentElement,`El campo ${e.target.id} es obligatorio`);
      objetoMensaje[e.target.id] = '';
      comprobarEmail()
      return
    };

    if(e.target.id ==='email' && !validarEmail(e.target.value)){
      mensajeAlerta(e.target.parentElement,`El email no es valido`);
      comprobarEmail()
      return
    };
    
    if(e.target.id ==='copia' && !validarEmail(e.target.value)){
      mensajeAlerta(e.target.parentElement,`El email no es valido`);
      comprobarEmail()
      return
    };

    limpiarAlerta(e.target.parentElement);

    objetoMensaje[e.target.id] = e.target.value.trim().toLowerCase();
    
    comprobarEmail()
  };

  function mensajeAlerta(referencia,mensaje){

    limpiarAlerta(referencia);

    // creamos una alerta si no pasa la validacion
    const error = document.createElement('P');
    error.classList.add('text-red-600','text-center','font-bold','alerta');
    error.textContent = mensaje

    referencia.appendChild(error);
  };

  function limpiarAlerta(referencia){
    // elimina la alerta
    const alerta = referencia.querySelector('.alerta');
    if(alerta){
      alerta.remove()
    }
  };

  function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado
  };

  function comprobarEmail(){

    // si el objeto mensaje esta vacio re quintan las clases
    if(Object.values(objetoMensaje).includes('')){
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true
      return
    }

    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false
  }

  function resetForm(){

    // limpiamos el objeto
    objetoMensaje.email= ''
    objetoMensaje.asunto= ''
    objetoMensaje.mensaje= ''

    // reseteamos el formulario
    formulario.reset()
    comprobarEmail()

  }
  function enviarEmail(e){
    e.preventDefault()
    
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');
    
    
    setTimeout(() => {
      
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
      resetForm();
      
    }, 3000);

    setTimeout(() =>{
      const alerta = document.createElement('P');
      alerta.classList.add('text-white','p-2','bg-green-500','text-center','rounded-lg');
      alerta.textContent= 'Mensaje enviado correctamente';

      formulario.appendChild(alerta)

      setTimeout(()=>{
        alerta.remove()
      },3000)
    },3000)
  
    
  }

});