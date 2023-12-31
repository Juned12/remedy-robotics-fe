import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAuthSession } from "aws-amplify/auth";
import { darkEyeIcon } from "../../../assets/images";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import Lambda from 'aws-sdk/clients/lambda';
import Button from "../../../components/button";
import UploadJobs from "../../../components/uploadJobs";
import Modal from "../../../components/modal";
import "./index.scss"

const Jobs = () => {
    const limit = 5
    const userDetails = useSelector((state)=>state.userLoginData?.details)
    const [uploadJobs, setUploadJobs] = useState(false)
    const [dataRecords, setDataRecords] = useState([])
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [fetchingData, setFetchingData] = useState(true)
    const [jobDetailsModal, setJobDetailsModal] = useState({})
    const [activeJobCount, setActiveJobCount] = useState(0);
    const [showJobsInprocessDetails, setShowJobsInprocessDetails] = useState(false)
    const offsetRef = useRef();
    
    useEffect(() => {
        offsetRef.current = offset
        getDataRecords(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    useEffect(()=>{
        if(dataRecords?.length > 0) {
            checkIfInprogress(dataRecords)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataRecords])

    useEffect(()=>{
        getQueryCounts()
    },[])

    const checkIfInprogress = (data) => {
        const inprogressData = data.find((rec)=> rec["Status"] === "In process")
        const refreshTimeout = setTimeout(()=>{
            getDataRecords(offsetRef.current)
            getQueryCounts()
        },5000)
        if(!inprogressData) {
          clearTimeout(refreshTimeout)  
        }
    }

    const getDataRecords = (offsetParam=offset, setFetching) => {
        if(setFetching) {
            setFetchingData(true)
        }
        fetchAuthSession()
        .then(credentials => {
            const lambda = new Lambda({
                credentials: credentials.credentials,
                region: "us-west-2"
            });
            return lambda.invoke({
                FunctionName: 'UI-user-login',
                Payload: JSON.stringify({ username: userDetails.email, limit: limit, offset: offsetParam }),
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
        .catch(()=>{
            setFetchingData(false)
        })
    }

    const getQueryCounts = () => {
       
        fetchAuthSession()
        .then(credentials => {
            const lambda = new Lambda({
                credentials: credentials.credentials,
                region: "us-west-2"
            });
            return lambda.invoke({
                FunctionName: 'UI-files-upload-count',
            },
            function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                    if(data.Payload) {
                        const res = JSON.parse(data.Payload)
                        setActiveJobCount(res.body)
                    }
                };
            });
        })
    }

    const onUploadSuccess = () => {
        setUploadJobs(false)
        getDataRecords(offset)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit);
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
            <Modal
                isOpen={jobDetailsModal?.isOpen}
                onClose={()=>setJobDetailsModal({})}
                title={jobDetailsModal?.type}
                className="ps-4 pe-4"
            >
                <div className="mt-4 mb-4 modal-data-font">
                    {jobDetailsModal?.data}
                </div>
            </Modal>
            <UploadJobs
                isOpen={uploadJobs}
                onClose={()=>setUploadJobs(false)}
                onSuccess={()=>{onUploadSuccess()}}
            />
            <Modal
                isOpen={showJobsInprocessDetails}
                onClose={()=>setShowJobsInprocessDetails(false)}
                title={"Jobs in Queue"}
                className="ps-4 pe-4"
            >
                <div className="mt-4 mb-4 modal-data-font">
                    <div className="queue-text-data">
                        Jobs in Queue: {activeJobCount.message_available}
                    </div>
                    <div className="queue-text-data">
                        Jobs under Processing: {activeJobCount.message_in_flight}
                    </div>
                    <div className="queue-text-data">
                        Total Jobs in Queue: {activeJobCount.total_sum}
                    </div>
                </div>
            </Modal>
            <div className="jobs-wrap">
            <div>
                <div className="jobs-head-wrap mb-5">
                    <div className="job-text">
                        Jobs
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="me-4 queue-text">
                        Files in Queue : 
                            <span className="bold-text ms-1">
                                 {activeJobCount?.total_sum}
                            </span>
                            {
                                activeJobCount?.total_sum > 0 &&
                                <span 
                                    className="fa fa-exclamation-circle ms-2 cursor-pointer" 
                                    onClick={()=>{
                                        setShowJobsInprocessDetails(true)
                                    }}
                                />
                            }
                        </div>
                    <Button
                        label={"Add Query"}
                        onClick={()=>setUploadJobs(true)}
                    />
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead className="thead-lignt">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date & Time</th>
                                <th scope="col"># of Files</th>
                                <th scope="col"># of Folders</th>
                                <th scope="col">Status</th>
                                <th scope="col">Query</th>
                                <th scope="col">Target Platform</th>
                                <th scope="col">Project Name</th>
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
                                                <td>{data["# Of Folders"]}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className={classNames("status-chip", data["Status"]?.replace(/\s/g,'')) }>
                                                            {data["Status"]}
                                                        </div>
                                                        {
                                                            data["Reason"] &&
                                                            <span 
                                                                className="fa fa-exclamation-circle ms-2 cursor-pointer" 
                                                                onClick={()=>{
                                                                    setJobDetailsModal({
                                                                        isOpen: true,
                                                                        type: "Reason",
                                                                        data: data["Reason"]
                                                                    })
                                                                }}
                                                                style={{
                                                                    color: "#EA5455"
                                                                }}
                                                            />
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <img 
                                                        src={darkEyeIcon} 
                                                        alt="" 
                                                        className="cursor-pointer"
                                                        onClick={()=>{
                                                            setJobDetailsModal({
                                                                isOpen: true,
                                                                type: "Query",
                                                                data: data["Query"]
                                                            })
                                                        }}
                                                    />
                                                </td>
                                                <td>{data["Target Platform"]}</td>
                                                <td>{data["Project Name"]}</td>
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
                    totalCount > limit && 
                    <ReactPaginate
                        containerClassName="pagination align-items-center justify-content-end mt-5"
                        activeClassName="active"
                        pageClassName="page-item"
                        onPageChange={handlePageClick}
                        breakLabel="..."
                        pageCount={totalCount / limit}
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
            </div>

        </>
    )
}

export default Jobs;