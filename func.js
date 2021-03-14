window.addEventListener("load",function() {

  var tbl_select = document.getElementById('tbl-select');

  $.ajax({
    url: 'connect.php',
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

      //Отладочный вывод: welcome.innerHTML = json;
      tbl_select.innerHTML = "";
      json.forEach((item, i) => {
        tbl_select.innerHTML += "<option value=\"" + item + "\">" + item + "</option>";
      });
    }
  });
});



document.getElementById('tbl-show').addEventListener("click",function() {
  var tbl_select = document.getElementById('tbl-select');
  var main_tbl = document.getElementById('main-tbl');
  var welcome = document.getElementById('welcome');

  let headers = new Array();

  main_tbl.classList.remove("d-none");

  $.ajax({
    url: 'get_table_content.php?tbl=' + tbl_select.value + "&data=all",
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

      // Вывод заголовков таблицы
      var thead_row = main_tbl.children[0].children[0];

      thead_row.innerHTML = "";

      json[0].forEach((col_head) => {
        thead_row.innerHTML += "<th scope=\"col\">" + col_head + "</th>";
        headers.push(col_head);
      });


      var tbody = main_tbl.children[1];
      tbody.innerHTML = "";
      // Вывод контента таблицы
      console.log(json);
      console.log(headers);
      for (let i = 0; i < json.slice(1).length; i++) {
        // Выводим таблицу
        item = json.slice(1)[i];
        var row = document.createElement("TR");
        tbody.appendChild(row);
        for (let j = 0; j < headers.length; j++) {
          var td = document.createElement("TD");
          row.appendChild(td);
          td.innerHTML = item[headers[j]];
        }
      }
    }
  });
});
