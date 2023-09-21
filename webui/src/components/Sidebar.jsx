import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';


const Sidebar = () => {

    const [openWindow, setOpenWindow] = React.useState(false);
    const handleOpen = () => {
        if (openWindow) setOpenWindow(false);
        if (!openWindow) setOpenWindow(true);
    }

    return (
        <>
            <div className='fixed top-3 right-6 z-50 bg-white border border-gray-500  rounded'>
                <MenuIcon className='cursor-pointer' style={{ fontSize: '2rem' }} onClick={handleOpen} />
            </div>
            {openWindow ?
                <div className='sidebar flex-col justify-center items-center bg-white w-[17rem] h-screen py-4 px-4 overflow-y-auto shadow fixed top-0 left-0 transition-all duration-500 z-30' style={{ transform: 'translateX(0rem)' }}>
                    <div className="top mb-4 flex justify-start items-center sticky">
                        <CloseIcon className='absolute -top-2 left-56 cursor-pointer' onClick={handleOpen} />
                        <a href="/" className="flex flex-col md:flex-row items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ml-0 md:ml-2">Smart Vehicle</span>
                        </a>
                    </div>
                    <hr />
                    <div className="middle my-4 flex-col">
                        <a href="/" className='mt-6 p-2 text-gray-600 hover:bg-gray-300 rounded-lg flex justify-start items-center cursor-pointer'>
                            <DashboardIcon />
                            <p className=' ml-4'>Map UI</p>
                        </a>
                        <a href="/speedometer" className='mt-6 p-2 text-gray-600 hover:bg-gray-300 rounded-lg flex justify-start items-center cursor-pointer'>
                            <PersonIcon />
                            <p className=' ml-4'>Speedometer</p>
                        </a>
                    </div>
                    <hr />
                    <div className="bottom my-4">
                        <img src="https://templates.iqonic.design/note-plus/html/assets/images/layouts/side-bkg.png" alt="myImanpm rge" width='500' />
                    </div>
                </div>
                :
                <div className='sidebar flex-col justify-center items-center bg-white w-[17rem] h-screen rounded-xl py-4 px-4 overflow-y-auto fixed top-0 left-0 transition-all duration-500 z-30 shadow' style={{ transform: 'translateX(-20rem)' }}>
                </div>
            }
        </>
    )
}

export default Sidebar