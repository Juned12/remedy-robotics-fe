import React, { useState } from 'react';
import Modal from '../modal';
import TextArea from '../textArea';
import "./index.scss"
import Button from '../button';

const UploadJobs = ({
    isOpen,
    onSuccess,
    onClose
}) => {

    const [query, setQuery] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Upload"
                className="upload-jobs-modal"
            >
                <div className='mt-4'>
                    <form onSubmit={onSubmit}>
                        <TextArea
                            onChange={(e)=>setQuery(e.target.value)}
                            required={true}
                            name="query"
                            id="query"
                            rows={6}
                            value={query}
                        />
                        <div className='d-flex justify-content-end mt-4'>
                            <Button
                                label={"Clear"}
                                className={"transparent-btn pt-2 pb-2 ps-3 pe-3 me-3"}
                                onClick={()=>setQuery("")}
                                type={"button"}

                            />
                            <Button
                                label={"Submit"}
                                className={"pt-2 pb-2 ps-3 pe-3"}
                                type={"submit"}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default UploadJobs;
