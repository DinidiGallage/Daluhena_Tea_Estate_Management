import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadPDFIcon from '../../images/Icons/downloadPdf.png';
import { Document, Page, View, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function PurchaseHistoryReport() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        fetchReport();
    }, [fromDate, toDate]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8070/purchase/report', {
                params: {
                    fromDate,
                    toDate
                }
            });
            setReportData(response.data.reportData);
            setTotalExpense(response.data.totalExpense);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching purchase history report:', error);
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000'
        },
        tableRow: {
            flexDirection: 'row'
        },
        tableCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10
        },
        headerCol: {
            backgroundColor: '#ccc',
            fontWeight: 'bold'
        },
        totalCol: {
            width: '20%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10
        },
        totalExpense: {
            textAlign: 'right',
            marginTop: 15,
            fontSize: 14,
            fontWeight: 'bold',
            borderTopWidth: 1,
            borderBottomWidth: 2,
            borderColor: '#000',
            paddingTop: 8,
            paddingBottom: 8,
            marginBottom: 10,
        },
    });

    const formatCurrency = (amount) => {
        return `LKR ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    const PDFDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCol, styles.headerCol]}>Supplier</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Product</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Invoice Number</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Purchase Date</Text>
                            <Text style={[styles.tableCol, styles.headerCol]}>Total Price</Text>
                        </View>
                        {reportData.map((purchase, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{purchase.supplier}</Text>
                                <Text style={styles.tableCol}>{purchase.product}</Text>
                                <Text style={styles.tableCol}>{purchase.invoiceNumber}</Text>
                                <Text style={styles.tableCol}>{purchase.purchaseDate}</Text>
                                <Text style={styles.totalCol}>{formatCurrency(purchase.totalPrice)}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.totalExpense}>Total Expense: {formatCurrency(totalExpense)}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="report-container">
            <h1 style={{ textAlign:'center',paddingBottom:'10px' }} >Purchase History Report</h1>
            <div className="report-controls">
                <div className="date-inputall">
                    <label htmlFor="fromDate" style={{ fontWeight:'bold' }} >From Date:</label>
                    <input type="date" className="date-input" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="date-inputall">
                    <label htmlFor="toDate"  style={{ fontWeight:'bold' }}>To Date:</label>
                    <input type="date" className="date-input" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
                <div className="download-pdf">
                    <PDFDownloadLink document={PDFDocument} fileName="purchase_report.pdf">
                        {({ blob, url, loading, error }) => (
                            <div style={{ display: 'flex', alignItems: 'center', fontWeight:'bold' }}>
                                <img src={DownloadPDFIcon} alt="Download PDF Icon" style={{ marginRight: '5px',width:'40px',height:'40px' }} />
                                {loading ? 'Loading document...' : 'Download PDF'}
                            </div>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
            <PDFViewer width="100%" height="600">
                {PDFDocument}
            </PDFViewer>
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default PurchaseHistoryReport;