
//Собственная сортировка(перемешивание) cellHideColor
function randomCellsHideColor(a, b)
{
    return Math.random() -0.5;
}

//Секундомер
function stopWatch(){

    //Записываем индификатор интервала, чтобы была возможность его остановить в дальнейшем.
    game.interval = setInterval(function(){
        //Интервал срабатывает каждые 4 мсек. увеличиваем значение переменной msec на 4.
        game.timer.msec = String(+game.timer.msec + 4);

        //Проверяем на переполнение. При удолетворении условию, увеличиваем sec на 1.
        if (+game.timer.msec > 999){
            game.timer.msec = '000';
            game.timer.sec = String(+game.timer.sec + 1);
        }

        //Проверяем на переполнение. При удолетворении условию, увеличиваем min на 1.
        if (+game.timer.sec > 59){
            game.timer.sec = '00';
            game.timer.min = String(+game.timer.min + 1);              
        }

        //Форматирование. Докидываем недостающие нули.
        if (+game.timer.msec < 100){
            game.timer.msec = '0' + (+game.timer.msec);
        }
        
        //Форматирование. Докидываем недостающие нули.
        if (+game.timer.msec < 10){
            game.timer.msec = '0' + (+game.timer.msec);
        }
    
        //Форматирование. Докидываем недостающие нули.
        if (+game.timer.sec < 10){
            game.timer.sec = '0' + (+game.timer.sec);
        }

        //Форматирование. Докидываем недостающие нули.
        if (+game.timer.min < 10){
            game.timer.min = '0' + (+game.timer.min);
        }     
    },
    4);
}

//Объект калькулятор.   
const game = new Vue({
    el: '#game',
    data: {
        //Хранит время с момента запуска игры.
        timer: {
            min: '00',
            sec: '00',
            msec: '000',
        },

        //Цвета отображающиеся в данный момент.
        cellsShowColor: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

        //Хранит нормера цветов в ячейках;
        cellsHideColor: [ 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8 ],

        //Все цвета используемые в игре.
        colors: [ '#fff', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#08f', '#f80' ],
        
        //Хранит id последней нажатой ячейки, либо null.
        lastIdCell: null,

        //Флаг работающей игры.
        begined: false,

        //Для хранения индефикатора интервала.
        interval: null
    },
    methods:{
        //Запуск игры.
        startGame(){
            //Если игра уже запущена, то она останавливается
            if (this.begined)
            {
                clearInterval(this.interval);
                this.begined = false;
                
                //Обнуление времени
                this.timer.min = '00';
                this.timer.sec = '00';
                this.timer.msec = '000';
                
                //Окрашиаем поле в белый
                for (let i = 0; i < 16; i++){
                    Vue.set(this.cellsShowColor, i, 0);
                }
                return;           
            }

            //Перемешиваем цвета 10 раз.
            this.cellsHideColor = this.cellsHideColor.sort(randomCellsHideColor);          
          
            //Окрашиаем поле в белый
            for (let i = 0; i < 16; i++){
                Vue.set(this.cellsShowColor, i, 0);
            }
        
            //Обнуление времени
            this.timer.min = '00';
            this.timer.sec = '00';
            this.timer.msec = '000';

            this.begined  = true;

            //Запуск секундомера
            stopWatch();
        },

        //Получаем id нажатой клетки.
        //Проверяем пытаемся открыть первую или вторую ячейку.
        //Если номера цветов предидущей ячейки и новой совпадут, то цвета останутся на поле.
        cellClick(cellId){
            cellId = cellId.i;
            //Проверка на возможный клик по уже открытой ячейке.
            if (!this.begined || this.cellsShowColor[cellId - 1] != 0){
                return;
            }

            //Попытка открыть первую или вторую ячейку.
            if (this.lastIdCell == null){
                this.lastIdCell = cellId - 1;
                Vue.set(this.cellsShowColor, this.lastIdCell, this.cellsHideColor[this.lastIdCell])
            }else{
                //Если номера цветов открытых ячеек совпадают. То цвета остаются на месте. А иначе. Предидущая открытая ячейка окрашивается в белый
                if (this.cellsHideColor[this.lastIdCell] === this.cellsHideColor[cellId - 1]){
                    Vue.set(this.cellsShowColor, cellId - 1, this.cellsHideColor[cellId - 1])                  
                }else{
                    Vue.set(this.cellsShowColor, this.lastIdCell, 0);                
                }

                this.lastIdCell = null;
            }   

            //Чтобы реактивность успела подменить последнюю открытую ячейку, используется setTimeout.
            setTimeout(function(){
                if(game.cellsShowColor.indexOf(0) === -1)
                {
                    game.begined = false;
                    clearInterval( game.interval );
                    alert('Вы выйграли!\nЗатраченное время: ' + game.timer.min + ':' + game.timer.sec + '.' + game.timer.msec);
                }
            }, 50);         
        },        
    }
});

