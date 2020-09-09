"use strict";
// Хранилище информации о детях
let data = [];

function print_kid(kid)
{
    console.log("> " + kid.surname + " : " + kid.age);
}

function is_surname_in(surname_)
{
    for (let i=0; i < data.length; i++)
    {
        if (data[i].surname == surname_)
                return true;
    }
    return false;
}
function find_index(surname_)
{
    for (let i=0; i < data.length; i++)
    {
        if (data[i].surname == surname_)
                return i;
    }
    return -1;
}


function average_age()  // Вычисление среднего возраста
{
    let sum = 0;
    for (let i=0; i < data.length; i++)
        sum += data[i].age;
    return parseInt(sum/data.length);
}
function oldest_kid()   // Поиск самого старшего ребёнка
{
    if (data.length == 0) return null;
    let max_i = 0;
    for (let i=1; i < data.length; i++)
    {
        if (data[i].age > data[max_i].age)
            max_i = i;
    }
    return data[max_i];
}
function in_adge_range(begin, end)  // Дети с возрастом в заданном отрезке
{
    let count = 0;
    console.log("Дети с возрастом от " + begin + " до " + end + " лет:");
    for (let i=0; i < data.length; i++)
    {
        if (begin <= data[i].age && data[i].age <= end)
        {
            print_kid(data[i]);
            count++;
        }
    }

    if (!count)
        console.log("Дети с заданным возрастом не найдены");
}
function surname_at(char)   // Дети с фамилией на заданную букву
{
    let count = 0;
    console.log("Дети с фамилией на букву " + char + ":");
    for (let i=0; i < data.length; i++)
    {
        if (data[i].surname[0] === char)
        {
            print_kid(data[i]);
            count++;
        }
    }

    if (!count)
        console.log("Дети с заданным параметром не найдены");
}
function surname_longer_len(len)    // Дети с фамилией длинне, чем заданного кол-ва символов
{
    let count = 0;
    console.log("Дети с фамилией длиннее " + len + " символов:");
    for (let i=0; i < data.length; i++)
    {
        if (data[i].surname.length > len)
        {
            print_kid(data[i]);
            count++;
        }
    }
    if (!count)
        console.log("Дети с заданным параметром не найдены");
}
function surname_vowel()    // Дети с фамилией на гласную букву
{
    let count = 0;
    let vowel = "ауоыиэяюёе";
    console.log("Дети с фамилией на гласную букву" + ":");
    for (let i=0; i < data.length; i++)
    {
        if (vowel.search(data[i].surname[0].toLowerCase()) != -1)
        {
            print_kid(data[i]);
            count++;
        }
    }

    if (!count)
        console.log("Дети с заданным параметром не найдены");
}

/// CDIO data
function CREATE(surname_, age_)
{
    if (!is_surname_in(surname_))
    {
        let new_child = 
        {   surname : surname_,
            age : age_  };
        data.push(new_child);
    }
    else
    {
        console.log("Запись не добавлена: Фамилия \"" + surname_ + "\" уже в хранилище.");
    }
}
function DELETE(surname_)
{
    let i = find_index(surname_);
    if (i != -1)
    {
        data.splice(i, 1);
    }
    else
    {
        console.log("Запись не удалена: Фамилия \"" + surname_ + "\" не в хранилище.");
    }
}
function READ()
{
    if (!data.length) {
        console.log("Хранилище не содержит записей.");
        return;
    }
    
    console.log("\nСписок всех детей (> Фамилия : Возраст):");
    for (let i=0; i < data.length; i++)
    {
        print_kid(data[i]);
    }
}
function UPDATE(pre_surname, surname_, age_)
{
    let i = find_index(pre_surname);
    if (i != -1)
    {
        data[i].surname = surname_;
        data[i].age = age_;
    }
    else
    {
        console.log("Запись не обновлена: Фамилия \"" + pre_surname + "\" не в хранилище.");
    }
}
function CLEAR()
{
    data = [];
}



function test_1()
{
    console.log("\nСоздание записей");
    CREATE("Иванов", 20);
    CREATE("Помоев", 23);
    CREATE("Иванов", 22);
    CREATE("Сучёчков", 4);
    CREATE("Песков", 2);
    READ();

    console.log("\nУдаление записей");
    DELETE("Помоев");
    DELETE("Брянская");
    READ();

    console.log("\nОбновление записей");
    UPDATE("Брянская", "Иванов", 20);
    UPDATE("Сучёчков", "Сучков", 19);
    READ();
    CLEAR();
}
function test_2()
{
    CLEAR();
    CREATE("Иванов", 21);
    CREATE("Помоев", 21);
    CREATE("Буратинов", 20);
    CREATE("Сталин", 7);
    CREATE("Сучёчков", 3);
    CREATE("Усков", 2);
    READ();

    console.log("Средний возраст детей: " + average_age());

    console.log("\nСтарший ребёнок:");
    print_kid(oldest_kid());

    in_adge_range(3, 20);
    surname_at("С");
    surname_longer_len(6);
    surname_vowel();
}

function main()
{
    test_2();
}

console.log("\n______________________________________________________________\n");
main();
console.log("\n______________________________________________________________\n");