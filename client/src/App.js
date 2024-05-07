import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




// Pickup and Delivery Manager
import LayoutWithHeaderPD from './PickupAndDEliveryManager/LayoutWithHeader';
import PdManagerPage from './PickupAndDEliveryManager/Header'; // Correct the import path
import AddDeliveryRequest from './PickupAndDEliveryManager/AddDeliveryRequest';
import DeliveryHistoryP from './PickupAndDEliveryManager/ViewDeliveryRequest';
import EditDeliveryRequest from './PickupAndDEliveryManager/EditDeliveryRequest';
import DashboardPage from './PickupAndDEliveryManager/dashboard';
import MonthlyDeliveryReport from './PickupAndDEliveryManager/MonthlyDeliveryReport';
import FullDeliveryReport from './PickupAndDEliveryManager/fullreport';
import WelcomePagePD from './PDWelcomePage/WelcomePagePDM';
import DeliveriesView from './OtherManagersPD/ViewDelivery';
import PickupsView from './OtherManagersPD/ViewPickup';
import MonthlyDeliveries from './FactoryManager/MonthlyTeaDelivery';
import Header from './OtherManagersPD/header';
import LayoutForOutside from './OtherManagersPD/LayoutForOutside';
import DeliveryRequest from './FactoryManager/DeliveryRequest'; // Correct the import path
import DeliveryHistory from './FactoryManager/DeliveryHistory';
import FactoryLogin from './FactoryManager/factorylogin'; // Adjust the import path and naming convention
import Layout from './FactoryManager/LayoutWithHeaderFactoryManager';
import DashboardPageFM from './FactoryManager/dashboardFM';
import RLayout from './ResourceManager/ResourceManagerLayout';
import ViewResourceHistory from'./ResourceManager/ViewResorceRequest';
import NewResourceRequest from './ResourceManager/ViewNewResourceRequests';
import ResourceManagerHeader from './ResourceManager/Header';
import EditDelivery from './ResourceManager/EditDelivery'; // Adjust the path as per your project structure
import DashboardRM from './ResourceManager/dashboard';


import WeatherDisplay from "./WCSupervisor/viewWeather";
import TaskDataViewer from "./WCSupervisor/viewtasks";
import Employee from "./WCSupervisor/LayoutWithHaderEmployee";
import ScheduleDataViewer from  "./WCSupervisor/viewshedule";
import EmployeeCountTable from "./WCSupervisor/dashboard";


import AddCultivationForm from "./CultivationManager/addPlantData";
import AddSchedule from "./CultivationManager/addSheduleData";
import NICList from "./CultivationManager/viewEmployee";
import EditModal from "./CultivationManager/EditModal"
import AddEmployeeModal from "./CultivationManager/addEmployee";
import AddTaskForm from "./CultivationManager/addtask";
import TaskList from "./CultivationManager/viewtaskdata";
import EditTask from "./CultivationManager/edittask";
import Weather from "./CultivationManager/viewWeatherforcast";
import LayoutWithHeader from "./CultivationManager/LayoutWithHader";
import ScheduleTable from "./CultivationManager/viewSheduleData";
import EditCultivation from "./CultivationManager/editPlantData";
import CultivationData from "./CultivationManager/viewPlantDetails";
import EditSchedule from "./CultivationManager/EditSchedule";
import Dashboard from "./CultivationManager/dashboardManager";
import Calendar from "./CultivationManager/calander";
import ChartComponent from "./CultivationManager/chart";
import ReportGenerator from "./CultivationManager/ReportGenerate";

import 'react-big-calendar/lib/css/react-big-calendar.css';

import WelcomePageCM from "./WCWelcomPage/welcomepage";
import Home from "./Home";

import AddHarvestData from "./HISupervisor/addharvest";
import ViewHarvest from "./HISupervisor/viewHarvestData";
import EditHarvest from "./HISupervisor/edit";
import DashboardHISupervisor from "./HISupervisor/dashboard";

import UpdateHarvest from "./HarvestAndInventoryManager/updateHarvest";
import ViewAcceptedData from "./HarvestAndInventoryManager/viewAcceptHarvestData";
import EditHarvestPageManager from "./HarvestAndInventoryManager/editHarvestData";
import ViewRejectData from "./HarvestAndInventoryManager/viewRejectedData";
import EditRejectedHarvestPageManager from "./HarvestAndInventoryManager/editReject";
import AddDeliveryData from "./HarvestAndInventoryManager/addDelivereddata";
import ViewDelivery from './HarvestAndInventoryManager/viewDeliveryData';
import EditDeliveryData from "./HarvestAndInventoryManager/editDeliveryData";
import InventoryDifference from "./HarvestAndInventoryManager/inventory";
import HIDashboard from "./HarvestAndInventoryManager/dashboard";
import PickersTable from "./HarvestAndInventoryManager/pickerdetails";

import HIWelcomePage from "./HIWelcome/welcomepage";
import HIViewInvwntory from "./HIOtherManagers/viewIenventory";
import LayoutWithHeaderHI from "./HarvestAndInventoryManager/LayoutWithHader";
import LayoutWithHeaderHISupervisor from "./HISupervisor/LayoutWithHader";
import DifferenceQuantity from "./HIOtherManagers/viewIenventory";


import MRHeader from './MREmployee/header';
import EmpDashboard from './MREmployee/dashboard';
import AddRepair from './MREmployee/addrepair';
import AddMaintenance from './MREmployee/addmaintenance';
import MRViewStatus from './MREmployee/viewstatus';
import MREdit from './MREmployee/edit';
import EditMaintenance from './MREmployee/editmaintenance';
import EditRepair from './MREmployee/editrepair';


import MRManagerDashboard from './MRManager/ManagerDashboard';

import MaintenanceRequests from './MRManager/MaintenanceRequest';
import MaintenanceStatus from './MRManager/MaintenanceStatus';
import MaintenancePending from './MRManager/MaintenancePending';
import MaintenanceInProgress from './MRManager/MaintenanceInProgress';
import MaintenanceCompleted from './MRManager/MaintenanceCompleted';

import RepairRequests from './MRManager/RepairRequest';
import RepairStatus from './MRManager/RepairStatus';
import RepairPending from './MRManager/RepairPending';
import RepairInProgress from './MRManager/RepairInProgress';
import RepairCompleted from './MRManager/RepairCompleted';

import MRTechnicianDashboard from './MRTechnician/TechnicianDashboard';
import MRTechnicianMenu from './MRTechnician/TechnicianMenu';
import MRTechnicianMaintenanceRequest from './MRTechnician/MaintenanceInProgress';
import MRTechnicianRepairRequest from './MRTechnician/RepairInProgress';
import WelcomePageMR from "./WelcomePageMR/welcomepageMR";

import ManagerMenu from './MRManager/ManagerMenu';
import MRHeaderLayout from "./MREmployee/MRHeader";
import LayoutWithHeaderTechnician from "./MRTechnician/LayoutforTechnician";



// AddRepairPage includes the MRHeader and the AddRepair components




function App() {
  return (
    
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Routes>
                <Route path="/WelcomePagePD" element={<WelcomePagePD />} />
                <Route path="/WelcomePageMR" element={<WelcomePageMR />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/pd-manager" element={<PdManagerPage />} />
                <Route path="/DeliveriesView" element={<DeliveriesView />} />
                <Route path="/login" element={<login />} />
                <Route path="/MonthlyDeliveries" element={<MonthlyDeliveries />} />
                <Route path="/PickupsView" element={<PickupsView />} /> // Ensure this points to the correct PickupAndDEliveryManager
                <Route path="/header" element={<Header />} />
                <Route path="/NewDeliveryRequest" element={<Layout><DeliveryRequest /></Layout>} />
                <Route path="/DeliveryHistory" element={<Layout><DeliveryHistory /></Layout>} />
                <Route path="/DashboardPageFM" element={<Layout><DashboardPageFM /></Layout>} />
                <Route path="/ViewDeliveryRequestHistory" element={<LayoutWithHeaderPD><DeliveryHistoryP /></LayoutWithHeaderPD>} />
                <Route path="/addDeliveryRequest" element={<LayoutWithHeaderPD><AddDeliveryRequest /></LayoutWithHeaderPD>} />
                <Route path="/EditDeliveryRequest/:id" element={<LayoutWithHeaderPD><EditDeliveryRequest /></LayoutWithHeaderPD>} />
                <Route path="/DashboardPage" element={<LayoutWithHeaderPD><DashboardPage /></LayoutWithHeaderPD>} />\
                <Route path="/MonthlyDeliveryReport" element={<LayoutWithHeaderPD><MonthlyDeliveryReport /></LayoutWithHeaderPD>} />
                <Route path="/FullDeliveryReport" element={<LayoutWithHeaderPD><FullDeliveryReport /></LayoutWithHeaderPD>} />
                {/* Add other routes as needed */}
                <Route path="/ViewResourceHistory" element={<RLayout><ViewResourceHistory/></RLayout>}/>
                <Route path="/NewResourceRequest" element={<RLayout><NewResourceRequest/></RLayout>}/>
                <Route path="/resource-manager" element={<RLayout><ResourceManagerHeader/></RLayout>}/>
                <Route path="/editDelivery/:id" element={<RLayout><EditDelivery /></RLayout>} />
                <Route path="/Dashboard" element={<RLayout><DashboardRM /></RLayout>} />

               
<Route path='/MREmployee' element={<EmpDashboard />} />
    <Route path='/MREmployee/addrepair' element={<MRHeaderLayout><AddRepair /></MRHeaderLayout>} />
    <Route path='/MREmployee/addmaintenance' element={<MRHeaderLayout><AddMaintenance /></MRHeaderLayout>} />
    <Route path='/MREmployee/viewstatus' element={<MRHeaderLayout><MRViewStatus /></MRHeaderLayout>} />
    <Route path='/MREmployee/edit' element={<MRHeaderLayout><MREdit /></MRHeaderLayout>} />
    <Route path='/MREmployee/editmaintenance' element={<MRHeaderLayout><EditMaintenance /></MRHeaderLayout>} />
    <Route path='/MREmployee/editrepair' element={<MRHeaderLayout><EditRepair /></MRHeaderLayout>} />
    {/* import ManagerMenu from './MRManager/ManagerMenu';
import MRHeaderLayout from "./MREmployee/MRHeader"; */}
       



        <Route path='/MRManager' element={<MRManagerDashboard />} />

      
    <Route path='/MRManager/maintenancerequests' element={<ManagerMenu><RepairRequests /></ManagerMenu>} />
    <Route path='/MRManager/repairstatus' element={<ManagerMenu><RepairStatus /></ManagerMenu>} />
    <Route path='/MRManager/repairpending' element={<ManagerMenu><RepairPending /></ManagerMenu>} />
    <Route path='/MRManager/repairinprogress' element={<ManagerMenu><RepairInProgress /></ManagerMenu>} />
    <Route path='/MRManager/repaircompleted' element={<ManagerMenu><RepairCompleted /></ManagerMenu>} />
 
  

        
    
       
        <Route path='/MRManager/maintenancerequests' element={<MRHeader ><MaintenanceRequests /></MRHeader>} />
        <Route path='/MRManager/maintenancestatus' element={<MRHeader ><MaintenanceStatus /></MRHeader>} />
        <Route path='/MRManager/maintenancepending' element={<MRHeader ><MaintenancePending /></MRHeader>} />
        <Route path='/MRManager/maintenanceinprogress' element={<MRHeader ><MaintenanceInProgress /></MRHeader>} />
        <Route path='/MRManager/maintenancecompleted' element={<MRHeader ><MaintenanceCompleted /></MRHeader>} />
        

        <Route path='/Technician' element ={<MRTechnicianDashboard/>} />
        <Route path='/Technician/maintenancerequest' element={<LayoutWithHeaderTechnician><MRTechnicianMaintenanceRequest/></LayoutWithHeaderTechnician>} />
        <Route path='/Technician/repairrequest' element={<LayoutWithHeaderTechnician><MRTechnicianRepairRequest/></LayoutWithHeaderTechnician>} />







        <Route path="/WeatherDisplay" element={<Employee><WeatherDisplay /></Employee>} />  
        <Route path="/TaskDataViewer" element={<Employee><TaskDataViewer /></Employee>} />  
        <Route path="/ScheduleDataViewer" element={<Employee><ScheduleDataViewer /></Employee>} />  
        <Route path="/EmployeeCountTable" element={<Employee><EmployeeCountTable /></Employee>} />
        <Route path="/WelcomePageCM" element={<WelcomePageCM />} />  
        <Route path="/AddCultivationForm" element={<LayoutWithHeader><AddCultivationForm /></LayoutWithHeader>} />
        <Route path="/AddSchedule" element={<LayoutWithHeader><AddSchedule /></LayoutWithHeader>} />
        <Route path="/ScheduleTable" element={<LayoutWithHeader><ScheduleTable /></LayoutWithHeader>} />
        <Route path="/CultivationData" element={<LayoutWithHeader><CultivationData /></LayoutWithHeader>} />
        <Route path="/EditCultivation/:id" element={<LayoutWithHeader><EditCultivation /></LayoutWithHeader>} />
        <Route path="/edit-schedule/:id" element={<LayoutWithHeader><EditSchedule /></LayoutWithHeader>} />
        <Route path="/NICList" element={<LayoutWithHeader><NICList /></LayoutWithHeader>} />
        <Route path="/EditModal/:id" element={<LayoutWithHeader><EditModal /></LayoutWithHeader>} />
        <Route path="/AddEmployeeModal" element={<LayoutWithHeader><AddEmployeeModal /></LayoutWithHeader>} />
        <Route path="/AddTaskForm" element={<LayoutWithHeader><AddTaskForm /></LayoutWithHeader>} />
        <Route path="/TaskList" element={<LayoutWithHeader><TaskList /></LayoutWithHeader>} />
        <Route path="/EditTask/:id" element={<LayoutWithHeader><EditTask /></LayoutWithHeader>} />
        <Route path="/Weather" element={<LayoutWithHeader><Weather /></LayoutWithHeader>} />
        <Route path="/dasboard" element={<LayoutWithHeader><Dashboard /></LayoutWithHeader>} />
        <Route path="/Calendar" element={<LayoutWithHeader><Calendar /></LayoutWithHeader>} />
        <Route path="/ChartComponent" element={<LayoutWithHeader><ChartComponent /></LayoutWithHeader>} />
        <Route path="/ReportGenerator" element={<LayoutWithHeader><ReportGenerator /></LayoutWithHeader>} />


        <Route path="/AddHarvestData" element={<LayoutWithHeaderHISupervisor><AddHarvestData /></LayoutWithHeaderHISupervisor>} />
      <Route path="/ViewHarvest" element={<LayoutWithHeaderHISupervisor><ViewHarvest /></LayoutWithHeaderHISupervisor>} />
      <Route path="/editHarvest/:id" element={<LayoutWithHeaderHISupervisor><EditHarvest /></LayoutWithHeaderHISupervisor>} />
      <Route path="/DashboardHISupervisor" element={<LayoutWithHeaderHISupervisor><DashboardHISupervisor /></LayoutWithHeaderHISupervisor>} />
        <Route path="/UpdateHarvest" element={<LayoutWithHeaderHI><UpdateHarvest /></LayoutWithHeaderHI>} />
        <Route path="/ViewAcceptedData" element={<LayoutWithHeaderHI><ViewAcceptedData /></LayoutWithHeaderHI>} />
        <Route path="/EditHarvestPageManager/:id" element={<LayoutWithHeaderHI><EditHarvestPageManager /></LayoutWithHeaderHI>} />
        <Route path="/ViewRejectData" element={<LayoutWithHeaderHI><ViewRejectData /></LayoutWithHeaderHI>} />
        <Route path="/EditRejectedHarvestPageManager/:id" element={<LayoutWithHeaderHI><EditRejectedHarvestPageManager /></LayoutWithHeaderHI>} />
        <Route path="/AddDeliveryData" element={<LayoutWithHeaderHI><AddDeliveryData /></LayoutWithHeaderHI>} />
        <Route path="/viewdelivery" element={<LayoutWithHeaderHI><ViewDelivery /></LayoutWithHeaderHI>} />
        <Route path="/EditDeliveryData/:id" element={<LayoutWithHeaderHI><EditDeliveryData /></LayoutWithHeaderHI>} />
        <Route path="/InventoryDifference" element={<LayoutWithHeaderHI><InventoryDifference /></LayoutWithHeaderHI>} />
        <Route path="/HIDashboard" element={<LayoutWithHeaderHI><HIDashboard /></LayoutWithHeaderHI>} />
        <Route path="/PickersTable" element={<LayoutWithHeaderHI><PickersTable /></LayoutWithHeaderHI>} />

        <Route path="/HIWelcomePage" element={<HIWelcomePage />} />
        <Route path="/HIViewInvwntory" element={<HIViewInvwntory />} />
        <Route path="/DifferenceQuantity" element={<DifferenceQuantity />} />


              </Routes>
            </div>
          </div>
        </div>
      </Router>
   
  );
}

export default App;
