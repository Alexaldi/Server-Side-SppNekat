import "../style.scss"

export const userColoums = [
    {
        field: 'no',
        headerName: 'No',
        width: 40,
        sortable: false,
        renderCell: (params) => {
            const rowIndex = params.api.getRowIndex(params.row.id_siswa);
            return rowIndex + 1;
        },
    },
    { field: 'nisn', headerName: 'NISN', width: 110 },
    { field: 'name', headerName: 'Name', width: 180 },
    {
        field: 'kelas.kelas', headerName: 'Kelas', width: 80,
        valueGetter: (params) => {
            return params.row.kelas ? `${params.row.kelas.angkatan} ${params.row.kelas.kelas}` : '';
        }
    },
    { field: 'alamat', headerName: 'Alamat', minWidth: 280, flex: 1 },
    { field: 'no_telp', headerName: 'No Telp', minWidth: 160 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 }
];

