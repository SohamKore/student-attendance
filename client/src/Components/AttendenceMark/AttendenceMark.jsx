import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

function AttendanceMark() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    if (scanResult) {
      processAttendanceURL(scanResult);
    }
  }, [scanResult]);

  const handleScan = data => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleError = error => {
    console.error('Error scanning QR code:', error);
  };

  const processAttendanceURL = url => {
    const studentId = extractStudentIdFromURL(url);
    markAttendance(studentId);
  };

  const extractStudentIdFromURL = url => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('studentId');
  };

  const markAttendance = studentId => {
    axios.post(`https://localhost:3001/mark-present/${ studentId }`)
      .then(response => {
        console.log('Attendance marked successfully:', response.data);
      })
      .catch(error => {
        console.error('Error marking attendance:', error);
      });
  };

  return (
    <div>
      <h2>Mark Attendance</h2>

      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />

      {scanResult && (
        <div>
          <h4>Scanned Result:</h4>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}

export default AttendanceMark;
