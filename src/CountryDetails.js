import React from 'react';

const CountryDetails = ({selectedCountry, selectedPreviousCountry, handleCloseModal}) => {
    return (
        <>
            <h1>{selectedCountry[3]}</h1>
            <table className="table table-borderless">
                <tbody>
                <tr>
                        <td>Confirmed:</td>
                        <td>{selectedCountry[7]}</td>
                    </tr>
                    <tr>
                        <td>Deaths:</td>
                        <td>{selectedCountry[8]}</td>
                    </tr>
                    <tr>
                        <td>Recovered:</td>
                        <td>{selectedCountry[9]}</td>
                    </tr>
                    <tr>
                        <td>Newly infected:</td>
                        <td>{+selectedCountry[7] - +selectedPreviousCountry[7]}</td>
                    </tr>
                    <tr>
                        <td>New deaths:</td>
                        <td>{+selectedCountry[8] - +selectedPreviousCountry[8]}</td>
                    </tr>
                </tbody>
            </table>
            <button className="btn btn-info" onClick={() => handleCloseModal()}>Close</button>
        </>
     );
}

export default CountryDetails;