window.addEventListener("load",function() {

var tbl_select = document.getElementById('tbl-select');
var welcome = document.getElementById('welcome');

$.ajax({
  url: 'connect.php',
  type: 'GET',
  method: 'GET',
  dataType: 'json',
  success: function(json){

    welcome.innerHTML = json;
    tbl_select.innerHTML = "";
    json.forEach((item, i) => {
      tbl_select.innerHTML += "<option value=\"" + item + "\">" + item + "</option>";
    });
  }
});
});
