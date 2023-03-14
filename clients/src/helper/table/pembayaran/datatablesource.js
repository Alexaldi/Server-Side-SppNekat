import "../style.scss"

export const pembayaranColoums = [
    {
        field: 'no',
        headerName: 'No',
        width: 60,
        sortable: false,
        valueGetter: (params) => {
            const rowIndex = params.api.getRowIndex(params.row.id_pembayaran);
            return rowIndex + 1;
        },
    },
    {
        field: 'nama_petugas',
        headerName: 'Nama Petugas',
        width: 130,
        valueGetter: (params) => {
            return params.row.petugas ? `${params.row.petugas.nama_petugas}` : ''
        }
    },
    {
        field: 'nisn',
        headerName: 'Nisn',
        width: 120,
        valueGetter: (params) => {
            return params.row.siswa ? `${params.row.siswa.nisn}` : ''
        }
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 180,
        valueGetter: (params) => {
            return params.row.siswa ? `${params.row.siswa.name}` : ''
        }
    },
    {
        field: 'kelas',
        headerName: 'Kelas',
        width: 130,
        valueGetter: (params) => {
            return params.row.siswa ? `${params.row.siswa.kelas.angkatan} ${params.row.siswa.kelas.kelas}` : ''
        }
    },
    {
        field: 'tahun',
        headerName: 'Tahun Bayar',
        width: 100,
        valueGetter: (params) => {
            return params.row.spp ? `${params.row.spp.tahun} ` : ''
        }
    },
    {
        field: 'tgl_bayar',
        headerName: 'Tanggal Bayar',
        width: 130,
        valueGetter: (params) => {
            const formatDate = (dateString) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString('id-ID', options);
            };

            return formatDate(params.row.tgl_bayar)
        }

    },
    {
        field: 'jumlah_bayar',
        headerName: 'Total Bayar',
        width: 140,
        valueGetter: (params) => {
            const nominal = params.value || 0;
            const formattedNominal = nominal.toLocaleString('id-ID', {
                minimumFractionDigits: 0,
            });
            return `Rp. ${formattedNominal}`
        }
    },
    {
        field: 'keterangan',
        headerName: 'Keterangan',
        width: 140,
        valueGetter: (params) => {
            return params.value
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        valueGetter: (params) => {
            const value = params.row.status
            const status = value === true ? 'Lunas' : 'Belum Lunas';
            return status
        },
        renderCell: (params) => {
            const value = params.row.status
            const status =
                value === true ? 'Lunas' : 'Belum Lunas';
            return (
                <div
                    style={{
                        backgroundColor: value === true ? "#4CAF50" : "crimson",
                        color: "white",
                        padding: 5,
                        borderRadius: 5,
                        textAlign: "center",
                    }}
                >
                    {status}
                </div>
            );
        },
    },
];

