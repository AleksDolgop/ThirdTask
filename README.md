# Задание 3

В задании необходимо создать игру "Найди пару". 
Для этого я создал три массива.
1) colors - содежит коды цветов в 16ричной системе.
2) cellsShowColor - содержит номера цветов, которые отображаются на поле в данный момент.
3) cellsHideColor - содержит номера цветов, которые скрыты(пары одинаковых цветов).

Игра не функционирует, если:
1) Не запущена кнопкой "Старт"
2) Остановлена кнопкой "Стоп".
3) После победы.

Секундомер работает за счет setInterval. При нажатии кнопки "Старт", она меняет свое название на "Стоп", 
флаг begined переключается на true. В interval записывается индефикатор setInterval. При повторном нажатии на кнопку, игра останавливается.

При открытии первой ячейки в переменную lastIdCell записывается id этой ячейки и показывается ее цвет. Открывая вторую ячейку,
происходит сравнение номеров цветов предидущей открытой ячейки и ячейки открытой сейчас. Если номера цветов равны,
то обе ячейки остаются с открытыми цветами до конца игры. Проверяется массив с открытыми цветами, если он не содежит цвета под
номером 0(белый), значит все ячейки были открыты и игра завершается. Останавливается секундомер и выводится сообщение о попеде и
затраченное время.

Для запуска необходимо:
1) Скачать архив.
2) Разархивировать в любую пустую папку
3) Открыть в браузере index.html
