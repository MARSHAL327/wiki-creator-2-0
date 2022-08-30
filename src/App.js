import {useState} from "react";
import Header from "./components/Header";
import WorkSpace from "./components/WorkSpace";
import ActionButtons from "./components/ActionButtons";
import Context from "./context";
import OutputButtons from "./components/OutputButtons";
import OutputCode from "./components/OutputCode";


export default function App() {

    const serverFields = [
        {
            name: "Название сайта (обязательно для заполнения)",
            type: "h2",
            level: 1,
        },
        {
            name: "Ссылка на сайт",
            type: "link",
            level: 1,
        },
        {
            name: "Комментарий",
            type: "comment"
        },
        {
            name: "FTP/SFTP",
            type: "h3",
            level: 2,
            fields: [
                {
                    inputName: "connection_type",
                    name: "Тип соединения",
                    type: "select",
                    selectValues: ["SFTP", "FTP"],
                    value: "SFTP",
                    defaultValue: "SFTP"
                },
                {
                    name: "IP сервера",
                    type: "text",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true,
                    value: "",
                },
                {
                    name: "Порт",
                    type: "text",
                    showFieldName: true,
                    defaultValue: "22",
                    value: "22",
                },
            ]
        },
        {
            name: "БД",
            type: "h3",
            level: 2,
            fields: [
                {
                    name: "Имя БД",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true,
                    value: ""
                },
                {
                    name: "Хост",
                    type: "password",
                    defaultValue: "localhost",
                    value: "localhost",
                    showFieldName: true,
                },
            ]
        },
        {
            name: "Git",
            type: "h3",
            level: 2,
            fields: [
                {
                    name: "Ветка",
                    type: "text",
                    showFieldName: true,
                    value: ""
                },
            ]
        }
    ]
    let [sectionsData, setSectionsData] = useState({
        "Правила работы": {
            name: "Правила работы",
            styles: {
                color: "rgb(255, 27, 40)"
            },
            fields: [
                {
                    name: "Заголовок",
                    type: "h2",
                },
                {
                    name: "Описание",
                    type: "text",
                },
            ],
            createdFields: [],
        },
        "Доступы в админку": {
            name: "Доступы в админку",
            fields: [
                {
                    name: "Сайт",
                    type: "link"
                },
                {
                    name: "Название пользователя",
                    type: "h2"
                },
                {
                    name: "Логин",
                    type: "text",
                    showFieldName: true
                },
                {
                    name: "Пароль",
                    type: "password",
                    showFieldName: true
                },
            ],
            createdFields: [],
        },
        // "Боевые сайты": {
        //     name: "Боевые сайты",
        //     fields: serverFields,
        //     createdFields: [],
        // },
        "Тестовые сайты": {
            name: "Тестовые сайты",
            fields: serverFields,
            createdFields: [],
        },
        // "Хостинг": {
        //     name: "Хостинг",
        //     fields: [
        //         {
        //             name: "Ссылка на хостинг",
        //             type: "link"
        //         },
        //         {
        //             name: "Логин",
        //             type: "text",
        //             showFieldName: true
        //         },
        //         {
        //             name: "Пароль",
        //             type: "password",
        //             showFieldName: true
        //         },
        //     ],
        //     createdFields: [],
        // },
        // "Git": {
        //     name: "Git",
        //     fields: [
        //         {
        //             name: "Ссылка на git",
        //             type: "link"
        //         },
        //         {
        //             name: "Логин",
        //             type: "text",
        //             showFieldName: true
        //         },
        //         {
        //             name: "Пароль",
        //             type: "password",
        //             showFieldName: true
        //         },
        //     ],
        //     createdFields: [],
        // },
        // "Прочее": {
        //     name: "Прочее",
        //     fields: [
        //         {
        //             name: "Заголовок",
        //             type: "h2"
        //         },
        //         {
        //             name: "Описание",
        //             type: "text"
        //         },
        //         {
        //             name: "Ссылка",
        //             type: "link"
        //         },
        //         {
        //             name: "Логин",
        //             type: "text",
        //             showFieldName: true
        //         },
        //         {
        //             name: "Пароль",
        //             type: "password",
        //             showFieldName: true
        //         },
        //     ],
        //     createdFields: [],
        // },
    })
    let [outputMode, setOutputMode] = useState(false)
    let fieldDeepDepthLevel = ["Боевые сайты", "Тестовые сайты"]
    let commentObject = {
        name: "Комментарий",
        type: "comment"
    }

    function copy(obj) {
        function copyProps(clone) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clone[key] = copy(obj[key]);
                }
            }
        }

        /**
         * Создание иммутабельной копии объекта
         * @return {Object}
         */
        function cloneObj() {
            let clone = {};
            copyProps(clone);
            return clone;
        }

        /**
         * Создание иммутабельной копии массива
         * @return {Array}
         */
        function cloneArr() {
            return obj.map(function (item) {
                return copy(item);
            });
        }

        /**
         * Создание иммутабельной копии Map
         * @return {Map}
         */
        function cloneMap() {
            let clone = new Map();
            for (let [key, val] of obj) {
                clone.set(key, copy(val));
            }
            return clone;
        }

        /**
         * Создание иммутабельной копии Set
         * @return {Set}
         */
        function cloneSet() {
            let clone = new Set();
            for (let item of obj) {
                clone.add(copy(item));
            }
            return clone;
        }

        /**
         * Создание иммутабельной копии функции
         * @return {Function}
         */
        function cloneFunction() {
            let clone = obj.bind(this);
            copyProps(clone);
            return clone;
        }

        // Получение типа объекта
        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

        // Возвращаем копию в зависимости от типа исходных данных
        if (type === 'object') return cloneObj();
        if (type === 'array') return cloneArr();
        if (type === 'map') return cloneMap();
        if (type === 'set') return cloneSet();
        if (type === 'function') return cloneFunction();

        return obj;
    }

    function generateFieldValues(sectionFields, sectionName) {
        if (!fieldDeepDepthLevel.includes(sectionName))
            sectionFields.push(commentObject)

        return sectionFields.map((item, idx) => {
            if (item.fields) {
                if (item.fields[item.fields.length - 1].name !== "Комментарий")
                    item.fields.push(commentObject)

                item.fields = generateFieldValues(item.fields, sectionName)
            }


            return {
                ...item,
                value: item.value ?? "",
                id: Date.now() + idx
            }
        })
    }

    function addSectionItem(section) {
        let newSectionItem = {
            id: Date.now(),
            fields: copy(section.fields)
        }

        newSectionItem.fields = generateFieldValues(newSectionItem.fields, section.name)
        section.createdFields.push(newSectionItem)

        setSectionsData({
            ...sectionsData,
        })
    }

    function removeSectionItem(section, itemId) {
        section.createdFields = section.createdFields.filter(item => item.id !== itemId)

        setSectionsData({
            ...sectionsData,
        })
    }

    function changeSectionItem(event, field) {
        field.value = event.target.value

        setSectionsData({
            ...sectionsData,
        })
    }

    function toggleOutputMode() {
        setOutputMode(outputMode => !outputMode)
    }

    function getFilteredSections(sections) {
        let filteredSections = {};

        for (let key in sections) {
            if (sections[key].createdFields.length > 0) {
                filteredSections[key] = sections[key]
            }
        }

        return filteredSections;
    }

    return (
        <Context.Provider value={{addSectionItem, removeSectionItem, changeSectionItem}}>
            <div>
                <Header/>
                <div className="container">
                    <div className="main-grid">
                        <ActionButtons
                            setSectionsData={setSectionsData}
                            sectionsData={sectionsData}
                        />
                        {outputMode ?
                            <OutputCode
                                sections={getFilteredSections(sectionsData)}
                            /> :
                            <WorkSpace
                                sections={sectionsData}
                            />
                        }

                        <OutputButtons
                            sections={getFilteredSections(sectionsData)}
                            outputMode={outputMode}
                            toggleOutputMode={toggleOutputMode}
                        />
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
}
