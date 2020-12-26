import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

function AxiosData() {
  const [jsonData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const response = await axios.get(
          "https://www.instagram.com/sooyaaa__/?__a=1"
        );
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>Error</div>;
  if (!jsonData) return null;
  return (
    <>
      <Post jsonData={jsonData} />
    </>
  );
}
export default AxiosData;
