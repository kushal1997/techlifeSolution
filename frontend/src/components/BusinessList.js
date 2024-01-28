import React, { useContext, useEffect, useState } from 'react'
import "../css/list.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
export const BusinessList = () => {
    const {errorHandleLogout}=useContext(AuthContext)
    const userId = localStorage.getItem("userId")
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let loadingToast;
            try {
                loadingToast = toast.loading("Finding the list");

                const res = await axios.get(`http://localhost:8000/api/getDetails/${userId}`);
                if (res.data.success=== true) {
                      console.log(res.data);
                      const sortedData = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setDatas(sortedData)
                }
                else{
                    console.log(res.data.error);
                    toast.error(`${res.data.error}`)
                }
                
            } catch (err) {
                console.log("Session Timeout", err);
                errorHandleLogout();

            }finally {
                // Close the loading state
                if (loadingToast) {
                  toast.dismiss(loadingToast);
                }
              }
        };

        fetchData();
    }, [userId,errorHandleLogout]);
    // useEffect(() => {
    //     console.log("data", datas)
    // }, [datas])

    return (
        <div className="listData">
            <table className="business-table">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Contact Person</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map(data => (
                            <tr key={data._id}>

                                <td>{data.name}</td>
                                <td>{data.address}</td>
                                <td>{data.email}</td>
                                <td><a href={data.website} target="_blank" rel="noopener noreferrer">{data.website}</a>
                                </td>
                                <td>{data.contactPerson}</td>
                                <td>{data.phoneNumber}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
