import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';


// Plan Related
import AddPlan from './planRelated/AddPlan';
import ShowPlans from './planRelated/ShowPlans';

// customer related 
import AddCust from './custRelated/AddCust';
import ShowCusts from './custRelated/ShowCusts';

// CourierCompany related
import AddCouriercompany from './couriercompanyRelated/AddCouriercompany'
import ShowCouriercompanys from './couriercompanyRelated/ShowCouriercompanys'

// courier rates related
import AddCourierrate from './courierrateRelated/AddCourierrate'
import ShowCourierrate from './courierrateRelated/ShowCourierrate'

import AddCourierRatesCsv from './courierrateRelated/AddCourierRatesCsv';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';


import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

// orders
import AddOrder from './orderRelated/AddOrder'
import ShowOrders from './orderRelated/ShowOrders'

// invoices
import ShowInvoices from './invoiceRelated/ShowInvoices'

// b2bcourierrate
import AddB2bCourierrate from './b2bcourierrateRelated/AddB2bCourierrate'
import ShowB2bCourierrate from './b2bcourierrateRelated/ShowB2bCourierrate'
import AddB2bCourierratecsv from './b2bcourierrateRelated/AddB2bCourierratecsv'

// wallet related
import AddWallet from './walletRelated/AddWallet'
import ShowWallet from './walletRelated/ShowWallet'

// pickup points related
import AddPickupPoint from './pickuppointRelated/AddPickupPoint'
import ShowPickupPoints from './pickuppointRelated/ShowPickupPoints'

// pickup request
import AddPickupRequest from './pickuprequestRelated/AddPickupRequest'
import ShowPickupRequests from './pickuprequestRelated/ShowPickupRequests'

// weight reconsilation
import WeightReconciliation from './weightreconsilationRelated/WeightReconciliation'
import ShowExtraWeight from './weightreconsilationRelated/ShowExtraWeight'

// rate calculator
import RateCalculatorPage from './RateCalculatorRelated/RateCalculatorPage'

// KYC Related
import KYCForm from './KYCRelated/KYCForm'
import ShowKYCRequests from './KYCRelated/ShowKYCRequests'

// NDR Related
import AddNDRAndException from './NDRRelated/AddNDRAndException'
import ShowNDRAndException from './NDRRelated/ShowNDRAndException'

// appointment related
import AddAppointment from './appointmentRelated/AddAppointment'
import ShowAppointments from './appointmentRelated/ShowAppointments'

// support ticket
import AddSupportTicket from './supportTicketRelated/AddSupportTicket'
import ShowSupportTickets from './supportTicketRelated/ShowSupportTickets'

// resorce center
import PackageGuide from './resorceCenterRelated/packageGuide'
import ZoneMatrix from './resorceCenterRelated/ZoneMatrix'
import ProhibitedItems from './resorceCenterRelated/ProhibitedItems'
import EscalationMatrixPage from './resorceCenterRelated/EscalationMatrixPage'
import TransporterIDs from './resorceCenterRelated/TransporterIDs'
import TrainingVideos from './resorceCenterRelated/TrainingVideos'

import OrderManager from './orderManagement/OrderManager'

import UploadCompanyRates from './companyRates/UploadCompanyRates'

// csv file upload file
// import FileList from './csvfileupload/FileList'
// import FileUpload from './csvfileupload/FileUpload'
// import ShowData from './csvfileupload/ShowData'

import MLlogo from '../../assets/mylogisticimage.png';


const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 1
                    }}>
                        {/* Logo: smooth fade-in/fade-out when the sidebar is opened/closed */}
                        <Box
                            component="img"
                            src={MLlogo}
                            alt="Logo"
                            sx={{
                                height: 100,
                                width: 'auto',
                                marginRight: 3,
                                marginTop: -1.5,
                                marginBottom: -2,
                                ml: 4,
                                opacity: open ? 1 : 0,  // Logo fades in when open is true, fades out when false
                                transition: 'opacity 0.3s ease',  // Smooth fade transition
                            }}
                        />

                        {/* ChevronLeftIcon on the right remains unchanged */}
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>


                    <List component="nav">
                        <SideBar />  
                    </List>03
                </Drawer>

                <Box component="main" sx={styles.boxStyled}>  
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />   
                        <Route path="/Admin/complains" element={<SeeComplains />} />     

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* plans */}
                        <Route path="/Admin/addplan" element={<AddPlan />} />
                        <Route path="/Admin/plans" element={<ShowPlans />} />

                        {/* customer*/}
                        <Route path="/Admin/addcust" element={<AddCust />} />
                        <Route path="/Admin/custs" element={<ShowCusts />} />

                        {/* couriercompany */}
                        <Route path="/Admin/addcouriercompany" element={<AddCouriercompany />} />
                        <Route path="/Admin/couriercompanys" element={<ShowCouriercompanys />} />

                        {/* courierrate */}
                        <Route path="/Admin/addcourierrate" element={<AddCourierrate />} />
                        <Route path="/Admin/courierrates" element={<ShowCourierrate />} />
                        <Route path="/Admin/addcourierrateCSV" element={<AddCourierRatesCsv />} />

                        {/* orders */}
                        <Route path="/Admin/addorder" element={<AddOrder />} />
                        <Route path="/Admin/orders" element={<ShowOrders />} />

                        {/* invoices */}
                        <Route path="/Admin/invoices" element={<ShowInvoices />} />

                        {/* b2bcourier rate */}
                        <Route path="/Admin/addb2bcourierrate" element={<AddB2bCourierrate />} />
                        <Route path="/Admin/b2bcourierrates" element={<ShowB2bCourierrate />} />
                        <Route path="/Admin/addb2bcourierrateCSV" element={<AddB2bCourierratecsv />} />

                        {/* wallet related */}
                        <Route path="/Admin/Wallet" element={<AddWallet />} />
                        <Route path="/Admin/walletsHistory" element={<ShowWallet />} />

                        {/* pickup point related */}
                        <Route path="/Admin/addpickuppoint" element={<AddPickupPoint />} />
                        <Route path="/Admin/pickuppoints" element={<ShowPickupPoints />} />

                        {/* pickup request related */}
                        <Route path="/Admin/addpickuprequest" element={<AddPickupRequest />} />
                        <Route path="/Admin/pickurequest" element={<ShowPickupRequests />} />

                        {/* weight reconsilation */}
                        <Route path="/Admin/WeightReconciliation" element={< WeightReconciliation />} />
                        <Route path="/Admin/ShowExtraWeight" element={< ShowExtraWeight />} />

                        {/* rate calculator related */}
                        <Route path="/Admin/ratecalculator" element={< RateCalculatorPage />} />

                        {/* KYC Related */}
                        <Route path="/Admin/KYCForm" element={< KYCForm />} />
                        <Route path="/Admin/ShowKYC" element={< ShowKYCRequests />} />

                        {/* NDR & Exception */}
                        <Route path="/Admin/NDR&Exception" element={< AddNDRAndException />} />
                        <Route path="/Admin/ShowNDR&Exception" element={< ShowNDRAndException />} />

                        {/* apointment related */}
                        <Route path="/Admin/AddAppointment" element={<AddAppointment />} />
                        <Route path="/Admin/ShowAppointments" element={< ShowAppointments />} />

                        {/* support ticket related */}
                        <Route path="/Admin/AddSupportTicket" element={<AddSupportTicket />} />
                        <Route path="/Admin/ShowSupportTickets" element={<ShowSupportTickets />} />

                        {/* package guide related */}
                        <Route path="/Admin/packageguide" element={<PackageGuide />} />
                        <Route path="/Admin/ZoneMatrix" element={<ZoneMatrix />} />
                        <Route path="/Admin/ProhibitedItems" element={<ProhibitedItems />} />
                        <Route path="/Admin/EscalationMatrixPage" element={<EscalationMatrixPage />} />
                        <Route path="/Admin/TransporterIDs" element={<TransporterIDs />} />
                        <Route path="/Admin/TrainingVideos" element={<TrainingVideos />} />


                        {/* csv file upload */}
                        {/* <Route path="/Admin/FileList" element={<FileList />} />
                        <Route path="/Admin/FileUpload" element={<FileUpload />} />
                        <Route path="/Admin/ShowData" element={<ShowData />} /> */}

                        {/* order management */}
                        <Route path='/Admin/OrderManager' element={<OrderManager/>} />

                        {/* b2bcompany rates */}
                        <Route path='/Admin/UploadCompanyRates' element={<UploadCompanyRates/>} />



                        {/* Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />



                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}







