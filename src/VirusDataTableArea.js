import React, { Component } from 'react';
import { readRemoteFile } from 'react-papaparse'
import moment from 'moment';
import VirusDataTableRow from './VirusDataTableRow';
import { CronJob } from 'cron';
import Modal from 'react-modal';
import CountryDetails from './CountryDetails';

export class VirusDataTableArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            previousDayData: [],
            filterString: '',
            showModal: false,
            selectedCountry: '',
            selectedCountryPreviousDayData: ''
        }
        // new CronJob('00 00 00 * * *', this.fetchData(), null, true, 'America/Los_Angeles');
        this.fetchData();
    }

    handleOpenModal = key => {
        let country;
        let countryPreviousDayData;

        let r = this.state.filteredData.find(row => row[3] === key);
        if (r) country = r;

        r = this.state.previousDayData.find(row => row[3] === key);
        if (r) countryPreviousDayData = r;

        this.setState({
            showModal: true,
            selectedCountry: country,
            selectedCountryPreviousDayData: countryPreviousDayData
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false,
            selectedCountry: ''
        })
    }

    fetchData = () => {
        let date = moment(new Date()).subtract(1, "days");
        let address = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
        readRemoteFile(address + moment(date).format("MM-DD-YYYY") + ".csv", {
            complete: (results) => this.updateData(results, false)
        });
        readRemoteFile(address + moment(date.subtract(1, "days")).format("MM-DD-YYYY") + ".csv", {
            complete: (results) => this.updateData(results, true)
        });

    }

    handleFilterInputChanged = event => {
        let filteredData = this.state.data.filter(e => e[3].toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({
            filterString: event.target.value,
            filteredData: filteredData
        })
    }

    addStatistics = (filteredResults, result) => {
        filteredResults[7] = filteredResults[7] + Number(result[7]);
        filteredResults[8] = filteredResults[8] + Number(result[8]);
        filteredResults[9] = filteredResults[9] + Number(result[9]);
        return filteredResults;
    }

    updateData = (results, isPreviousDayStatistics) => {
        let filteredResults = [];
        filteredResults.push(["", "", "", "China", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Canada", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "US", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Australia", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "United Kingdom", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Netherlands", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "France", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Denmark", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Mexico", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Brazil", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Spain", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Chile", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Germany", "", "", "", 0, 0, 0, "", ""]);
        filteredResults.push(["", "", "", "Italy", "", "", "", 0, 0, 0, "", ""]);
        results.data.forEach(result => {
            let countryName = result[3];
            if (countryName === "China") {
                filteredResults[0] = this.addStatistics(filteredResults[0], result);
            } else if (countryName === "Canada") {
                filteredResults[1] = this.addStatistics(filteredResults[1], result);
            } else if (countryName === "US") {
                filteredResults[2] = this.addStatistics(filteredResults[2], result);
            } else if (countryName === "Australia") {
                filteredResults[3] = this.addStatistics(filteredResults[3], result);
            } else if (countryName === "United Kingdom") {
                filteredResults[4] = this.addStatistics(filteredResults[4], result);
            } else if (countryName === "Netherlands") {
                filteredResults[5] = this.addStatistics(filteredResults[5], result);
            } else if (countryName === "France") {
                filteredResults[6] = this.addStatistics(filteredResults[6], result);
            } else if (countryName === "Denmark") {
                filteredResults[7] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Mexico") {
                filteredResults[8] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Brazil") {
                filteredResults[9] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Spain") {
                filteredResults[10] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Chile") {
                filteredResults[11] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Germany") {
                filteredResults[12] = this.addStatistics(filteredResults[7], result);
            } else if (countryName === "Italy") {
                filteredResults[13] = this.addStatistics(filteredResults[7], result);
            } else {
                if (result.length !== 1 && countryName !== "Country_Region") {
                    filteredResults.push(result);
                }
            }
        });
        filteredResults.sort((a, b) => b[7] - a[7]);
        if (!isPreviousDayStatistics) {
            this.setState({
                data: filteredResults,
                filteredData: filteredResults
            })
        } else {
            this.setState({
                previousDayData: filteredResults
            })
        }
    }


    render() {
        return (
            <div>
                <h1 className="display-3">COVID19 cases by country</h1>
                <h1 className="display-4">{"data fetched on " + moment(new Date()).format("MMMM Do YYYY")}</h1>


                <Modal isOpen={this.state.showModal}
                    contentLabel="Details"
                    onRequestClose={() => this.handleCloseModal()}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}
                    className="Modal">
                    <CountryDetails
                        selectedCountry={this.state.selectedCountry}
                        selectedPreviousCountry={this.state.selectedCountryPreviousDayData}
                        handleCloseModal={() => this.handleCloseModal()}
                    />
                </Modal>
.
                <input
                    className="form-control"
                    placeholder="Search for country name"
                    type='text'
                    value={this.state.filterString}
                    onChange={e => this.handleFilterInputChanged(e)}
                />

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Country</th>
                            <th>Infected</th>
                            <th>Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredData.map(row => (
                            <VirusDataTableRow key={row} rowData={row} handleOpenModal={() => this.handleOpenModal(row[3])} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}