import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a class name");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <div className="form-container">
                <form className="form-card" onSubmit={submitHandler}>
                    <span className="form-title">
                        Add Student <FaUserPlus className="title-icon" />
                    </span>

                    <label>Name</label>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter student's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                    />

                    {situation === "Student" && (
                        <>
                            <label>Class</label>
                            <select
                                className="form-input"
                                value={className}
                                onChange={changeHandler}
                                required
                            >
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <label>Roll Number</label>
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    <button className="submit-button" type="submit" disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

            {/* CSS Styles */}
            <style jsx>{`
                .form-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                }
                .form-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    width: 400px;
                    text-align: center;
                    position:absolute;
                    margin-top:-40px;

                }
                .form-title {
                    font-size: 22px;
                    font-weight: bold;
                    color: #2196F3;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                }
                .title-icon {
                    font-size: 20px;
                }
                label {
                    font-size: 14px;
                    font-weight: 500;
                    display: block;
                    margin: 10px 0 5px;
                   text-align: left;
                }
                .form-input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    background-color: #f8f9fa;
                    font-size: 14px;
                    outline: none;
                    transition: 0.2s;
                }
                .form-input:focus {
                    border-color: #2196F3;
                    background-color: white;
                }
                .submit-button {
                    width: 100%;
                    padding: 10px;
                    background-color: #4CAF50;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-top: 1rem;
                }
                .submit-button:hover {
                    background-color: #388E3C;
                }
            `}</style>
        </>
    );
};

export default AddStudent;
