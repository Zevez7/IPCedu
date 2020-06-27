import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCovidList } from "../../../redux/action/publicAction";
import AdminContentCovidList from "./CovidList";
import AdminContentUnit from "./AdminContentUnit";
import { fetchAllUnit } from "../../../redux/action/adminAction";

const AdminContent = ({
  fetchCovidList,
  covidList,
  fetchAllUnit,
  allUnitList,
}) => {
  useEffect(() => {
    fetchCovidList();
    fetchAllUnit();
  }, [fetchCovidList, fetchAllUnit]);

  return (
    <>
      <AdminContentCovidList covidList={covidList} />

      <AdminContentUnit allUnitList={allUnitList} />
    </>
  );
};

const mapStateToProps = (state) => ({
  covidList: state.publicData.covidList,
  allUnitList: state.adminData.allUnit,
});

const mapDispatchToProps = { fetchCovidList, fetchAllUnit };

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);
