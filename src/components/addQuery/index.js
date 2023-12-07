import React from "react";
import { columnName } from "../../constants/columnName";
import TextInput from "../textInput";
import Button from "../button";
import TextInputDropdown from "../textInputDropdown";
import "./index.scss"

const dataTypeOptions = [
    { label: "String", value: "String" },
    { label: "Number", value: "Number"}
]

const stringConditionOption = [
    { label: "Contains", value: "contains" },
    { label: "Not Contains", value: "NOT contains" },
    { label: "Begins With", value: "begins_with" }
]

const numberConditionOption = [
    { label: "Equal to", value: "equal to" },
    { label: "Greater than", value: "greater than" },
    { label: "Less than", value: "less than" },
    { label: "Greater than Equal to", value: "greater than equal to" },
    { label: "Less than Equal to", value: "less than equal to" },
    { label: "Not Equal to", value: "not equal to" },
]

const operatorOption = [
    { label: "AND", value: "AND" },
    { label: "OR", value: "OR" }
]

const AddQuery = ({
    queryData,
    setQueryData,
}) => {


    const removeQuery = (idx) => {
        console.log("idx",idx)
        setQueryData(queryData => queryData.filter((q, i) => i !== idx));
    }

    const handleChange = (val, key, idx) => {
        const tempArr = [...queryData]
        const tempDic = queryData[idx]
        tempDic[key] = val
        if(key === "dataType") {
            tempDic["condition"] = val === "String" ? stringConditionOption[0].value :  numberConditionOption[0].value
        }
        tempArr[idx] = tempDic
        setQueryData([...tempArr])
    }

    const addFilter = () => {
        setQueryData([
            ...queryData,
            {
                condition: "contains",
                columnName: "",
                dataType: "String",
                value: "",
                operator: "AND"
            }
        ])
    }

    const getSelectedQueryCondition = (condition, dataType) => {
        if(condition) {
            const condArr = dataType === "String" ? stringConditionOption : numberConditionOption
            const cond = condArr.filter((res)=> res.value === condition)
            return cond[0]
        }
        return {}
    }
    return (
        <div className="add-query-wrap">
            {
                queryData.map((query, idx) => {
                    return (
                        <React.Fragment key={`query${idx}`}>
                        <div className="d-flex align-items-center mt-2" >
                            <TextInputDropdown
                                options={columnName}
                                selectedOption={query.columnName && {label: query.columnName, value: query.columnName}}
                                handleChange={(e)=>{
                                    handleChange(e.value, "columnName", idx)
                                }}
                                id={`${idx}column`}
                                label={"Attribute Name"}
                                className={"attr-drop"}
                                wrapperClass={"me-2"}
                                placeholder={"Select Attribute"}
                                required={true}
                            />
                            <TextInputDropdown
                                options={dataTypeOptions}
                                selectedOption={{label: query.dataType, value: query.dataType}}
                                handleChange={(e)=>{
                                    handleChange(e.value, "dataType", idx)
                                }}
                                defaultValue={{label: query.dataType, value: query.dataType}}
                                id={`${idx}type`}
                                label={"Type"}
                                wrapperClass={"me-2"}
                                className={"type-drop"}
                            />
                            <TextInputDropdown
                                options={
                                    query.dataType === "String" ?
                                    stringConditionOption :
                                    numberConditionOption
                                }
                                selectedOption={getSelectedQueryCondition(query.condition, query.dataType)}
                                handleChange={(e)=>{
                                    handleChange(e.value, "condition", idx)
                                }}
                                id={`${idx}cond`}
                                label={"Condition"}
                                wrapperClass={"me-2"}
                                className={"attr-drop"}
                            />
                            <TextInput
                                label={"Value"}
                                onChange={(e)=>{
                                    handleChange(e.target.value, "value", idx)
                                }}
                                name={`${idx}val`}
                                id={`${idx}val`}
                                placeholder={"Enter Attribute Value"}
                                required={true}
                                className={"value-input"}
                                value={query.value}
                                type={
                                    query.dataType === "String" ?
                                    "text" :
                                    "number"
                                }
                            />
                            {
                               queryData.length > 1 && 
                                <Button
                                    label="Remove"
                                    onClick={()=>removeQuery(idx)}
                                    className={"pt-1 pb-1 ps-2 pe-2 mt-4 ms-2"}
                                    type={"button"}
                                />
                            }
                        </div>
                        {
                            (idx+1 < queryData.length) &&
                            <div className="d-flex justify-content-center">
                                <TextInputDropdown
                                    options={operatorOption}
                                    selectedOption={{label: query.operator, value: query.operator}}
                                    handleChange={(e)=>{
                                        handleChange(e.value, "operator", idx)
                                    }}
                                    id={`${idx}operator`}
                                    label={""}
                                    className={"type-drop mt-3"}
                                />
                            </div>
                        }
                        </React.Fragment>
                    )
                })
            }
            <Button
                label="Add Filter"
                onClick={()=>addFilter()}
                className={"pt-1 pb-1 ps-2 pe-2 mt-3 mb-2"}
                type={"button"}
            />
        </div>
    )
}

export default AddQuery;