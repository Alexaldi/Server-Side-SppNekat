import "../style.scss"

export const sppColoums = [
    {
        field: 'no',
        headerName: 'No',
        width: 40,
        sortable: false,
        renderCell: (params) => {
            const rowIndex = params.api.getRowIndex(params.row.id_spp);
            return rowIndex + 1;
        },
    },
    { field: 'tahun', headerName: 'Tahun', width: 110 },
    {
        field: 'nominal', headerName: 'Nominal', width: 180,
        renderCell: (params) => {
            const nominal = params.value;
            const formattedNominal = nominal.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
            return formattedNominal;
        }
    },
];

