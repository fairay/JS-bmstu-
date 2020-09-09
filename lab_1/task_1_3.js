"use strict";
let EPS = 1e-5;
// Хранилище информации о точек
let data = [];
let point_t =
{   x: 0,
    y: 0 };

function new_point(x_, y_)
{
    return { x: x_,     y: y_ };
}
function point_str(p)
{
    return ("(" + p.x + ", " + p.y + ")");
}
function print_point(p)    
{
    console.log("> " + point_str(p)+ ";");
}


function find_index(x_, y_)
{
    for (let i=0; i<data.length; i++)
    {
        if (Math.abs(data[i].x - x_) < EPS && 
            Math.abs(data[i].y - y_) < EPS)
            return i;
    }
    return -1;
}
function find_distance(p1, p2)
{
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}
function max_distance()
{
    if (data.length < 2)
    {
        console.log("Недостаточно точек для операции");
        return;
    }

    let p1=0, p2=1;
    let max_d = find_distance(data[p1], data[p2]);
    for (let i=0; i<data.length; i++)
        for (let j=1+i; j<data.length; j++)
        {
            let d = find_distance(data[i], data[j]);
            if (d > max_d)
            {
                max_d = d;
                p1 = i;
                p2 = j;
            }
        }
    
    console.log("Максимальное расстояние: от " + point_str(data[p1]) + 
    " до " + point_str(data[p2]) + " равно " + max_d);
}


function lower_ox()     // Вывод точек ниже оси ОХ
{
    function cmp(p) {
        return p.y < 0;
    }
    print_by_key(cmp, "Ниже оси OX");
}
function higher_ox()    // Вывод точек выше оси ОХ
{
    function cmp(p) {
        return p.y > 0;
    }
    print_by_key(cmp, "Выше оси OX");
}
function to_left_oy()   // Вывод точек левее оси ОY
{
    function cmp(p) {
        return p.x < 0;
    }
    print_by_key(cmp, "Левее оси OY");
}
function to_right_oy()  // Вывод точек правее оси ОY
{
    function cmp(p) {
        return p.x > 0;
    }
    print_by_key(cmp, "Правее оси OY");
}
function closer_then(x_, y_, dist)      // Вывод точек удалённых от (x,y) меньше, чем на dist
{
    if (dist < 0) {
        console.log("Ошибка: отрицательное расстояние");
        return;
    }
    let p0 = new_point(x_, y_);
    function cmp(p) {
        return (find_distance(p, p0) < dist)
    }
    
    print_by_key(cmp, "Расстояние от ("+x_+", "+y_+") не превышает " + dist);
}
function inside_zone(x_min, x_max, y_min, y_max)    // Вывод точек внутри зоны от (x_min, y_min) до (x_max, y_max)
{
    if (x_min > x_max || y_min > y_max) {
        console.log("Некорректные параметры зоны");
    }
    function cmp(p){
        return (x_min<=p.x && x_max>=p.x) && (y_min<=p.y && y_max>=p.y);
    }

    print_by_key(cmp, "Внутри зоны от ("+x_min+", "+y_min+") до ("+x_max+", "+y_max+")");
}


function print_by_key(func, f_name="Признак не указан")     // Функция, выводящая точки по функции-компаратору
{
    let count = 0;
    console.log("\nТочки по признаку: " + f_name +  ":");
    for (let i=0; i<data.length; i++)
    {
        let p = data[i];
        if (func(p))
        {
            print_point(p);
            count++;
        }
    }

    if (!count)
    {
        console.log("Точки не найдены");
    }
}

// CDIO data
function CREATE(x_, y_)
{
    let new_p =
    {   x: x_, y: y_};
    data.push(new_p);
}
function DELETE(x_, y_)
{
    let i = find_index(x_, y_);
    if (i != -1)
        data.splice(i, 1);
    else
        console.log("Точка (" + x_ + ", " + y_ + ") не найдена");
}
function READ()
{
    if (!data.length) {
        console.log("Хранилище не содержит записей.");
        return;
    }
    
    console.log("\nСписок всех точек:");
    for (let i=0; i < data.length; i++)
    {
        print_point(data[i]);
    }
}
function UPDATE(old_x, old_y, x_, y_)
{
    let i = find_index(old_x, old_y);
    if (i != -1)
    {
        data[i].x = x_;
        data[i].y = y_;
    }
    else
        console.log("Точка (" + old_x + ", " + old_y + ") не найдена");
}
function CLEAR()
{
    data = [];
}

function test_1()
{
    console.log("\nСоздание записей");
    CREATE(1, 0);
    CREATE(1, 0);
    CREATE(2, 0);
    CREATE(2, -3.14);
    CREATE(4, 0);
    READ();

    console.log("\nУдаление записей");
    DELETE(1, 0);
    DELETE(2, 0);
    DELETE(3, 0);
    READ();

    console.log("\Обновление записей");
    UPDATE(5, 5, 10, 10);
    UPDATE(4, 0, 5, 5);
    READ();
}
function test_2()
{
    CREATE(1, 0);
    CREATE(1, 0);
    CREATE(2, 0);
    CREATE(2, -3.14);
    CREATE(4, 0);
    CREATE(-3, 5);
    CREATE(0, 0);
    READ();

    max_distance();
    closer_then(0, 0, 3);
    inside_zone(-1, 1, 0, 2);

    lower_ox();
    higher_ox();
    to_left_oy();
    to_right_oy();
}


function main()
{
    test_2();
}

console.log("\n______________________________________________________________");
main();
console.log("______________________________________________________________\n");
