import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {fetchAuthSession} from 'aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda';
import Modal from '../modal';
import AddQuery from '../addQuery';
import Button from '../button';
import TextInputDropdown from '../textInputDropdown';
import "./index.scss"
  
const UploadJobs = ({
    isOpen,
    onSuccess,
    onClose
}) => {
    const options = [
        {label: "Red Brick", value: "Red Brick"},
        {label: "V7", value: "V7"},
    ]

    const initialQuery = {
        condition: "contains",
        columnName: "",
        dataType: "String",
        value: "",
        operator: "AND"
    }
    const [queryData, setQueryData] = useState([])
    const userDetails = useSelector((state)=>state.userLoginData?.details)
    const [targetPlatform, setTargetPlatform] = useState(options[0])
    const [error, setError] = useState(null);
    const [apiCalled, setApiCalled] = useState(false)

    useEffect(()=>{
        setQueryData([initialQuery])
        setError(null)
        setApiCalled(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen])

    const onSubmit = (e) => {
        const conditonArr = []
        const columnArr = []
        const dataTypeArr = []
        const valueArr = []
        const operatorArr = []
        queryData.forEach((query, idx)=>{
            conditonArr.push(query.condition)
            columnArr.push(query.columnName)
            dataTypeArr.push(query.dataType)
            valueArr.push(query.value)
            if(idx<queryData.length-1) {
                operatorArr.push(query.operator)
            }
        })
        const query = {
            condition : conditonArr,
            col_name : columnArr,
            data_type : dataTypeArr,
            col_value : valueArr,
            operator : operatorArr
        }
        console.log("querty",query)
        setApiCalled(true)
        setError(null)
        e.preventDefault()
        fetchAuthSession()
        .then(credentials => {
            const lambda = new Lambda({
                credentials: credentials.credentials,
                region: "us-west-2"
            });
            return lambda.invoke({
                FunctionName: 'UI-query-submision',
                Payload: JSON.stringify({ username: userDetails.email, query: query, targetPlatform: targetPlatform?.value }),
            },
            function(err, data) {
                if (err) {
                    setApiCalled(false)
                    setError("Error from AWS"); // an error occurred
                } else {
                    const payload = JSON.parse(data.Payload)
                    if(payload.statusCode === 500) {
                        setApiCalled(false)
                        setError(payload.body)
                    } else {
                        onSuccess()
                    }
                }
            });
        })
        .catch(()=>{
            setApiCalled(false)
            setError("Error from AWS");
        })
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Upload"
                className="upload-jobs-modal"
            >
                
                <div className='mt-3'>
                    <form onSubmit={onSubmit}>
                        <AddQuery
                            queryData={queryData}
                            setQueryData={q => setQueryData(q)}
                        />
                        <TextInputDropdown
                            options={options}
                            selectedOption={targetPlatform}
                            handleChange={(e)=>{
                                setTargetPlatform(e)
                            }}
                            defaultValue={"Red Brick"}
                            id={"targetDrop"}
                            label={"Target Platform"}
                            className={"attr-drop"}
                        />
                        {
                            error &&
                            <div className='alert alert-danger mt-3 text-center'>
                                {error}
                            </div>
                        }
                        <div className='d-flex justify-content-end mt-4'>
                            <Button
                                label={"Clear"}
                                className={"transparent-btn pt-2 pb-2 ps-3 pe-3 me-3"}
                                onClick={()=>{
                                    setQueryData([initialQuery])
                                    setError(null)
                                }}
                                type={"button"}
                                isDisabled={apiCalled}

                            />
                            <Button
                                label={"Submit"}
                                className={"pt-2 pb-2 ps-3 pe-3"}
                                type={"submit"}
                                isDisabled={apiCalled}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default UploadJobs;
