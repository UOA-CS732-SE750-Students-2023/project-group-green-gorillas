import React, { useEffect } from "react";
import Demo from "./demo";
import { Container } from "@mui/material";
import { TopNavBar } from "../../common/TopNavBar";

export const UserManagementScreen = () => {
  return <Container><TopNavBar></TopNavBar><Demo /></Container>;
};