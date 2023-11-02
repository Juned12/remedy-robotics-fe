import React from "react";
import Button from "../../../components/button";
import "./index.scss"

const Jobs = () => {

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
            status: "success",
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
        <div className="jobs-wrap">
            <div className="jobs-head-wrap mb-5">
                <div className="job-text">
                    Jobs
                </div>
                <Button
                    label={"Upload"}
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
                            jobsRecord.map((data, idx) => {
                                return (
                                    <>
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.date}</td>
                                            <td>{data.noOfFiles}</td>
                                            <td>
                                                <div className={data.status}>
                                                    {data.status}
                                                </div>
                                            </td>
                                            <td>{data.query}</td>
                                            <td>{data.platform}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Jobs;