$(function(){
   //INICIO
   $( "#actividades" ).tabs();
   $('main').children().hide();
   $('#inicio').toggle().fadeIn();
   $('nav').hide();
   setTimeout(function () {
      $('#inicio').fadeOut();
      $('nav').show('slow');
      $( document ).ready( actividades );
   }, 1500);

   //ayax actividades y ponentes
   $("#lactividades").on('click', actividades);
   $("#lponentes").on('click', ponentes);

   //asistentes
   $("#asistentes").on('click', formasistentes);

   //sysmanas
   $("#sysmanas").on('click', mostrarSismanas);

   //login
   $("#login").on('click', formLogin);

});

//LOGEADO
let funcionEditar = function(){
   $('main').children().hide();
   $('#FormEditar').show('faster');
   
   //validacion   FormEditar
   $('#FormEditar>form').validate({
   onBlur : true,
   eachValidField : function() {
     $(this).closest('div').removeClass('error').addClass('success');
   },
   eachInvalidField : function() {
     $(this).closest('div').removeClass('success').addClass('error');
   }
   });
   $.validateExtend({
   nombre2 : {
      required : true,
      conditional : function(value) {
         return value;
      },
      pattern : /[a-zA-Z]{3,}/
   },
   ap2 : {
      required : true,
      conditional : function(value) {
         return value;
      },
      pattern : /[a-zA-Z]{3,} [a-zA-Z]{3,}/
   },
   proce : {
      required : true,
      conditional : function(value) {
         return value;
      },
      pattern : /[\w\d]{3,},?/g
   },
   obser : {
      required : true,
      conditional : function(value) {
         return value;
      },
      pattern : /[\w\d]{3,},?/g
   },
   opciones : {
      required : true,
      conditional : function(value) {
         return value;
      }
   }
   });
}

let funcionCrear = function(){
   $('main').children().hide();
   $('#FormRegistro').show('faster');
   
   //validacion   FormRegistro
   $('#FormRegistro>form').validate({
   onBlur : true,
   onSubmit  : false,
   eachValidField : function() {
     $(this).closest('div').removeClass('error').addClass('success');
   },
   eachInvalidField : function() {
     $(this).closest('div').removeClass('success').addClass('error');
   }
   });
   $.validateExtend({
      nombre3 : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[a-zA-Z]{3,}/
      },
      desc : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[\w\d]{3,},?/g
      },
      descEx : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[\w\d]{3,},?/g
      },
      imagen : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /.*\.png/
      },
      matpon : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[\w\d]{3,},?/g
      },
      materialAsistentes : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[\w\d]{3,},?/g
      },
      numAsistentes : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[1-9]+/
      }
   });
}

//ACTIVIDADES
   let actividades = function(){
      $('main').children().hide();
      $('#actividades').show();
      $.getJSON('actividades.json')
         .done(cargaDatosActividades)
         .fail(mensajeError);
   }

   let cargaDatosActividades= function(response){
      let len = response[0].length;
      for(let i=0; i<len; i++){
         let imagen = response[0][i].ImgPonente;
         let nombreAct = response[0][i].NameActivity;
         let nombrePon = response[0][i].NamePonente;
         let empresa = response[0][i].Empresa;
         let hora = response[0][i].Hora;
         let infoAct = response[0][i].Info;

         let $contenido = "<div class='actividad' id='"+i+"' title ='"+nombreAct+"'>" +
         "<header>" + imagen +"</header>"+
         "<div class='content'><h3>" + nombreAct+"<h3>"+
         "<h4>" + nombrePon +"<span> ("+empresa+") </span></h4>" +
         "<span>"+hora+"</span>"+
         "<p>"+infoAct+"</p></div>"
         "</div>";

         switch(response[0][i].Dia){
            case 'Lunes':
               $("#Lunes").append($contenido);
               //$('#"+i+"')
            break;
            case 'Martes':
               $("#Martes").append($contenido);
            break;
            case 'Miércoles':
               $("#Miercoles").append($contenido);
            break;
            case 'Jueves':
               $("#Jueves").append($contenido);
            break;
            case 'Viernes':
               $("#Viernes").append($contenido);
            break;
            default:
            break;
         }
      }
   }
   let mensajeError = function(){
      $('main').html('no se ha podido leer el archivo');
   }

//PONENTES
let ponentes = function(){
  $('main').children().hide();
  $('#ponentes').show();
  $.getJSON('actividades.json')
     .done(cargarDatosPonentes)
     .fail(mensajeError);
}

let cargarDatosPonentes = function(response){
  let len = response[0].length;
  for(let i=0; i<len; i++){
     let imagen = response[0][i].ImgPonente;
     let nombrePon = response[0][i].NamePonente;
     let empresa = response[0][i].Empresa;
     let infoPon = response[0][i].InfoPon;

     let contenido = "<div class='ponente'>" +
     "<header>" + imagen +"</header>"+
     "<div class='content'>"+
     "<h4>" + nombrePon +"<span> ("+empresa+") </span></h4>" +
     "<p>"+infoPon+"</p></div>"
     "</div>";

     $("#ponentes").append(contenido);
     try{
        if (nombrePon===response[0][i+1].NamePonente){
           i++;                           
        }
     }catch{
        console.log();
     }
  }
}

//ASISTENTES
let formasistentes = function(){
   $('main').children().hide();
   $('#FormAsistentes').show('faster');

   //validacion   
   $('#FormAsistentes>form').validate({
      onBlur : true,
      eachValidField : function() {
        $(this).closest('div').removeClass('error').addClass('success');
      },
      eachInvalidField : function() {
        $(this).closest('div').removeClass('success').addClass('error');
      }
   });
   $.validateExtend({
      nombre : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[a-zA-Z]{3,}/
      },
      ap : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[a-zA-Z]{3,} [a-zA-Z]{3,}/
      },
      dni : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /^(\d{8})[- ]?([a-z])$/i
      },
      email : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/
      },
      opciones : {
         required : true,
         conditional : function(value) {
            return value;
         }
      }
   });
}

//SYSMANAS ANTERIORES
let mostrarSismanas = function(){   
   $('main').children().hide();
   $('#AllSysmanas').show('faster');
      $.getJSON("sysmanas.json")
         .done(insertarSysmanas);
}

let insertarSysmanas = function (data) {
   $("main").append("<div id='AllSysmanas'></div>");
   $("#AllSysmanas").append("<h2>Anteriores Sysmanas</h2>" +
      "<div id='listadoSysmanas'></div>");

   $.each(data, function (indice, sysmana) {

      $("#listadoSysmanas").append("" +
          "<div class='cartel'>" +
          "<img class='fotoCartel' src='" + sysmana.foto + "' alt=''>" +
          "<h3>" + sysmana.nombre + "</h3>" +
          "</div>"
      );
   });

   $(".fotoCartel").on("click", function () {

      $("#modalCarrusel").remove();

      $("main").append("<div id='modalCarrusel'></div>");
      $("#modalCarrusel").append("<div id='carrusel'></div>");

      $.each(data, function (indice, actividad) {
          $("#carrusel").append("<div><img src='" + actividad.foto + "' alt=''></div>");
      });

      $("#carrusel").slick({
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
      });

      $("#modalCarrusel").dialog({
          modal: true,
          resizable: false,
          draggable: false,
          width: 500,
          show: {
              effect: "blind",
              duration: 1000
          },
          hide: {
              effect: "explode",
              duration: 1000
          }
      });
   });
};

//LOGIN
let formLogin = function(){
   $('main').children().hide();
   $('#FormLogin').show('faster');

   $('#FormLogin>form').validate({
      onBlur : true,
      eachValidField : function() {
        $(this).closest('div').removeClass('error').addClass('success');
        
      $vali = true;
        return true;
      },
      eachInvalidField : function() {
        $(this).closest('div').removeClass('success').addClass('error');
        
      $vali = false;
        return false;
      }
   });
   $.validateExtend({
      usuario : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /^[a-z0-9_\\_\ü]+$/
      },
      pass : {
         required : true,
         conditional : function(value) {
            return value;
         },
         pattern : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      }
   });
  
   $("#user").val("jesus");
   $("#pass").val("Jesus123456");
   $('#enviarLogin').on('click', login);
    
}
let cargarMenuPonenteLogeado = function () {
   $('#login').remove();
   $("#menu").append("<li id='editar'><a href=''></a>Editar mis datos</li>" +
      "<li id='crear'><a href=''></a>Crear Ponencia</li>");
   $("header").append("<button id='cerrarSesion'>Cerrar sesión</button>");
   $('#cerrarSesion').on('click',logout)

      $("#crear").click(funcionCrear); 
};

let login = function () {
   $('main').children().hide();
   $('#FormRegistro').show('faster');
   if ($("#user").val() === "jesus" && $("#pass").val() === "Jesus123456") {
      cargarMenuPonenteLogeado();
      $("#errorLogin").text('');
      valfechas();
      $("#crear").click(funcionCrear);
      $("#editar").on('click', funcionEditar);
      $("#crear").on('click', funcionCrear);
   } else {
      $("#errorLogin").text("El usuario o la contraseña no coinciden");
   }
};

let logout = function(){
   location.reload();
};

//Editar mis datos
let valfechas = function(){
   $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
      dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
   };

   $.datepicker.setDefaults($.datepicker.regional['es']);

   let dateFormat = "dd-mm-yy",
      from = $("#diasPreferiblesFrom")
          .datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              showAnim: "drop",
              dateFormat: "dd-mm-yy",
              minDate: new Date("January 29, 2018"),
              maxDate: new Date("February 02, 2018")
          }).prop("readonly", "true")
          .on("change", function () {
              to.datepicker("option", "minDate", getDate(this));
          }),
      to = $("#diasPreferiblesTo").datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          showAnim: "drop",
          dateFormat: "dd-mm-yy",
          minDate: new Date("January 29, 2018"),
          maxDate: new Date("February 02, 2018")
      }).prop("readonly", "true")
         .on("change", function () {
              from.datepicker("option", "maxDate", getDate(this));
         });

   function getDate(element) {
      let date;
      try {
          date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
          date = null;
      }
      return date;
   };
}

