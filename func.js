var tbl_select = document.getElementById('tbl-select');
var main_tbl = document.getElementById('main-tbl');
var welcome = document.getElementById('welcome');

var headers = new Array();
var values = new Array();

// Загрузка списка таблиц выбранной БД
window.addEventListener("load",function() {

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
  main_tbl.classList.remove("d-none");
  document.getElementById('new-btn').classList.remove("d-none");
  // Очистка массива
  headers.length = 0;
  values.length = 0;

  get_table_content();
});


function get_table_content() {
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
        del_btn.classList.add("btn", "btn-outline-danger", "del-btn");
        del_btn.setAttribute("type", "button");
        del_btn.innerHTML = "Удалить";
        del_btn.setAttribute("data-id", i);
        del_btn.addEventListener('click', del_func);
      }
    }
  });
}



function del_func() {
  var id = this.getAttribute("data-id");
  //alert(id);
  var attr = "";
  attr += "db_table=" + tbl_select.value + "&";
  //query = "DELETE FROM " + tbl_select.value + " WHERE ";
  for (var i = 0; i < headers.length; i++) {
    if (values[id][i] == "" || values[id][i] == null) continue;
    attr += headers[i] + "=" + values[id][i] + "&";
  }
  attr = attr.slice(0, -1);

  $.ajax({
    url: "delete.php",
    type: 'POST',
    method: 'POST',
    data: attr,
    dataType: 'text',
    success: function(response){
      console.log("success!");
      console.log(response);
      get_table_content();
    },
    error: function(response){
      console.log("error!");
      console.log(response);
      get_table_content();
    }
  });
}



$('#editModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);

  var edit_form = document.getElementById('edit-form');
  edit_form.innerHTML = "";

  var hidden1 = document.createElement("INPUT");
  edit_form.appendChild(hidden1);
  hidden1.setAttribute("type", "hidden");
  hidden1.setAttribute("name", "db_table");
  hidden1.value = tbl_select.value;

  var hidden2 = document.createElement("INPUT");
  edit_form.appendChild(hidden2);
  hidden2.setAttribute("type", "hidden");
  hidden2.setAttribute("name", "index");
  hidden2.value = headers[0];

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
    input.setAttribute("type", "text");
    input.setAttribute("id", headers[k]);
    input.setAttribute("name", headers[k]);
    input.value = values[button.data("id")][k];
  }
})


document.getElementById('edit-form').addEventListener("submit",function() {
  $.ajax({
    url: "update.php",
    type: 'POST',
    method: 'POST',
    data: $("#edit-form").serialize(),  // Сериализуем объект
    dataType: 'text',
    //dataType: 'json',
    success: function(response){
      console.log("success!");
      console.log(response);
      get_table_content();
    },
    error: function(response){
      console.log("error!");
      console.log(response);
    }
  });
  $('#editModal').modal('hide');
  // Предотвращаем перезагрузку страницы
  event.preventDefault();
  return false;
});


$('#newModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);

  var new_form = document.getElementById('new-form');
  new_form.innerHTML = "";

  var hidden1 = document.createElement("INPUT");
  new_form.appendChild(hidden1);
  hidden1.setAttribute("type", "hidden");
  hidden1.setAttribute("name", "db_table");
  hidden1.value = tbl_select.value;

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
    input.setAttribute("name", headers[k]);
  }
})

document.getElementById('new-form').addEventListener("submit",function() {
  $.ajax({
    url: "insert.php",
    type: 'POST',
    method: 'POST',
    data: $("#new-form").serialize(),  // Сериализуем объект
    dataType: 'text',
    success: function(response){
      console.log("success!");
      console.log(response);
      get_table_content();
    },
    error: function(response){
      console.log("error!");
      console.log(response);
    }
  });
  $('#newModal').modal('hide');
  // Предотвращаем перезагрузку страницы
  event.preventDefault();
  return false;
});
