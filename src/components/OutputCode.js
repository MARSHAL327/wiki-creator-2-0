export default function OutputCode({sections}) {
    function fieldValuesIsChanged(fields){
        for (let field of fields){
            if( field.value.trim() !== "" && field.value.trim() !== field.defaultValue )
                return true
        }

        return false
    }

    function getFieldHtml(field) {
        if( field.value.trim() === "" && field.level !== 2 )
            return

        // eslint-disable-next-line default-case
        switch (field.type) {
            case "text":
            case "password":
            case "select":
                return (
                    <p style={{whiteSpace: "pre-line"}}>
                        {
                            ((field.showName && field.value.trim()) || field.type === "select" ) &&
                            <span style={{fontWeight: "bold"}}>{field.name}: </span>
                        }
                        {field.value}
                    </p>
                )
            case "h2":
                return (
                    <h2 style={{ backgroundColor: "#0E1025", color: "#fff", padding: "10px" }}>
                        {field.value}
                    </h2>
                )
            case "h3":
                let showName = true

                if( field.fields ){
                    showName = fieldValuesIsChanged(field.fields)
                }

                return ( showName && <h3>– {field.name}</h3>)
            case "link":
                return (
                    <p>
                        <span style={{color: "rgb(0, 0, 238)"}}>
                            <a href={field.value} target="_blank" rel="noreferrer">{field.value}</a>
                        </span>
                    </p>
                )
            case "comment":
                return ( field.value.trim() &&
                    <p style={{whiteSpace: "pre-line"}}>
                        <i><b>Комментарий: </b>
                            { field.value.trim() }</i>
                    </p>
                )
        }
    }

    function getFields(fields) {
        return fieldValuesIsChanged(fields) && fields.map(field => {
            return <div key={field.id}>
                {getFieldHtml(field)}
                {field.fields && getFields(field.fields)}
            </div>
        })
    }

    return (
        <div className="white-block" id={"html-code"}>
            {Object.keys(sections).map(sectionName => {
                return sections[sectionName].createdFields.length > 0 && (
                    <div key={sectionName}>
                        <h1 style={sections[sectionName].styles}>{sectionName}</h1>
                        {
                            sections[sectionName].createdFields.map(createdField => {
                                return (
                                    <div key={createdField.id}>
                                        {
                                            getFields(createdField.fields)
                                        }
                                    </div>
                                )
                            })
                        }
                        <hr/>
                    </div>
                )
            })}

            <details>
                <summary><h1 style={{color: "rgb(0, 166, 80)", fontSize: "24px", fontWeight: "bold"}}>JSON вставка</h1>
                </summary>
                <br/>
                <a href="https://marshal327.github.io/wiki-creator/">Перейти в приложение для редактирования Wiki</a>
                <p> {JSON.stringify(sections)} </p>
            </details>
        </div>
    )
}