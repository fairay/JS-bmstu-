"use strict";
// Хранилище информации о студентах
let data = [];
let student_t = 
{   group : null,
    id :    null, 
    marks : null };

function print_student(st)
{
    if (st.marks.length)
        console.log("> №"+ st.id + ", " + st.group + " : " + st.marks);
    else
        console.log("> №"+ st.id + ", " + st.group + " : без оценок");
}

function is_id_in(id_)
{
    for (let i=0; i < data.length; i++)
    {
        if (data[i].id == id_)
            return true;
    }
    return false;
}
function find_index(id_)
{
    for (let i=0; i < data.length; i++)
    {
        if (data[i].id == id_)
                return i;
    }
    return -1;
}


function average_mark(id_)  // Средняя оценка указанного студента
{
    let pos = find_index(id_);
    if (pos == -1)
    {
        console.log("Запись не найдена: № билета " + id_ + " нет в хранилище.");
        return;
    }

    let st = data[pos];
    if (st.marks.length != 0)
    {
        let sum = 0;
        for (let i=0; i < st.marks.length; i++)
            sum += st.marks[i];
        sum /= st.marks.length;
        console.log("Средняя оценка студента №" + st.id + " равна " + sum);
    }
    else
    {
        console.log("Студент №" + st.id + " не имеет оценок");
    }
}
function print_group(group_)    // Вывод студентов данной группы
{
    let count = 0;
    console.log("Информация о студентах группы " + group_ + ":");
    for (let i=0; i<data.length; i++)
    {
        if (data[i].group == group_)
        {
            print_student(data[i]);
            count++;
        }
    }

    if (!count)
    {
        console.log("Студенты заданной группы не найдены");
    }
}
function most_marks_group(group_)   // Получение студента с наибольшим количеством оценок в данной группе
{
    let st = null;
    console.log("Информация о студентах группы " + group_ + ":");
    for (let i=0; i<data.length; i++)
    {
        if (data[i].group == group_)
        {
            if (!st || st.marks.length < data[i].marks.length)
                st = data[i]
        }
    }

    if (st)
    {
        console.log("Студент группы " + group_ + " с наибольшим количеством оценок:");
        print_student(st);
    }
    else
    {
        console.log("Студенты заданной группы не найдены");
    }
}
function no_marks()     // Получение студентов без оценок
{
    let count = 0;
    console.log("Информация о студентах без оценок:");
    for (let i=0; i<data.length; i++)
    {
        if (!data[i].marks.length)
        {
            print_student(data[i]);
            count++;
        }
    }

    if (!count)
    {
        console.log("Студенты без оценок не найдены");
    }
}

/// CDIO data
function CREATE(group_, id_, marks_=[])
{
    if (!is_id_in(id_))
    {
        let new_st = 
        {   group : group_,
            id :    id_, 
            marks : marks_ };

        data.push(new_st);
    }
    else
    {
        console.log("Запись не добавлена: № билета " + id_ + " уже в хранилище.");
    }
}
function DELETE(id_)
{
    let i = find_index(id_);
    if (i != -1)
    {
        data.splice(i, 1);
    }
    else
    {
        console.log("Запись не удалена: № билета " + id_ + " не в хранилище.");
    }
}
function READ()
{
    if (!data.length) {
        console.log("Хранилище не содержит записей.");
        return;
    }
    
    console.log("\nСписок всех студентов (> № билета, группа : оценки):");
    for (let i=0; i < data.length; i++)
    {
        print_student(data[i]);
    }
}
function UPDATE(pre_id, group_, id_, marks_)
{
    let i = find_index(pre_id);
    if (i != -1)
    {
        data[i].group = group_;
        data[i].id = id_;
        data[i].marks = marks_;
    }
    else
    {
        console.log("Запись не обновлена: № билета " + pre_id + " не в хранилище.");
    }
}
function CLEAR()
{
    data = [];
}

function test_1()
{
    CLEAR();
    console.log("\nСоздание записей");
    CREATE("IU7-21", 1, [4]);
    CREATE("IU7-11", 0, []);
    CREATE("SM21-41", 151, [5, 2, 3]);
    CREATE("BMT3-61", 151, [5, 2, 3]);
    CREATE("IU7-45", 110, [2, 2, 2]);
    CREATE("IU7-45", 210, [5, 5, 5]);
    READ();

    console.log("\Удаление записей");
    DELETE(51);
    DELETE(151);
    READ();

    console.log("\Обновление записей");
    UPDATE(2, "Nope-21", 2, []);
    UPDATE(110, "IU7-52", 110, [2, 2, 2, 3]);
    READ();
}
function test_2()
{
    CLEAR();
    CREATE("IU7-21", 1, [4]);
    CREATE("IU7-11", 0, []);
    CREATE("SM21-41", 151, [5, 2, 3]);
    CREATE("IU7-45", 110, [2, 2, 2, 3]);
    CREATE("IU7-45", 210, [5, 5, 5]);
    CREATE("IU7-45", 220);
    READ();

    console.log("\nСредние оценки:\n");
    average_mark(1);
    average_mark(0);
    average_mark(100);
    average_mark(151);

    console.log("\nПоиск по группе:");
    print_group("IU7-45");
    print_group("IU7-42");
    print_group("SM21-41");

    console.log("\nСуденты по группы с наибольшим числом оценок:");
    most_marks_group("IU7-45");
    most_marks_group("IU7-42");
    most_marks_group("IU7-11");

    no_marks();
}

function main()
{
    test_2();
}

console.log("\n______________________________________________________________\n");
main();
console.log("\n______________________________________________________________\n");
