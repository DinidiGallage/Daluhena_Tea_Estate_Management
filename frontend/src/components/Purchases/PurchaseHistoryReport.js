import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function PurchaseHistoryReport() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalExpense, setTotalExpense] = useState(0); // Add state for total expense

    useEffect(() => {
        fetchReport();
    }, [fromDate, toDate]); // Fetch report data whenever fromDate or toDate changes

    const fetchReport = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8070/purchase/report', {
                params: {
                    fromDate,
                    toDate
                }
            });
            setReportData(response.data.reportData); // Set report data
            setTotalExpense(response.data.totalExpense); // Set total expense
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
            width: '20%', // Adjusted width to accommodate the new column
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10 // Reduced font size
        },
        headerCol: {
            backgroundColor: '#ccc',
            fontWeight: 'bold'
        },
        totalCol: {
            width: '20%', // Adjusted width to accommodate the new column
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
            padding: 8,
            textAlign: 'center',
            fontSize: 10 // Reduced font size
        },
        totalExpense: {
            textAlign: 'right', // Align the total expense text to the right
            marginTop: 15, // Add some margin at the top
            fontSize: 14, // Increase font size for prominence
            fontWeight: 'bold', // Make the text bold
            borderTopWidth: 1, // Add border at the top to separate from table
            borderBottomWidth: 2, // Add border at the bottom to separate from the next content
            borderColor: '#000', // Border color
            paddingTop: 8, // Padding at the top
            paddingBottom: 8, // Padding at the bottom
            marginBottom: 10,// Add some margin at the bottom to separate from the next content
        },
    });
    

    const formatCurrency = (amount) => {
        // Format amount as currency with LKR (e.g., LKR 1,234.56)
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
                            <Text style={[styles.tableCol, styles.headerCol]}>Total Price</Text> {/* New column for total price */}
                        </View>
                        {reportData.map((purchase, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{purchase.supplier}</Text>
                                <Text style={styles.tableCol}>{purchase.product}</Text>
                                <Text style={styles.tableCol}>{purchase.invoiceNumber}</Text>
                                <Text style={styles.tableCol}>{purchase.purchaseDate}</Text>
                                <Text style={styles.totalCol}>{formatCurrency(purchase.totalPrice)}</Text> {/* Display total price */}
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
            <h1>Purchase History Report</h1>
            <div>
                <label>From Date:</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div>
                <label>To Date:</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <PDFDownloadLink document={PDFDocument} fileName="purchase_report.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download PDF'
                }
            </PDFDownloadLink>
            <PDFViewer width="100%" height="600">
                {PDFDocument}
            </PDFViewer>
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default PurchaseHistoryReport;
