// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { planReducer } from "./planRelated/planSlice";
import { custReducer } from "./custRelated/custSlice";
import {couriercompanyReducer } from './couriercompanyRelated/couriercompanySlice';  
import { courierRateReducer } from './courierrateRelated/courierrateSlice';
import orderReducer from './orderRelated/orderSlice';
import invoiceReducer from './invoiceRelated/invoiceSlice';
import { walletReducer } from './walletRelated/walletSlice'
import { pickupPointReducer } from './pickuppointRelated/pickupPointSlice'
import { pickupReducer } from './pickuprequestRelated/pickupSlice'
import { reconciliationReducer } from './reconsilationRelated/reconciliationSlice'
import rateCalculatorReducer from './rateCalculatorRelated/rateCalculatorSlice';
import b2bCourierRateReducer from './b2bcourierrateRelated/b2bcourierrateSlice';
import kycReducer from './kycRelated/kycSlice';
import ndrReducer from './ndrRelated/ndrSlice';
import appointmentReducer from './appointmentRelated/appointmentSlice';
import supportReducer from "./supportTicketRelated/supportSlice";
import fileReducer from './csvfileupload/fileSlice';
import rateReducer from './csvfileupload/rateSlice';
import companyRateReducer from "./companyRate/companyRateSlice";




const store = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
    complain: complainReducer,
    sclass: sclassReducer,
    plan: planReducer,
    cust: custReducer,
    couriercompany: couriercompanyReducer, 
    courierRate: courierRateReducer,
    order: orderReducer,
    invoice: invoiceReducer,
    wallet: walletReducer,
    pickupPoint: pickupPointReducer,
    pickup: pickupReducer,
    reconciliation: reconciliationReducer,
    rateCalculator: rateCalculatorReducer,
    b2bcourierRate: b2bCourierRateReducer,
    kyc: kycReducer,
    ndr: ndrReducer,
    appointment: appointmentReducer,
    support: supportReducer,
    files: fileReducer,
    rates: rateReducer,
    companyRate: companyRateReducer,


  },
});

export default store;


