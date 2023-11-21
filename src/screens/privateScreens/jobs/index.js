import React, { useState } from "react";
import classNames from "classnames";
import { darkEyeIcon } from "../../../assets/images";
import Button from "../../../components/button";
import UploadJobs from "../../../components/uploadJobs";
import "./index.scss"

const Jobs = () => {

    const [uploadJobs, setUploadJobs] = useState(false)
    const jobsRecord = [
        {
            id: 1232,
            date: new Date().toDateString(),
            noOfFiles: 12,
            status: "success",
            query: "query",
            platform: "Blink"
        },
        {
            id: 1212,
            date: new Date().toDateString(),
            noOfFiles: 12,
            status: "failed",
            query: "query",
            platform: "Blink"
        },
        {
            id: 1132,
            date: new Date().toDateString(),
            noOfFiles: 12,
            status: "success",
            query: "query",
            platform: "Blink"
        }
    ]

    return (
        <>
            <UploadJobs
                isOpen={uploadJobs}
                onClose={()=>setUploadJobs(false)}
                onSuccess={()=>{}}
            />
            <div className="jobs-wrap">
                <div className="jobs-head-wrap mb-5">
                    <div className="job-text">
                        Jobs
                    </div>
                    <Button
                        label={"Upload"}
                        onClick={()=>setUploadJobs(true)}
                    />
                </div>
                <div>
                    <table className="table">
                        <thead className="thead-lignt">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date & Time</th>
                                <th scope="col"># of Files</th>
                                <th scope="col">Status</th>
                                <th scope="col">Query</th>
                                <th scope="col">Target Platform</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobsRecord.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.date}</td>
                                            <td>{data.noOfFiles}</td>
                                            <td>
                                                <div className={classNames("status-chip", data.status) }>
                                                    {data.status}
                                                </div>
                                            </td>
                                            <td><img src={darkEyeIcon} alt="" /></td>
                                            <td>{data.platform}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Jobs;