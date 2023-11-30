import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {fetchAuthSession} from 'aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda';
import Modal from '../modal';
import TextArea from '../textArea';
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
        {label: "Seven", value: "Seven"},
    ]
    const userDetails = useSelector((state)=>state.userLoginData?.details)
    const [query, setQuery] = useState("");
    const [targetPlatform, setTargetPlatform] = useState(options[0])
    const [error, setError] = useState(null);
    const [apiCalled, setApiCalled] = useState(false)

    useEffect(()=>{
        setQuery("")
        setError(null)
        setApiCalled(false)
    },[isOpen])

    const onSubmit = (e) => {
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
                        <TextArea
                            onChange={(e)=>{
                                setError(null)
                                setQuery(e.target.value)
                            }}
                            required={true}
                            name="query"
                            id="query"
                            rows={6}
                            value={query}
                            label={"Query"}
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
                        />
                        {
                            error &&
                            <div className='alert alert-danger mt-2 text-center'>
                                {error}
                            </div>
                        }
                        <div className='d-flex justify-content-end mt-4'>
                            <Button
                                label={"Clear"}
                                className={"transparent-btn pt-2 pb-2 ps-3 pe-3 me-3"}
                                onClick={()=>{
                                    setQuery("")
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
