
var headers = new Array();
var values = new Array();

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
  document.getElementById('new-btn').classList.remove("d-none");
  // Очистка массива
  headers.length = 0;
  values.length = 0;

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
      // Последняя графа таблицы для кнопок редактирования и удаления
      var th_edit_del = document.createElement("TH");
      thead_row.appendChild(th_edit_del);
      th_edit_del.innerHTML = "Редактировать/Удалить";

      // Вывод контента таблицы
      var tbody = main_tbl.children[1];
      tbody.innerHTML = "";

      // построчно <tr>
      for (let i = 0; i < json.slice(1).length; i++) {
        item = json.slice(1)[i];
        var row = document.createElement("TR");
        tbody.appendChild(row);
        values.push(new Array());

        // поэлементно <td>
        for (let j = 0; j < headers.length; j++) {
          var td = document.createElement("TD");
          row.appendChild(td);
          td.innerHTML = item[headers[j]];
          values[i].push(item[headers[j]]);
        }
        // Кнопки редактирования и удаления
        var td_edit_del = document.createElement("TD");
        row.appendChild(td_edit_del);

        var edit_btn = document.createElement("BUTTON");
        td_edit_del.appendChild(edit_btn);
        edit_btn.classList.add("btn", "btn-outline-primary", "mr-2");
        edit_btn.setAttribute("type", "button");
        edit_btn.setAttribute("data-toggle", "modal");
        edit_btn.setAttribute("data-target", "#editModal");
        edit_btn.innerHTML = "Редактировать";
        edit_btn.setAttribute("data-id", i);

        var del_btn = document.createElement("BUTTON");
        td_edit_del.appendChild(del_btn);
        del_btn.classList.add("btn", "btn-outline-danger");
        del_btn.setAttribute("type", "button");
        del_btn.innerHTML = "Удалить";
      }
    }
  });
});


$('#editModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);

  var edit_form = document.getElementById('edit-form');
  edit_form.innerHTML = "";

  var hidden = document.createElement("INPUT");
  edit_form.appendChild(hidden);
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "db_table");
  hidden.value = tbl_select.value;

  for (var k = 0; k < headers.length; k++) {
    var form_group = document.createElement("DIV");
    var label = document.createElement("LABEL");
    var input = document.createElement("INPUT");

    edit_form.appendChild(form_group);
    form_group.classList.add("form-group");

    form_group.appendChild(label);
    label.setAttribute("for", headers[k]);
    label.innerHTML = headers[k];

    form_group.appendChild(input);
    input.classList.add("form-control");
    input.setAttribute("id", headers[k]);
    input.value = values[button.data("id")][k];
  }
})

$('#newModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var tbl_select = document.getElementById('tbl-select');

  var new_form = document.getElementById('new-form');
  new_form.innerHTML = "";

  var hidden = document.createElement("INPUT");
  new_form.appendChild(hidden);
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("name", "db_table");
  hidden.value = tbl_select.value;

  for (var k = 0; k < headers.length; k++) {
    var form_group = document.createElement("DIV");
    var label = document.createElement("LABEL");
    var input = document.createElement("INPUT");

    new_form.appendChild(form_group);
    form_group.classList.add("form-group");

    form_group.appendChild(label);
    label.setAttribute("for", headers[k]);
    label.innerHTML = headers[k];

    form_group.appendChild(input);
    input.classList.add("form-control");
    input.setAttribute("id", headers[k]);
  }
})
