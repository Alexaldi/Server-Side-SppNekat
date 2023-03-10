import "../style.scss"

export const kelasColoums = [
    {
        field: 'no',
        headerName: 'No',
        width: 40,
        sortable: false,
        renderCell: (params) => {
            const rowIndex = params.api.getRowIndex(params.row.id_kelas);
            return rowIndex + 1;
        },
    },
    { field: 'angkatan', headerName: 'Angkatan', width: 110 },
    { field: 'kelas', headerName: 'Kelas', width: 180 },
];

