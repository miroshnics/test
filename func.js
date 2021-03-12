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

  main_tbl.classList.remove("d-none");
  alert(tbl_select.value);

  $.ajax({
    url: 'get_table_content.php?tbl=' + tbl_select.value + "&data=head",
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

      var thead_row = main_tbl.children[0].children[0]
      console.log(thead_row);

      thead_row.innerHTML = "";

      json.forEach((col_head) => {
        thead_row.innerHTML += "<th scope=\"col\">" + col_head + "</th>";
      });
    }
  });

  $.ajax({
    url: 'get_table_content.php?tbl=' + tbl_select.value + "&data=content",
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

      var tbody = main_tbl.children[1];
      console.log(tbody);

      tbody.innerHTML = "";

      /*json.forEach((item, i) => {
        thead_row.innerHTML += "<th scope=\"col\">" + item + "</th>";
      });*/
    }
  });
});
