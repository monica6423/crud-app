import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Form from "./components/form/Form";
import ParticipantTable from "./components/participantTable/ParticipantTable";

function App() {
  return (
    <div className="page">
      <Layout>
        <table>
          <tbody>
            <Form edit={false} />
          </tbody>
        </table>
        <ParticipantTable />
      </Layout>
    </div>
  );
}

export default App;
