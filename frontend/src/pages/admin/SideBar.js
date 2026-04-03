

// import * as React from 'react';
// import {
//   Divider,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   Tooltip,
//   List,
//   Collapse
// } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// import HomeIcon from "@mui/icons-material/Home";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import PeopleIcon from '@mui/icons-material/People';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import RoomIcon from '@mui/icons-material/Room';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import ScaleIcon from '@mui/icons-material/Scale';
// import CalculateIcon from '@mui/icons-material/Calculate';
// import PublicIcon from '@mui/icons-material/Public';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import { ExpandLess, ExpandMore, MenuBook, Article } from '@mui/icons-material';
// import Folder from '@mui/icons-material/Folder';
// import Block from '@mui/icons-material/Block';
// import SupportAgent from '@mui/icons-material/SupportAgent';
// import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

// // ✅ SCROLLABLE SIDEBAR WRAPPER
// const SidebarWrapper = styled.div`
//   height: 89vh;
//   overflow-y: auto;
// `;

// const SideBar = () => {
//   const location = useLocation();
//   const [openResource, setOpenResource] = React.useState(location.pathname.startsWith("/Admin/packageguide"));
//   const handleResourceClick = () => {
//     setOpenResource(!openResource);
//   };

//   // 🔹 Helper component for List Items with tooltip
//   const SidebarItem = ({ to, icon, text }) => (
//     <Tooltip title={text} placement="right" arrow>
//       <ListItemButton component={Link} to={to}>
//         <ListItemIcon>{icon}</ListItemIcon>
//         <ListItemText primary={text} />
//       </ListItemButton>
//     </Tooltip>
//   );

//   return (
//     <SidebarWrapper>
//       <React.Fragment>
//         <SidebarItem
//           to="/"
//           icon={<HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />}
//           text="Home"
//         />

//         <SidebarItem
//           to="/Admin/custs"
//           icon={<PeopleIcon color={location.pathname.startsWith("/Admin/custs") ? 'primary' : 'inherit'} />}
//           text="Customers"
//         />

//         <SidebarItem
//           to="/Admin/plans"
//           icon={<LocalOfferIcon color={location.pathname.startsWith("/Admin/plans") ? 'primary' : 'inherit'} />}
//           text="Plans"
//         />

//         <SidebarItem
//           to="/Admin/couriercompanys"
//           icon={<LocalShippingIcon color={location.pathname.startsWith("/Admin/couriercompanys") ? 'primary' : 'inherit'} />}
//           text="Courier Companies"
//         />

//         <SidebarItem
//           to="/Admin/ShowKYC"
//           icon={<PublicIcon color={location.pathname.startsWith("/Admin/ShowKYC") ? 'primary' : 'inherit'} />}
//           text="International KYC"
//         />

//         <SidebarItem
//           to="/Admin/ShowNDR&Exception"
//           icon={<ReportProblemIcon color={location.pathname.startsWith("/Admin/ShowNDR&Exception") ? 'primary' : 'inherit'} />}
//           text="NDR & Exception"
//         />

//         <SidebarItem
//           to="/Admin/pickuppoints"
//           icon={<RoomIcon color={location.pathname.startsWith("/Admin/pickuppoints") ? 'primary' : 'inherit'} />}
//           text="PickUp Points"
//         />

//         <SidebarItem
//           to="/Admin/pickurequest"
//           icon={<Inventory2Icon color={location.pathname.startsWith("/Admin/pickurequest") ? 'primary' : 'inherit'} />}
//           text="PickUp Request"
//         />

//         <SidebarItem
//           to="/Admin/ShowAppointments"
//           icon={<EventAvailableIcon color={location.pathname.startsWith("/Admin/ShowAppointments") ? 'primary' : 'inherit'} />}
//           text="Delivery Appointment"
//         />

//         <SidebarItem
//           to="/Admin/ShowExtraWeight"
//           icon={<ScaleIcon color={location.pathname.startsWith("/Admin/ShowExtraWeight") ? 'primary' : 'inherit'} />}
//           text="Weight Reconciliation"
//         />

//         <SidebarItem
//           to="/Admin/ratecalculator"
//           icon={<CalculateIcon color={location.pathname.startsWith("/Admin/ratecalculator") ? 'primary' : 'inherit'} />}
//           text="Rate Calculator"
//         />

//         <SidebarItem
//           to="/Admin/courierrates"
//           icon={<AttachMoneyIcon color={location.pathname.startsWith("/Admin/courierrates") ? 'primary' : 'inherit'} />}
//           text="Company Rates"
//         />

//         <SidebarItem
//           to="/Admin/orders"
//           icon={<ShoppingCartIcon color={location.pathname.startsWith("/Admin/orders") ? 'primary' : 'inherit'} />}
//           text="Orders"
//         />

//         <SidebarItem
//           to="/Admin/invoices"
//           icon={<ReceiptIcon color={location.pathname.startsWith("/Admin/invoices") ? 'primary' : 'inherit'} />}
//           text="Invoices"
//         />

//         <SidebarItem
//           to="/Admin/walletsHistory"
//           icon={<AccountBalanceWalletIcon color={location.pathname.startsWith("/Admin/walletsHistory") ? 'primary' : 'inherit'} />}
//           text="Wallet"
//         />

//         <SidebarItem
//           to="/Admin/ShowSupportTickets"
//           icon={<SupportAgentIcon color={location.pathname.startsWith("/Admin/ShowSupportTickets") ? 'primary' : 'inherit'} />}
//           text="Customer Support"
//         />
//       </React.Fragment>

//       {/* 🔹 Resource Center with Tooltip also */}
//       <>
//         <Tooltip title="Resource Center" placement="right" arrow>
//           <ListItemButton onClick={handleResourceClick}>
//             <ListItemIcon>
//               <MenuBook color={openResource ? 'primary' : 'inherit'} />
//             </ListItemIcon>
//             <ListItemText primary="Resource Center" />
//             {openResource ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </Tooltip>

//         <Collapse in={openResource} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>

//             <SidebarItem
//               to="/Admin/packageguide"
//               icon={<Article color={location.pathname === "/Admin/packageguide" ? 'primary' : 'inherit'} />}
//               text="Package Guide"
//             />

//             <SidebarItem
//               to="/Admin/ZoneMatrix"
//               icon={<Folder color={location.pathname === "/Admin/ZoneMatrix" ? 'primary' : 'inherit'} />}
//               text="Zone Matrix"
//             />

//             <SidebarItem
//               to="/Admin/ProhibitedItems"
//               icon={<Block color={location.pathname === "/Admin/ProhibitedItems" ? 'primary' : 'inherit'} />}
//               text="Prohibited Items"
//             />

//             <SidebarItem
//               to="/Admin/EscalationMatrixPage"
//               icon={<SupportAgent color={location.pathname === "/Admin/EscalationMatrixPage" ? 'primary' : 'inherit'} />}
//               text="Escalation Matrix"
//             />

//             <SidebarItem
//               to="/Admin/TransporterIDs"
//               icon={<ReceiptLongOutlined color={location.pathname === "/Admin/TransporterIDs" ? 'primary' : 'inherit'} />}
//               text="Transporter IDs"
//             />

//             <SidebarItem
//               to="/Admin/TrainingVideos"
//               icon={<VideoLibraryIcon color={location.pathname === "/Admin/TrainingVideos" ? 'primary' : 'inherit'} />}
//               text="Training Videos"
//             />
//           </List>
//         </Collapse>
//       </>
//     </SidebarWrapper>
//   );
// };

// export default SideBar;







import * as React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  List,
  Collapse
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RoomIcon from '@mui/icons-material/Room';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ScaleIcon from '@mui/icons-material/Scale';
import CalculateIcon from '@mui/icons-material/Calculate';
import PublicIcon from '@mui/icons-material/Public';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { ExpandLess, ExpandMore, MenuBook, Article } from '@mui/icons-material';
import Folder from '@mui/icons-material/Folder';
import Block from '@mui/icons-material/Block';
import SupportAgent from '@mui/icons-material/SupportAgent';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

// ✅ SCROLLABLE SIDEBAR WRAPPER
const SidebarWrapper = styled.div`
  height: 89vh;
  overflow-y: auto;
`;

const SideBar = () => {
  const location = useLocation();
  const [openResource, setOpenResource] = React.useState(location.pathname.startsWith("/Admin/packageguide"));
  const handleResourceClick = () => {
    setOpenResource(!openResource);
  };

  // 🔹 Helper function for active color matching multiple paths
  const isActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  // 🔹 Helper component for List Items with tooltip
  const SidebarItem = ({ to, icon, text }) => (
    <Tooltip title={text} placement="right" arrow>
      <ListItemButton component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </Tooltip>
  );

  return (
    <SidebarWrapper>
      <React.Fragment>
        <SidebarItem
          to="/"
          icon={<HomeIcon color={location.pathname === "/" || location.pathname === "/Admin/dashboard" ? 'primary' : 'inherit'} />}
          text="Home"
        />

        <SidebarItem
          to="/Admin/custs"
          icon={<PeopleIcon color={isActive(["/Admin/custs", "/Admin/addcust"]) ? 'primary' : 'inherit'} />}
          text="Customers"
        />

        <SidebarItem
          to="/Admin/plans"
          icon={<LocalOfferIcon color={isActive(["/Admin/plans", "/Admin/addplan"]) ? 'primary' : 'inherit'} />}
          text="Plans"
        />

        <SidebarItem
          to="/Admin/couriercompanys"
          icon={<LocalShippingIcon color={isActive(["/Admin/couriercompanys", "/Admin/addcouriercompany"]) ? 'primary' : 'inherit'} />}
          text="Courier Companies"
        />

        <SidebarItem
          to="/Admin/ShowKYC"
          icon={<PublicIcon color={isActive(["/Admin/ShowKYC", "/Admin/KYCForm"]) ? 'primary' : 'inherit'} />}
          text="International KYC"
        />

        <SidebarItem
          to="/Admin/ShowNDR&Exception"
          icon={<ReportProblemIcon color={isActive(["/Admin/ShowNDR&Exception", "/Admin/NDR&Exception"]) ? 'primary' : 'inherit'} />}
          text="NDR & Exception"
        />

        <SidebarItem
          to="/Admin/pickuppoints"
          icon={<RoomIcon color={isActive(["/Admin/pickuppoints", "/Admin/addpickuppoint"]) ? 'primary' : 'inherit'} />}
          text="PickUp Points"
        />

        <SidebarItem
          to="/Admin/pickurequest"
          icon={<Inventory2Icon color={isActive(["/Admin/pickurequest"]) ? 'primary' : 'inherit'} />}
          text="PickUp Request"
        />

        <SidebarItem
          to="/Admin/ShowAppointments"
          icon={<EventAvailableIcon color={isActive(["/Admin/ShowAppointments", "/Admin/AddAppointment"]) ? 'primary' : 'inherit'} />}
          text="Delivery Appointment"
        />

        <SidebarItem
          to="/Admin/ShowExtraWeight"
          icon={<ScaleIcon color={isActive(["/Admin/ShowExtraWeight", "/Admin/WeightReconciliation"]) ? 'primary' : 'inherit'} />}
          text="Weight Reconciliation"
        />

        <SidebarItem
          to="/Admin/ratecalculator"
          icon={<CalculateIcon color={location.pathname.startsWith("/Admin/ratecalculator") ? 'primary' : 'inherit'} />}
          text="Rate Calculator"
        />

        <SidebarItem
          to="/Admin/courierrates"
          icon={<AttachMoneyIcon color={isActive(["/Admin/courierrates", "/Admin/addcourierrate", "/Admin/addb2bcourierrateCSV"]) ? 'primary' : 'inherit'} />}
          text="Company Rates"
        />

        <SidebarItem
          to="/Admin/orders"
          icon={<ShoppingCartIcon color={isActive(["/Admin/orders", "/Admin/addorder"]) ? 'primary' : 'inherit'} />}
          text="Orders"
        />

        <SidebarItem
          to="/Admin/invoices"
          icon={<ReceiptIcon color={location.pathname.startsWith("/Admin/invoices") ? 'primary' : 'inherit'} />}
          text="Invoices"
        />

        <SidebarItem
          to="/Admin/walletsHistory"
          icon={<AccountBalanceWalletIcon color={isActive(["/Admin/walletsHistory", "/Admin/wallet"]) ? 'primary' : 'inherit'} />}
          text="Wallet"
        />

        <SidebarItem
          to="/Admin/ShowSupportTickets"
          icon={<SupportAgentIcon color={isActive(["/Admin/ShowSupportTickets", "/Admin/AddSupportTicket"]) ? 'primary' : 'inherit'} />}
          text="Customer Support"
        />
      </React.Fragment>

      {/* 🔹 Resource Center */}
      <>
        <Tooltip title="Resource Center" placement="right" arrow>
          <ListItemButton onClick={handleResourceClick}>
            <ListItemIcon>
              <MenuBook color={openResource ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Resource Center" />
            {openResource ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Tooltip>

        <Collapse in={openResource} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <SidebarItem
              to="/Admin/packageguide"
              icon={<Article color={location.pathname === "/Admin/packageguide" ? 'primary' : 'inherit'} />}
              text="Package Guide"
            />

            <SidebarItem
              to="/Admin/ZoneMatrix"
              icon={<Folder color={location.pathname === "/Admin/ZoneMatrix" ? 'primary' : 'inherit'} />}
              text="Zone Matrix"
            />

            <SidebarItem
              to="/Admin/ProhibitedItems"
              icon={<Block color={location.pathname === "/Admin/ProhibitedItems" ? 'primary' : 'inherit'} />}
              text="Prohibited Items"
            />

            <SidebarItem
              to="/Admin/EscalationMatrixPage"
              icon={<SupportAgent color={location.pathname === "/Admin/EscalationMatrixPage" ? 'primary' : 'inherit'} />}
              text="Escalation Matrix"
            />

            <SidebarItem
              to="/Admin/TransporterIDs"
              icon={<ReceiptLongOutlined color={location.pathname === "/Admin/TransporterIDs" ? 'primary' : 'inherit'} />}
              text="Transporter IDs"
            />

            <SidebarItem
              to="/Admin/TrainingVideos"
              icon={<VideoLibraryIcon color={location.pathname === "/Admin/TrainingVideos" ? 'primary' : 'inherit'} />}
              text="Training Videos"
            />
          </List>
        </Collapse>
      </>
    </SidebarWrapper>
  );
};

export default SideBar;




