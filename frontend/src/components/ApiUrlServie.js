
import axios from "axios"

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);



apiClient.interceptors.request.use((config) => {
    const tokenJWT=sessionStorage.getItem("jwtToken");
    if (tokenJWT) {
        config.headers.Authorization = `${tokenJWT}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//Add user 
export const addUserApi = () => apiClient.get('/employee')

//Delete User
export const deleteUserApi = (id) => apiClient.delete(`/employee/${id}`)

//Register User
export const PostUserById
    = (employee) => apiClient.post('/employee/register', employee)


export const loginUserByEmailAndPassword
    = (loginData) => apiClient.post('/authenticate', loginData)
    
export const getuserByUseridApi = (id) => apiClient.get(`/employee/${id}`);


export const getUserDocumentsApi = async (userId) => {
    return await axios.get(`/api/documents/user/${userId}`);
};



// Fetch all employees 
export const getAllUsersApi = async () => {
    return await apiClient.get('/employee');
};

//Add new user
export const addNewUserApi = async (employeeData) => {
    return await apiClient.post('/employee/register', employeeData);  
};


// Add Pending Requests API
export const getPendingRequestsApi = async () => {
    return await apiClient.get('/employee/pending');  
};

// Approve Request API
export const approveRequestApi = async (id) => {
    return await apiClient.put(`/employee/approve/${id}`);
};

// Reject Request API
export const rejectRequestApi = async (id) => {
    return await apiClient.delete(`/employee/reject/${id}`); 
};


//View Financial Documents
export const viewDocumentApi = (userId) => apiClient.get(`/s3/documents/${userId}`);


//Upload Financial Documents
export const uploadDocumentApi = (userId, file) => {
    const tokenJWT = sessionStorage.getItem("jwtToken");
    return apiClient.post(`/s3/upload/${userId}`, file, {
        headers: {
            'Authorization': tokenJWT ,
            'Content-Type': 'multipart/form-data'
        }
    });
};



//UPDATE EXISTING USER DETAILS 
export const updateUserApi = async (id, updatedEmployee) => {
    try {
        const tokenJWT = sessionStorage.getItem("jwtToken");
        const response = await apiClient.put(`/employee/${id}`, updatedEmployee, {
            headers: {
                'Authorization': `Bearer ${tokenJWT}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in updateUserApi:", error.response?.data || error.message);
        throw error;
    }
};


// New function for importing user files
export const uploadUserFileApi = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const tokenJWT = sessionStorage.getItem("jwtToken");
        const response = await apiClient.post('/employees/import', formData, {
            headers: {
                'Authorization': `Bearer ${tokenJWT}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response?.data || error.message);
        throw error;
    }
};



