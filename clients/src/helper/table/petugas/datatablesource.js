import "../style.scss"

export const petugasColoums = [
    {
        field: 'no',
        headerName: 'No',
        width: 40,
        sortable: false,
        renderCell: (params) => {
            const rowIndex = params.api.getRowIndex(params.row.id_petugas);
            return rowIndex + 1;
        },
    },
    { field: 'username', headerName: 'Username', width: 110 },
    { field: 'nama_petugas', headerName: 'Nama Petugas', width: 180 },
];

