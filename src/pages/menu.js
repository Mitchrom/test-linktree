import { styles } from "@/styles/style";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllTableElements } from "./crud/getElement";

const Menu = () => {
  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTableElements("links");
      setTableData(data);
    };
    fetchData();
  }, []);

  console.log(tableData);

  return (
    <>
      <Navbar />
      <h1>Hello</h1>
      {tableData.length > 0 ? (
        <>
          <h2>Liens enregistrés</h2>
          {tableData.map((ele, i) => (
            <li key={i}>
              <a href={ele.url}>{ele.title}</a>{" "}
            </li>
          ))}
        </>
      ) : (
        <p>Aucun lien n'est enregistré</p>
      )}
      <button
        onClick={() => router.push("/dashboard")}
        className={`${styles.button}`}
      >
        Dashboard
      </button>
    </>
  );
};

export default Menu;
