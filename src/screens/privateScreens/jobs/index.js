import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAuthSession } from "aws-amplify/auth";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { darkEyeIcon } from "../../../assets/images";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import Lambda from 'aws-sdk/clients/lambda';
import Button from "../../../components/button";
import UploadJobs from "../../../components/uploadJobs";
import "./index.scss"

const Jobs = () => {
    const userDetails = useSelector((state)=>state.userLoginData?.details)
    const [uploadJobs, setUploadJobs] = useState(false)
    const [dataRecords, setDataRecords] = useState([])
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [fetchingData, setFetchingData] = useState(true)

    useEffect(() => {
        getDataRecords(offset);
    }, [offset]);

    const getDataRecords = (offset) => {
        fetchAuthSession()
        .then(credentials => {
            const lambda = new Lambda({
                credentials: credentials.credentials,
                region: "us-west-2"
            });
            return lambda.invoke({
                FunctionName: 'user-login',
                Payload: JSON.stringify({ username: userDetails.email, limit: 10, offset: offset }),
            },
            function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    if(data.Payload) {
                        const JSONdata = JSON.parse(data.Payload)
                        setDataRecords(JSONdata.dataRecords)
                        setTotalCount(JSONdata?.totalCount)
                    }
                };
                setFetchingData(false)
            });
        })
        .catch((err)=>{
            setFetchingData(false)
        })
    }

    const onUploadSuccess = () => {
        setUploadJobs(false)
        getDataRecords(offset)
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected * 1;
        if (newOffset < 0 || newOffset >= totalCount) {
          return;
        }
    
        setOffset(newOffset);
    };

    const getDateAndTime = (dateString) => {
        const [date, time] = dateString.split("_")
        return `${new Date(date).toLocaleDateString("en-US")} | ${time}`
    }
    return (
        <>
            <UploadJobs
                isOpen={uploadJobs}
                onClose={()=>setUploadJobs(false)}
                onSuccess={()=>{onUploadSuccess()}}
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
                        {
                            (!fetchingData && dataRecords?.length > 0) && 
                            <tbody>
                                {
                                    dataRecords.map((data) => {
                                        return (
                                            <tr key={data["ID"]}>
                                                <td>{data["ID"]}</td>
                                                <td>{getDateAndTime(data["Date & Time"])}</td>
                                                <td>{data["# Of Files"]}</td>
                                                <td>
                                                    <div className={classNames("status-chip", data.status) }>
                                                        {data["Status"]}
                                                    </div>
                                                </td>
                                                <td>
                                                    <img src={darkEyeIcon} alt="" data-tooltip-id={"add"+data["ID"]}/>
                                                    <ReactTooltip
                                                        id={"add"+data["ID"]}
                                                        place="bottom"
                                                        content={data["Query"]}
                                                    /></td>
                                                <td>{data["Target Platform"]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        }
                    </table>
                    {
                        fetchingData &&
                        <div className="info-text mt-5 mb-4">
                            Fetching Data.... Please Wait
                        </div>
                    }
                    {
                        (!fetchingData && dataRecords?.length === 0) &&
                        <div className="info-text mt-5 mb-4">
                            No Data Found
                        </div>
                    }
                </div>
                {
                    totalCount > 15 && 
                    <ReactPaginate
                        containerClassName="pagination align-items-center justify-content-end mt-5"
                        activeClassName="active"
                        pageClassName="page-item"
                        onPageChange={handlePageClick}
                        breakLabel="..."
                        pageCount={totalCount / dataRecords.length}
                        previousLabel={
                            <>
                                <Button
                                    label={"Previous"}
                                    className={"pt-2 pb-2 ps-3 pe-3 me-2"}
                                />
                            </>
                        }
                        nextLabel={
                            <Button
                                    label={"Next"}
                                    className={"pt-2 pb-2 ps-3 pe-3 ms-2"}
                            />
                        }
                    />
                }
            </div>
        </>
    )
}

export default Jobs;