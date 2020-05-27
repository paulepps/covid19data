import React from 'react';

const VirusDataTableRow = ({rowData, handleOpenModal}) => {
    return (
        <tr onClick={() => handleOpenModal()}>
            <td>
                {rowData[3]}
           </td>
            <td>
                {rowData[7]}
            </td>
            <td>
                {rowData[8]}
            </td>
        </tr>
     );
}

export default VirusDataTableRow;