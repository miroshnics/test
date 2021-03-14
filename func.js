
var headers = new Array();

// Загрузка списка таблиц выбранной БД
window.addEventListener("load",function() {

  var tbl_select = document.getElementById('tbl-select');

  $.ajax({
    url: 'connect.php',
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

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
  // Очистка массива
  headers.length = 0;

  $.ajax({
    url: 'get_table_content.php?tbl=' + tbl_select.value,
    type: 'GET',
    method: 'GET',
    dataType: 'json',
    success: function(json){

      // Вывод заголовков таблицы
      var thead_row = main_tbl.children[0].children[0];
      thead_row.innerHTML = "";
      json[0].forEach((col_head) => {
        var th = document.createElement("TH");
        thead_row.appendChild(th);
        th.innerHTML = col_head;
        headers.push(col_head);
      });
      // Кнопки редактирования и удаления
      var th_edit_del = document.createElement("TH");
      thead_row.appendChild(th_edit_del);
      th_edit_del.innerHTML = "Редактировать/Удалить";

      // Вывод контента таблицы
      var tbody = main_tbl.children[1];
      tbody.innerHTML = "";
      for (let i = 0; i < json.slice(1).length; i++) {
        item = json.slice(1)[i];
        var row = document.createElement("TR");
        tbody.appendChild(row);
        for (let j = 0; j < headers.length; j++) {
          var td = document.createElement("TD");
          row.appendChild(td);
          td.innerHTML = item[headers[j]];
        }
        var td_edit_del = document.createElement("TD");
        row.appendChild(td_edit_del);
        td_edit_del.innerHTML = "<button type=\"button\" class=\"btn btn-outline-primary mr-2\" data-target=\"#editModal\">Редактировать</button><button type=\"button\" class=\"btn btn-outline-danger\">Удалить</button>";
      }
    }
  });
});

$('#editModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data('whatever'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  //modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient);

  for (let j = 0; j < headers.length; j++) {
    var td_edit = document.createElement("TD");
  }
})
