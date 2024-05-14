import React, { useEffect, useState } from 'react';

const PaktaIntegritas = ({ detail }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (detail) {
      setIsLoading(false);
    }
  }, [detail]);
  const newData = [
    {
      Nama: detail?.nama ?? 'N/A',
      Nippos: detail?.nippos ?? 'N/A',
      NIK: detail?.nik ?? 'N/A',
      JobLevel: detail?.job_level ?? 'N/A',
      Kantor: detail?.nopend?.nama_kantor ?? 'N/A',
    }
  ];

  const symbol = [
    { Nama: ':', Nippos: ':', NIK: ':', JobLevel: ':', Kantor: ':' },
  ];

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '5px'
  };

  const rowStyle = {
    paddingLeft: '20px', // Adjust margin between rows as needed
    fontSize: '14px',
  };

  const rowStyle2 = {
    paddingLeft: '5px', // Adjust margin between rows as needed
    fontSize: '14px',
  };

  const typog = {
    fontWeight: 500, // Adjust margin between rows as needed
    fontSize: '14px',
  };

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          {symbol.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td style={typog}>Nama</td>
                <td style={rowStyle}>{item.Nama}</td>
                <td style={rowStyle2}>{newData[index].Nama}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr>
                <td style={typog}>Nippos</td>
                <td style={rowStyle}>{item.Nippos}</td>
                <td style={rowStyle2}>{newData[index].Nippos}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr>
                <td style={typog}>NIK</td>
                <td style={rowStyle}>{item.NIK}</td>
                <td style={rowStyle2}>{newData[index].NIK}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr>
                <td style={typog}>Job Level</td>
                <td style={rowStyle}>{item.JobLevel}</td>
                <td style={rowStyle2}>{newData[index].JobLevel}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr>
                <td style={typog}>Kantor</td>
                <td style={rowStyle}>{item.Kantor}</td>
                <td style={rowStyle2}>{newData[index].Kantor}</td> {/* Display new data in the corresponding row */}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaktaIntegritas;
