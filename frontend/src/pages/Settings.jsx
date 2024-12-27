import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import { styled } from "@mui/material/styles";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoLayers } from "react-icons/io5";
import { Profile, Dashboard, Integrations } from "../components/SettingComponents";

const NAV_ITEMS = [
    { title: "Profile", icon: <ImProfile />, component: <Profile /> },
    { title: "Dashboard", icon: <MdDashboard />, component: <Dashboard /> },
    { title: "Integrations", icon: <IoLayers />, component: <Integrations /> },
];

const Settings = () => {
    const location = useLocation();
    const initialTab = location.state?.tabIndex ?? 0;
    const [selectedIndex, setSelectedIndex] = useState(initialTab);

    const SidebarContainer = styled('div')(({ theme }) => ({
        width: '200px',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        borderRight: `1px solid ${theme.palette.divider}`,
    }));

    const SidebarItem = styled('div')(({ theme, active }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '8px',
        backgroundColor: active ? theme.palette.action.selected : 'transparent',
        color: active ? theme.palette.primary.main : 'inherit',
        fontWeight: active ? 'bold' : 'normal',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const handleSidebarClick = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        // Save the selected tab index to localStorage
        localStorage.setItem("selectedIndex", selectedIndex);
    }, [selectedIndex]);

    return (
        <div className="item-center">
            <HomeNav />
            <div style={{ display: "flex" }}>
                <SidebarContainer>
                    <h2 className="text-2xl text-blue-600">Testimonial</h2>
                    <hr className="border-2 border-blue-600" />
                    {NAV_ITEMS.map((item, index) => (
                        <SidebarItem
                            key={index}
                            onClick={() => handleSidebarClick(index)}
                            active={index === selectedIndex}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </SidebarItem>
                    ))}
                </SidebarContainer>
                <div style={{ padding: "10px", flex: 1 }}>
                    {NAV_ITEMS[selectedIndex].component}
                </div>
            </div>
        </div>
    );
};

export default Settings;
