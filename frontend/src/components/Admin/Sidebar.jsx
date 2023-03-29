import React from 'react'
import './Sidebar.css'
import logo from "../../logo.png";
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
    <div className="sidebar">
        <Link to='/' >
            <img src={logo} alt='Logo' />
        </Link>
        <Link to='/admin/dashboard' >
            <p>
                <DashboardIcon/> Dashboard
            </p>
        </Link>
        <Link  >

            <TreeView 
             defaultCollapseIcon={<ExpandMoreIcon/>}
             defaultExpandIcon={<ImportExportIcon/>}
             >
                <TreeItem nodeId='1' label='Products' >
                    <Link to = '/admin/products' >
                    <TreeItem nodeId='2' label='ALL' icon={<PostAddIcon/>} />
                    </Link>

                    <Link to = '/admin/products' >
                    <TreeItem nodeId='3' label='Create' icon={<AddIcon/>} />
                    </Link>

                </TreeItem>

            </TreeView>

        </Link>
    </div>
    

    </>
  )
}

export default Sidebar