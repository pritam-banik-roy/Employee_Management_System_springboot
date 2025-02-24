import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadUserFileApi } from './ApiUrlServie';
import 'font-awesome/css/font-awesome.min.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
`;

const Card = styled.div`
  width: 500px;
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 10px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
  }
  &:hover {
    color: #0056b3;
  }
`;

const FileUploadSection = styled.div`
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadLabel = styled.label`
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
  font-weight: 500;
`;

const FileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.label`
  padding: 12px 25px;
  background-color: #6200ea;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s ease;
  margin-top: 5px;
  &:hover {
    background-color: #3700b3;
  }
`;

const UploadButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #018786;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #00796b;
  }
  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  margin-top: 10px;
  color: #018786;
  font-size: 16px;
  font-weight: 600;
`;

const SuccessMessage = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: #018786;
  font-weight: 600;
  text-align: center;
`;

// const RetryLink = styled.a`
//   display: block;
//   margin-top: 10px;
//   color: #007bff;
//   text-decoration: none;
//   font-weight: 600;
//   cursor: pointer;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const LogoutButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #E74C3C;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #c0392b;
  }
`;

const FileNameDisplay = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

function ImportUserPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      try {
        await uploadUserFileApi(file);
        setUploadSuccess(true);
        alert('File uploaded successfully!');
      } catch (error) {
        alert('Error uploading file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <Container>
      <Card>
        <BackButton onClick={() => navigate(-1)}>
          <i className="fa fa-arrow-left"></i> Back
        </BackButton>

        <Heading>Import Users via Document Upload</Heading>

        <FileUploadSection>
          <UploadLabel>Select Excel File</UploadLabel>
          <SelectFileButton htmlFor="file-upload">Choose File</SelectFileButton>
          <FileInput type="file" id="file-upload" accept=".xls,.xlsx" onChange={handleFileChange} />
          {file && <FileNameDisplay>{file.name}</FileNameDisplay>}
        </FileUploadSection>

        <UploadButton onClick={handleUpload} disabled={isUploading || uploadSuccess}>
          {isUploading ? 'Uploading...' : 'Upload File'}
        </UploadButton>

        {isUploading && <LoadingSpinner>Uploading file, please wait...</LoadingSpinner>}
        {uploadSuccess && <SuccessMessage>File uploaded successfully!</SuccessMessage>}
      </Card>

      <LogoutButton onClick={() => navigate('/')}>Log Out</LogoutButton>
    </Container>
  );
}

export default ImportUserPage;
