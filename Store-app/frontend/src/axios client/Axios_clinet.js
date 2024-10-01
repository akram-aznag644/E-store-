import React from 'react'

import axios from "axios";
const Axios_client=axios.create({
    baseURL:"http://localhost:8000/api"
});
export default Axios_client;
