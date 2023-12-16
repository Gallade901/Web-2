const canvas = document.getElementById("graph"),
ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const errorElement = document.getElementById('error')

document.addEventListener('submit', function (event) {
    event.preventDefault()
    let messages = []
    let y = document.getElementById('input-y').value
    if (!validForm(y)) {
        messages.push('Невалидное поле Y')
    }

    if (messages.length > 0) {
        event.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
    else {
        errorElement.innerText = ""
    }
})

function validForm(y) {
    const regex = /^-?[0-9](\.[0-9]+)?$/
    if (regex.test(y)) {
        regex1 = /^-[0-2](\.[0-9]+)?$/
        regex2 = /^[0-4](\.[0-9]+)?$/
        if ((regex1.test(y)) || (regex2.test(y))) {
            return true;
        }
    }
    else {
        return false;
    }
}

//Окруж
function drowGraph() {

    let x = 50;
    let y = 50;
    ctx.beginPath();
    ctx.fillStyle = '#09f';
    ctx.arc(x * 5, y * 5, 75, 0, Math.PI / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x * 5, y * 5);
    ctx.lineTo(x * 6.5, y * 5);
    ctx.lineTo(x * 5, y * 6.5);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = '#09f';
    ctx.lineTo(x * 6.5, y * 5);
    ctx.lineTo(x * 5, y * 6.5);
    ctx.stroke();
    //Прямоугольник
    ctx.fillRect(x * 2, y * 3.5, 150, 75);
    //Треугольник
    ctx.beginPath();
    ctx.moveTo(x * 8, y * 5);
    ctx.lineTo(x * 5, y * 5);
    ctx.lineTo(x * 5, y * 3.5);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(x * 5, y);
    ctx.lineTo(x * 5, y * 9);
    ctx.moveTo(x * 5, y);
    ctx.lineTo(x * 5.2, y * 1.2)
    ctx.moveTo(x * 5, y);
    ctx.lineTo(x * 4.8, y * 1.2)
    ctx.moveTo(x, y * 5);
    ctx.lineTo(x * 9, y * 5);
    ctx.lineTo(x * 8.8, y * 5.2);
    ctx.moveTo(x * 9, y * 5);
    ctx.lineTo(x * 8.8, y * 4.8);
    ctx.moveTo(x * 4.9, y * 2);
    ctx.lineTo(x * 5.1, y * 2);
    ctx.moveTo(x * 4.9, y * 3.5);
    ctx.lineTo(x * 5.1, y * 3.5);
    ctx.moveTo(x * 4.9, y * 6.5);
    ctx.lineTo(x * 5.1, y * 6.5);
    ctx.moveTo(x * 4.9, y * 8);
    ctx.lineTo(x * 5.1, y * 8);
    ctx.moveTo(x * 2, y * 4.9);
    ctx.lineTo(x * 2, y * 5.1);
    ctx.moveTo(x * 3.5, y * 4.9);
    ctx.lineTo(x * 3.5, y * 5.1);
    ctx.moveTo(x * 6.5, y * 4.9);
    ctx.lineTo(x * 6.5, y * 5.1);
    ctx.moveTo(x * 8, y * 4.9);
    ctx.lineTo(x * 8, y * 5.1);
    ctx.font = "20px Arial";
    ctx.fillText("y", x * 5.1, y);
    ctx.fillText("x", x * 9, y * 4.9);
    ctx.fillText("R", x * 5.2, y * 2.1);
    ctx.fillText("R/2", x * 5.2, y * 3.6);
    ctx.fillText("-R/2", x * 5.2, y * 6.6);
    ctx.fillText("-R", x * 5.2, y * 8.1);
    ctx.fillText("-R", x * 2.1, y * 4.8);
    ctx.fillText("-R/2", x * 3.6, y * 4.8);
    ctx.fillText("R/2", x * 6.6, y * 4.8);
    ctx.fillText("R", x * 8.1, y * 4.8);
    ctx.stroke();
}

let points = localStorage.getItem('points');
if (points == null) {
    points = [];
} else {
   points = JSON.parse(points);
}

$("#inpform").on('submit', function(e) {
   e.preventDefault();
   let x = $('input[name="x"]:checked').val();
   let y = $('#input-y').val();
   let r = $('select[name="radius"]').val();
   if (!validForm(y)) {
       return;
   }
   points.push({x: x, y: y});
   localStorage.setItem('points', JSON.stringify(points));
   localStorage.setItem('rad', JSON.stringify(r));
   let formData = {
       x: x,
       y: y,
       r: r
   };
   $.ajax({
       type: "POST",
       url: "controller", // URL-путь к вашему сервлету
       data: formData,
       success: function(response) {
            window.location.replace("result_page.jsp");
       },
       error: function(xhr, status, error) {
           console.error(xhr.responseText);
       }
   });
});

canvas.addEventListener("click", function(event) {
   let rect = canvas.getBoundingClientRect();
   let x = (event.clientX - rect.left);
   let y = (event.clientY - rect.top);
   let r = $('select[name="radius"]').val();
   x = (x - 250) / 150 * r;
   y = (-(y - 250)) / 150 * r;
   points.push({x: x, y: y});
   localStorage.setItem('points', JSON.stringify(points));
   localStorage.setItem('rad', JSON.stringify(r));
   // Отправка координат точки на сервер
   let formData = {
       x: x,
       y: y,
       r: r
   };
   $.ajax({
       type: "POST",
       url: "controller",
       data: formData,
       success: function(response) {
            window.location.replace("result_page.jsp");
       },
       error: function(xhr, status, error) {
           console.error(xhr.responseText);
       }
   });
});

let radiusSelect = document.querySelector('select[name="radius"]');

function redrawPoints() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drowGraph();
   let savedPointsString = localStorage.getItem('points');
   if (savedPointsString != null) {
       let savedPoints = JSON.parse(savedPointsString);
       let r = radiusSelect.value; // get the current radius
       for (let i = 0; i < savedPoints.length; i++) {
          let point = savedPoints[i];
          if (checkArea(point.x, point.y, r)) {
              ctx.fillStyle = 'green';
          } else {
              ctx.fillStyle = "red";
          }
          let scaledX = point.x / r * 150 + 250; // scale the x coordinate
          let scaledY = (-(point.y / r * 150)) + 250; // scale the y coordinate
          ctx.beginPath();
          ctx.arc(scaledX, scaledY, 4, 0, Math.PI * 2);
          ctx.fill();

      }
   }
}

document.addEventListener("DOMContentLoaded", function() {
    let savedRad = localStorage.getItem('rad');
    let num2 = JSON.parse(savedRad);
    let num = Number(num2);
    num -= 1;
    if (savedRad != null) {
        radiusSelect.selectedIndex = num;
    } else {
        radiusSelect.selectedIndex = 1;
    }
    redrawPoints();
});

radiusSelect.addEventListener('change', redrawPoints);
document.getElementById('clearTable').addEventListener('click', function() {
   $.ajax({
              type: "POST",
              url: "controller", // URL-путь к вашему сервлету
          });
   window.location.reload();
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   localStorage.removeItem('points');
    $("#resultTable tbody").empty();
   redrawPoints();
});


function checkArea(xd, yd, rd) {
   let x = new Decimal(xd);
   let y = new Decimal(yd);
   let r = new Decimal(rd);

   if ((x.gte(-r) && y.lte(r.div(2)) && x.lte(0) && y.gte(0)) ||
      (((r.div(2)).pow(2)).gte(x.pow(2).plus(y.pow(2))) && (x.gte(0) && y.lte(0))) ||
      (y.lte(x.neg().div(2).plus(r.div(2))) && x.gte(0) && y.gte(0))) {
      return true;
   } else {
       return false;
   }
}




