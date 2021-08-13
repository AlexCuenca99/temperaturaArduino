const socket = io();

socket.on('temperatura', function(data){
    
    let temperaturaVal = document.getElementById('temperatura');
    let temperatura = data;

    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth();
    d = n.getDate();

    var monthArr = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre","Diciembre"];
    m = monthArr[m];

    document.getElementById("date").innerHTML = d + " de " + m + " del " + y;

    if ( temperatura >= 26 ){
        document.getElementById("cambiarBack").classList.remove('from-green-300', 'via-blue-500', 'to-purple-600');
        document.getElementById("cambiarBack").classList.add('from-pink-500', 'via-red-500', 'to-yellow-500');
        
        //console.log(document.getElementById("cambiarBack").classList);
        temperaturaVal.innerHTML = `${data} °C`
        document.getElementById('avisoTemp').innerHTML = 'La temperatura subio. Se encendera el ventilador.';
    }else{
        
        document.getElementById("cambiarBack").classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500');
        document.getElementById("cambiarBack").classList.add('from-green-300', 'via-blue-500', 'to-purple-600');
        
        document.getElementById('avisoTemp').innerHTML = 'La temperatura es normal.';
        temperaturaVal.innerHTML = `${data}°C`
    }
})