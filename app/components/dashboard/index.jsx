import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Home from "./home/Home";
import Settings from "../../components/dashboard/settings/Settings";
import Usage from "../../components/dashboard/usage/Usage";
import { GlobalContext, UserContext } from "../../lib/context";

const Dashboard = (billData) => {
  const { globalData, setGlobalContext } = useContext(GlobalContext);
  const userData = useContext(UserContext);

  const tabs = {
    home: { component: <Home billData={billData.billData} />, name: "home" },
    usage: { component: <Usage />, name: "usage" },
    settings: { component: <Settings />, name: "settings" },
  };
  const [activeTab, setActiveTab] = useState(tabs.home);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleTab = (tab) => {
    switch (tab) {
      case "usage":
        setActiveTab(() => tabs.usage);
        break;
      case "settings":
        setActiveTab(tabs.settings);
        break;
      case "home":
        setActiveTab(tabs.home);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tab")) {
      setGlobalContext("settings");
      localStorage.removeItem("tab");
    }
  }, []);

  useEffect(() => {
    handleTab(globalData.dashboard.activeTab);
    console.log("hello", activeTab);
  }, [globalData.dashboard.activeTab]);

  return (
    <Box
      // boxShadow="0 0 5px black"
      // borderRadius="5px"
      display="flex"
      // m="30px"
      width="100%"
      // height="100%"
      sx={{ height: "calc(100% - 60px)" }}
    >
      <Box
        boxShadow="0 0 5px black"
        height="fit-content"
        width="fit-content"
        m="60px 30px 30px 30px"
        borderRadius="5px"
        gridColumn="1"
        hidden={!isNonMobile}
      >
        <Box m="30px 0 30px 0">
          <List>
            <ListItem disablePadding sx={{ width: "150px" }}>
              <ListItemButton
                selected={activeTab.name === "home"}
                onClick={() => {
                  setActiveTab(tabs.home);
                }}
                sx={{
                  textAlign: "center",
                  "&.Mui-selected": {
                    boxShadow: "inset 0 0 5px black",
                  },
                }}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeTab.name === "usage"}
                onClick={() => {
                  setActiveTab(tabs.usage);
                }}
                sx={{
                  textAlign: "center",
                  "&.Mui-selected": {
                    boxShadow: "inset 0 0 5px black",
                  },
                }}
              >
                <ListItemText primary="Usage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeTab.name === "settings"}
                onClick={() => {
                  setActiveTab(tabs.settings);
                }}
                sx={{
                  textAlign: "center",
                  "&.Mui-selected": {
                    boxShadow: "inset 0 0 5px black",
                  },
                }}
              >
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box m=" 30px 30px 30px 0" height="fit-content" width="100%">
        {activeTab.component}
      </Box>
    </Box>
  );
};

export default Dashboard;

Dashboard.requireAuth = true; //Require user to be logged in to view this page.
