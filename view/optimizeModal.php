<!-- Modal Edit -->
<div class="modal fade" id="optimizeModal" tabindex="-1" aria-labelledby="optimizeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="optimizeModalLabel">Варианты оптимизации и улучшения</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item">Добавить форму, предоставляющую возможность выбора хоста, типа БД, указания логина и пароля (т.е. не через файл).</li>
          <li class="list-group-item">Добавить анимацию процесса подключения к БД, индикацию успешного или неуспешного соединения или выполнения команд. Например, уведомление всплывающим сообщением.</li>
          <li class="list-group-item">При получении содержимого таблиц помечать поле, являющееся ключом таблицы, и в форме редактирования записи запрещать редактировать это поле. Либо: анализировать таблицу по каждому полю (столбцу), выявляя ключ таблицы, содержащий уникальные значения для каждой записи. В этом случае учесть, что ключ может быть составным (состоящим из нескольких или даже всех полей).</li>
          <li class="list-group-item">При получении содержимого таблиц указывать типы полей, и разрешать вводить данные в поля ввода только в подходящем формате.</li>
          <li class="list-group-item">Перед вводом значений в БД экранировать введенный текст для предотвращения SQL-инъекций.</li>
          <li class="list-group-item">Обновлять таблицу (или выводить уведомление), если БД была изменена другим приложением.</li>
          <li class="list-group-item">Добавить сортировку таблицы по столбцам.</li>
        </ul>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
</div>
