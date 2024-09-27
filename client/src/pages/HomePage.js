import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DoctorList from "../components/DoctorList";
import Layout from "./../components/Layout";
import api from "../ApiService/ApiService";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await api.get(
        "https://doc-appoint-snowy.vercel.app/api/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h3 className="text-center">Home Page</h3>
      <br/>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;