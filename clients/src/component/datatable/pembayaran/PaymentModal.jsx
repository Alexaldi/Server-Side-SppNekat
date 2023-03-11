import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Grid, IconButton, DialogActions, Button } from "@mui/material";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"
import { GridCloseIcon } from "@mui/x-data-grid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./patmod.scss"
import { AppContext } from "../../../store";
import Cookies from "js-cookie"
const styles = StyleSheet.create({
    page: {
        padding: 40, // increase padding to make the content more compact
    },
    header: {
        marginBottom: 25, // add margin to separate header from content
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24, // increase font size to make the title more prominent
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        marginBottom: 5,
    },
    receipt: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'black',
        paddingTop: 10,
        alignItems: 'flex-end', // align receipt content to the right
    },
    receiptLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    receiptValue: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});


export const PaymentModal = ({ id, isOpen, onClose }) => {
    const [data, setData] = useState([]);
    const [state, dispatch] = useContext(AppContext);
    useEffect(() => {
        getSiswaById(id)
    }, [id]);

    const getSiswaById = async (id) => {
        console.log(id);
        const response = await axios.get(`http://localhost:5000/pembayaranM/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                },
            });
        setData(response.data);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const exportToPdf = async () => {
        const fileName = `pembayaran-${data.siswa?.name}-${data.tgl_bayar}.pdf`;
        const blob = await pdf((
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Pembayaran SPP SMKN 1 Katapang</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />
                    </View>
                    <View>
                        <Text style={styles.subtitle}>NISN:</Text>
                        <Text style={styles.info}>{data.siswa?.nisn}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Nama Siswa:</Text>
                        <Text style={styles.info}>{data.siswa?.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Kelas:</Text>
                        <Text style={styles.info}>
                            {`${data.siswa?.kelas?.angkatan} ${data.siswa?.kelas?.kelas}`}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Payment Date:</Text>
                        <Text style={styles.info}>{formatDate(data.tgl_bayar)}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Tahun Pembayaran:</Text>
                        <Text style={styles.info}>{data.spp?.tahun}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Status:</Text>
                        <Text style={styles.info}>{data.status === true ? 'Lunas' : 'Belum Lunas'}</Text>
                    </View>
                    <View style={styles.receipt}>
                        <Text style={styles.receiptLabel}>Total Pembayaran:</Text>
                        <Text style={styles.receiptValue}>
                            {data.jumlah_bayar
                                ? data.jumlah_bayar.toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                })
                                : null}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Nama Petugas:</Text>
                        <Text style={styles.info}>{data.petugas?.nama_petugas}</Text>
                    </View>
                </Page>
            </Document>
        )).toBlob();
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url);
        newWindow.onload = function () {
            newWindow.print();
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} PaperProps={{ style: { borderRadius: '20px' } }}>
            <DialogTitle style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Detail Pembayaran</Typography>
                <IconButton style={{ position: 'absolute', right: 8, top: 8 }} onClick={onClose}>
                    <GridCloseIcon style={{ fontSize: 24 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{ paddingTop: '1rem' }}>
                <DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">NISN:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{data.siswa?.nisn}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Nama Siswa:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{data.siswa?.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Kelas:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{`${data.siswa?.kelas?.angkatan} ${data.siswa?.kelas?.kelas}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Payment Date:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{data.tgl_bayar}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Tahun Pembayaran:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{data.spp?.tahun}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Total Pembayaran:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} > {data.jumlah_bayar ? data.jumlah_bayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : null}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Nama Petugas:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >{data.petugas?.nama_petugas}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Status:</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} >
                                <div className={`status ${data.status === true ? 'Lunas' : 'Belum-Lunas'}`}>{data.status === true ? 'Lunas' : 'Belum Lunas'}</div>
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" style={{ borderRadius: '20px', marginTop: '1rem' }} onClick={exportToPdf}>
                    Export to PDF
                </Button>
            </DialogActions>
        </Dialog>
    );
};