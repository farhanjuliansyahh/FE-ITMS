import React from 'react';

const PaktaIntegritas = () => {
  const newData = [
  {Nama: 'Hanny Rosharliansyah', 
  Nippos: '900494379', 
  NIK: '1234567891234567', 
  JobLevel: 'B1', 
  Kantor:'Kantor Pusat Bandung',}, // New data to be added
  ];
  const symbol = [
    { Nama: ':', Nippos: ':', NIK: ':', JobLevel: ':', Kantor:':' },
  ];
  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '5px'
  };
  const rowStyle = {
    paddingLeft: '20px', // Adjust margin between rows as needed
    fontSize:'14px',
  };
  const rowStyle2 = {
    paddingLeft: '5px', // Adjust margin between rows as needed
    fontSize:'14px',
  };
  const typog = {
    fontWeight: 500, // Adjust margin between rows as needed
    fontSize:'14px',
  };
  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          {symbol.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr >
                <td style={typog}>Nama</td>
                <td style={rowStyle}>{item.Nama}</td>
                <td style={rowStyle2}>{newData[index].Nama}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr >
                <td style={typog}>Nippos</td>
                <td style={rowStyle}>{item.Nippos}</td>
                <td style={rowStyle2}>{newData[index].Nippos}</td> {/* Display new data in the corresponding row */}
              </tr>
              <tr >
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
